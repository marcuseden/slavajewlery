'use client';

import { SimpleDesignForm } from '@/components/design-wizard/SimpleDesignForm';
import { AuthProvider } from '@/components/AuthProvider';

export default function DesignPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950">
        <SimpleDesignForm />
      </div>
    </AuthProvider>
  );
}
