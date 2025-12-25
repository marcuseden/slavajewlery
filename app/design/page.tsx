'use client';

import { Suspense } from 'react';
import { SimpleDesignForm } from '@/components/design-wizard/SimpleDesignForm';
import { AuthProvider } from '@/components/AuthProvider';

function DesignFormWrapper() {
  return (
    <div className="min-h-screen bg-slate-950">
      <SimpleDesignForm />
    </div>
  );
}

export default function DesignPage() {
  return (
    <AuthProvider>
      <Suspense fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }>
        <DesignFormWrapper />
      </Suspense>
    </AuthProvider>
  );
}
