'use client';

import Link from 'next/link';

export function WizardHeader() {
  return (
    <header className="border-b border-stone-800 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-stone-100 hover:text-stone-300 transition-colors">
              Slava Jewelry Studio
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-stone-400 text-sm">
              Design Wizard
            </div>
            <Link 
              href="/"
              className="text-stone-400 hover:text-stone-300 text-sm transition-colors"
            >
              Exit
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}




