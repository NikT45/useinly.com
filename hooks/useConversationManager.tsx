import { useConversation } from '@elevenlabs/react';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useChat } from '@ai-sdk/react';

export function useConversationManager() {
  const supabase = createClient();
  const [mode, setMode] = useState< 'idle' | 'voice' | 'text' | 'loading'>('idle'); 
  const [micMuted, setMicMuted] = useState(false);
  // const [minutes_used, setMinutesUsed] = useState(0);
  // const [minutes_quota, setMinutesQuota] = useState(0);
  const [minutes_remaining, setMinutesRemaining] = useState(0);
  const [messages_remaining, setMessagesRemaining] = useState(0);
  useEffect(() => {
    const fetchRemaining = async () => {
      const { data, error } = await supabase.from('profiles').select('minutes_used,minutes_quota,messages_used,messages_quota');
      if (error) throw new Error(error.message);
      setMinutesRemaining(data[0].minutes_quota - data[0].minutes_used);
      setMessagesRemaining(data[0].messages_quota - data[0].messages_used);
    };
    fetchRemaining();
     }, []);
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
    micMuted: micMuted,
  });

  const getSignedUrl = async (): Promise<string> => {
    const { data, error } = await supabase.functions.invoke('get-signed-url');
    if (error) throw new Error(error.message);
    if (!data?.signedUrl) throw new Error("No signedUrl in response");
    return data.signedUrl;
  };

  async function startConversation() {
    setMode('loading')
    console.log('startConversation called, current mode:', mode);
    try {
      console.log('Requesting microphone permission...');
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Getting signed URL...');
      const signedUrl = await getSignedUrl();
      
      // Get current user from Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('No authenticated user found');
      }
      
      console.log('Starting conversation session...');
      await conversation.startSession({ 
        signedUrl,
        userId: user.id,
        dynamicVariables: {
          user_name: 'Nik'
        }
      });
      
      console.log('Setting mode to voice...');
      setMode('voice');
    } catch (err) {
        console.error('Start conversation failed:', err);
        // Don't change mode if there's an error
    }
  }

  async function stopConversation() {
    console.log('stopConversation called, current mode:', mode);
    try {
      await conversation.endSession();
      setMode('idle');
      console.log('Conversation ended successfully.');
    } catch (err) {
      console.error('Failed to stop conversation:', err);
    }
  }
  

  function muteMicrophone() {
    try {
     
      setMicMuted(true);
      console.log('Microphone muted');
    } catch (err) {
      console.error('Failed to mute microphone:', err);
    }
  }

  function unmuteMicrophone() {
    try {
      setMicMuted(false);
      console.log('Microphone unmuted');
    } catch (err) {
      console.error('Failed to unmute microphone:', err);
    }
  }

  function toggleMicrophone() {
    try {
      const newMutedState = !micMuted;
      setMicMuted(newMutedState);
      console.log(`Microphone ${newMutedState ? 'muted' : 'unmuted'}`);
    } catch (err) {
      console.error('Failed to toggle microphone:', err);
    }
  }
  
  const { messages, input, handleInputChange, handleSubmit } = useChat(); 

  return {
    status: conversation?.status,
    isSpeaking: conversation?.isSpeaking,
    micMuted: conversation?.micMuted ?? false,
    startConversation,
    stopConversation,
    muteMicrophone,
    unmuteMicrophone,
    toggleMicrophone,
    mode,
    setMode,
    messages,
    input, 
    handleInputChange,
    handleSubmit,
    minutes_remaining,
    messages_remaining,
  };
}
