'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Sparkles } from 'lucide-react';

export function DashboardClient() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-100 mb-4">Please sign in</h1>
          <p className="text-slate-400 mb-8">You need to be signed in to view your dashboard.</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
          </h1>
          <p className="text-slate-400">
            Manage your jewelry designs and track your orders
          </p>
        </div>

        {/* Coming Soon Content */}
        <div className="text-center py-16">
          <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">Dashboard Coming Soon</h3>
          <p className="text-slate-400 mb-8">We're building something amazing for you</p>
          <Link href="/design">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
              <Plus className="w-4 h-4 mr-2" />
              Create New Design
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
