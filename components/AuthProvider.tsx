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
        setUser(session?.user ?? null);
        setLoading(false);

        // Create user profile if new user
        if (event === 'SIGNED_IN' && session?.user) {
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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // Provide user-friendly error messages
      if (error.message.includes('Invalid login credentials') || error.message.includes('invalid')) {
        throw new Error('Invalid email or password. Please check your credentials and try again.');
      } else if (error.message.includes('rate limit')) {
        throw new Error('Too many login attempts. Please wait a minute and try again.');
      }
      throw error;
    }
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

    // Attempt to create new account
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
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
