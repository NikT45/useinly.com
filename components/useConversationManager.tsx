// hooks/useConversationManager.ts
import { useConversation } from '@elevenlabs/react';
import { useCallback, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useConversationManager() {
  const supabase = createClient();
  const [mode, setMode] = useState< 'idle' | 'voice' | 'text' | 'loading'>('idle'); 
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  const getSignedUrl = async (): Promise<string> => {
    const { data, error } = await supabase.functions.invoke('get-signed-url');
    if (error) throw new Error(error.message);
    if (!data?.signedUrl) throw new Error("No signedUrl in response");
    return data.signedUrl;
  };

  async function startConversation() {
    setMode('loading');
    console.log('startConversation called, current mode:', mode);
    try {
      console.log('Requesting microphone permission...');
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Getting signed URL...');
      const signedUrl = await getSignedUrl();
      console.log('Starting conversation session...');
      await conversation.startSession({ signedUrl });
      console.log('Setting mode to voice...');
      setMode('voice');
    } catch (err) {
        console.error('Start conversation failed:', err);
        // Don't change mode if there's an error
    }
  }

  async function stopConversation(){
    await conversation.endSession();
    setMode('idle');
  }

  return {
    status: conversation.status,
    isSpeaking: conversation.isSpeaking,
    startConversation,
    stopConversation,
    mode,
    setMode,
  };
}
