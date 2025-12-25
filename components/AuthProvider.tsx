'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, !!session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Create user profile if new user (non-blocking)
        if (event === 'SIGNED_IN' && session?.user) {
          // Don't await - let this run in background to avoid blocking UI
          (async () => {
            try {
              const { data: existingProfile } = await supabase
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .single();

              if (!existingProfile) {
                await supabase.from('users').insert({
                  id: session.user.id,
                  email: session.user.email,
                  full_name: session.user.user_metadata.full_name || session.user.email?.split('@')[0],
                });
              }
            } catch (error) {
              console.error('Error creating user profile:', error);
              // Don't throw - profile creation failure shouldn't block login
            }
          })();
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [supabase.auth]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  };

  const signInWithApple = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  };

  const signInWithEmail = async (email: string, password: string) => {
    console.log('Attempting sign in with email:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    console.log('Sign in response:', { 
      hasSession: !!data.session, 
      hasUser: !!data.user, 
      error: error?.message 
    });
    
    if (error) {
      console.error('Sign in error:', error);
      
      // Provide user-friendly error messages
      if (error.message.includes('Invalid login credentials') || error.message.includes('invalid')) {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      } else if (error.message.includes('Email not confirmed')) {
        throw new Error('Please check your email and click the confirmation link to activate your account.');
      } else if (error.message.includes('rate limit')) {
        throw new Error('Too many login attempts. Please wait a minute and try again.');
      }
      throw error;
    }
    
    // Check if session was created
    if (!data.session) {
      console.error('No session created after sign in');
      throw new Error('Login failed. Please try again or contact support.');
    }
    
    console.log('Sign in successful, session created');
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    // Check if user already exists first
    const { data: existingUser } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (existingUser?.user) {
      // User already exists with this email/password combo - just sign them in
      return;
    }

    // Attempt to create new account with email auto-confirmation
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      // Provide user-friendly error messages
      if (error.message.includes('already registered') || error.message.includes('already been registered')) {
        throw new Error('An account with this email already exists. Please sign in instead or use a different email.');
      } else if (error.message.includes('rate limit')) {
        throw new Error('Too many signup attempts. Please wait a minute and try again.');
      } else if (error.message.includes('invalid email')) {
        throw new Error('Please enter a valid email address.');
      } else if (error.message.includes('password')) {
        throw new Error('Password must be at least 6 characters long.');
      }
      throw error;
    }

    // If email confirmation is required but not set up, show helpful message
    if (data?.user && !data.session) {
      throw new Error('Account created! Please check your email to confirm, or contact support to enable auto-login.');
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithApple,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Return a safe fallback for SSR
    return {
      user: null,
      loading: true,
      signInWithGoogle: async () => {},
      signInWithApple: async () => {},
      signInWithEmail: async () => {},
      signUpWithEmail: async () => {},
      signOut: async () => {},
    };
  }
  return context;
}
