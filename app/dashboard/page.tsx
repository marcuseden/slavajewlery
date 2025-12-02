'use client';

import { DashboardClient } from '@/components/DashboardClient';

// Force dynamic rendering to prevent prerendering errors with auth
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return <DashboardClient />;
}
