'use client';

import { createContext, useContext } from 'react';
import { useInsightsManager } from '@/hooks/useInsightsManager'; // your existing hook

const InsightsContext = createContext<ReturnType<typeof useInsightsManager> | null>(null);

export function InsightsProvider({ children }: { children: React.ReactNode }) {
  const insights = useInsightsManager();
  return (
    <InsightsContext.Provider value={insights}>
      {children}
    </InsightsContext.Provider>
  );
}

export function useInsights() {
  const context = useContext(InsightsContext);
  if (!context) {
    throw new Error('useInsights must be used within a InsightsProvider');
  }
  return context;
}
