'use client';

import { createContext, useContext } from 'react';
import { useConversationManager } from '@/hooks/useConversationManager'; // your existing hook

const ConversationContext = createContext<ReturnType<typeof useConversationManager> | null>(null);

export function ConversationProvider({ children }: { children: React.ReactNode }) {
  const conversation = useConversationManager();
  return (
    <ConversationContext.Provider value={conversation}>
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
}
