'use client';

import { useConversation } from '@elevenlabs/react';
import { useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function Conversation() {
  const supabase = createClient();
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  const getSignedUrl = async (): Promise<string> => {
    const { data, error } = await supabase.functions.invoke('get-signed-url', {
        body: { name: 'Functions' },
    });
    if (error) throw new Error(error.message);
    if (!data?.signedUrl) throw new Error("No signedUrl in response");
    return data.signedUrl;
  };

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const signedUrl = await getSignedUrl();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      await conversation.startSession({ 
        signedUrl,// Replace with your actual agent ID
        dynamicVariables: {
          user_name: 'Nik',
          userId: user?.id || 'anonymous'
        }
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation, supabase]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button
          onClick={startConversation}
          disabled={conversation.status === 'connected'}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Start Conversation
        </button>
        <button
          onClick={stopConversation}
          disabled={conversation.status !== 'connected'}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Stop Conversation
        </button>
      </div>
      <div className="flex flex-col items-center">
        <p>Status: {conversation.status}</p>
        <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
      </div>
    </div>
  );
}
