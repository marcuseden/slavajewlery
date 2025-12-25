'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Heart, Check, Loader2 } from 'lucide-react';

interface SaveDesignButtonProps {
  design: {
    title?: string;
    prompt: string;
    images: any[];
    specifications?: string;
    pricing_breakdown?: any;
    jewelry_type?: string;
    style_tags?: string[];
    materials?: any;
  };
  makePublic?: boolean; // If true, also creates shareable version
  onSaveSuccess?: (savedDesign: any, sharedDesign?: any) => void;
  onLoginRequired?: () => void;
  className?: string;
  variant?: 'icon' | 'button';
}

export function SaveDesignButton({ 
  design, 
  makePublic = false,
  onSaveSuccess, 
  onLoginRequired,
  className = '',
  variant = 'button'
}: SaveDesignButtonProps) {
  const { user, loading: authLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleSave = async () => {
    // Check if user is logged in
    if (!user) {
      setShowLoginPrompt(true);
      if (onLoginRequired) {
        onLoginRequired();
      }
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch('/api/designs/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...design,
          makePublic
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setShowLoginPrompt(true);
          if (onLoginRequired) {
            onLoginRequired();
          }
          return;
        }
        throw new Error('Failed to save design');
      }

      const result = await response.json();
      setIsSaved(true);
      
      if (onSaveSuccess) {
        onSaveSuccess(result.design, result.sharedDesign);
      }

      // Show success state for 2 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);

    } catch (error) {
      console.error('Error saving design:', error);
      alert('Failed to save design. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (variant === 'icon') {
    return (
      <>
        <button
          onClick={handleSave}
          disabled={isSaving || authLoading}
          className={`p-3 border rounded-lg transition-all ${
            isSaved
              ? 'bg-red-500/20 border-red-500 text-red-400'
              : 'border-slate-600 text-slate-400 hover:bg-slate-800 hover:border-red-500 hover:text-red-400'
          } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          aria-label={isSaved ? 'Design saved' : 'Save design'}
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isSaved ? (
            <Check className="w-5 h-5" />
          ) : (
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          )}
        </button>

        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Save This Design</h3>
                <p className="text-slate-400 mb-6">
                  Create a free account to save your designs and access them anytime.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      setShowLoginPrompt(false);
                      if (onLoginRequired) {
                        onLoginRequired();
                      } else {
                        // Default: redirect to home with signup param
                        window.location.href = '/?signup=true';
                      }
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3"
                  >
                    Create Free Account
                  </Button>
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="w-full py-3 text-slate-400 hover:text-white transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Button variant
  return (
    <>
      <Button
        onClick={handleSave}
        disabled={isSaving || authLoading}
        className={`${
          isSaved
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
            : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700'
        } text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 ${className}`}
      >
        {isSaving ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Saving...
          </>
        ) : isSaved ? (
          <>
            <Check className="w-5 h-5 mr-2" />
            Saved!
          </>
        ) : (
          <>
            <Heart className="w-5 h-5 mr-2" />
            {user ? 'Save Design' : 'Save Design'}
          </>
        )}
      </Button>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Save This Design</h3>
              <p className="text-slate-400 mb-6">
                Create a free account to save your designs and access them anytime.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setShowLoginPrompt(false);
                    if (onLoginRequired) {
                      onLoginRequired();
                    } else {
                      // Default: redirect to home with signup param
                      window.location.href = '/?signup=true';
                    }
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3"
                >
                  Create Free Account
                </Button>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="w-full py-3 text-slate-400 hover:text-white transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

