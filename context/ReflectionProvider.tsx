
'use client';

import { createContext, useContext } from 'react';
import { useReflectionsManager } from '@/hooks/useReflectionsManager'; // your existing hook

const ReflectionContext = createContext<ReturnType<typeof useReflectionsManager> | null>(null);

export function ReflectionProvider({ children }: { children: React.ReactNode }) {
  const reflection = useReflectionsManager();
  return (
    <ReflectionContext.Provider value={reflection}>
      {children}
    </ReflectionContext.Provider>
  );
}

export function useReflection() {
  const context = useContext(ReflectionContext);
  if (!context) {
    throw new Error('useReflection must be used within a ReflectionProvider');
  }
  return context;
}
