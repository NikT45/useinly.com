'use client';

import { useConversation } from '@/context/ConversationProvider';

export function Conversation() {
  const { 
    status, 
    isSpeaking, 
    startConversation, 
    stopConversation,
    mode 
  } = useConversation();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={status === 'connected' || mode === 'loading'}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {mode === 'loading' ? 'Starting...' : 'Start Conversation'}
        </button>
        <button
          onClick={stopConversation}
          disabled={status !== 'connected'}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>
      <div className="flex flex-col items-center">
        <p>Status: {status}</p>
        <p>Mode: {mode}</p>
        <p>Agent is {isSpeaking ? 'speaking' : 'listening'}</p>
      </div>
    </div>
  );
}
