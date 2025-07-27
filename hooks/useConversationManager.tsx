import { useConversation } from '@elevenlabs/react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useChat } from '@ai-sdk/react';

export function useConversationManager() {
  const supabase = createClient();
  const [mode, setMode] = useState<'idle' | 'voice' | 'text' | 'loading'>('idle');
  const [micMuted, setMicMuted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  // const [minutes_used, setMinutesUsed] = useState(0);
  // const [minutes_quota, setMinutesQuota] = useState(0);
  const [minutes_remaining, setMinutesRemaining] = useState(0);
  const [messages_remaining, setMessagesRemaining] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [context, setContext] = useState('');
  const [conversationSummary, setConversationSummary] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  // Audio analysis state
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Check authentication state first
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Auth check error:', error);
          setIsAuthenticated(false);
        } else if (data?.user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [supabase.auth]);



  // Only fetch data after authentication is confirmed
  useEffect(() => {
    if (!isAuthenticated || isCheckingAuth) return;

    const fetchRemaining = async () => {
      try {
        const { data, error } = await supabase.from('profiles').select('minutes_used,minutes_quota,messages_used,messages_quota');
        if (error) throw new Error(error.message);
        if (data && data.length > 0) {
          setMinutesRemaining(data[0].minutes_quota - data[0].minutes_used);
          setMessagesRemaining(data[0].messages_quota - data[0].messages_used);
        }
      } catch (error) {
        console.error('Failed to fetch remaining usage:', error);
      }
    };

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase.from('profiles').select('first_name,last_name,context');
        if (error) throw new Error(error.message);
        if (data && data.length > 0) {
          setFirstName(data[0].first_name || '');
          setLastName(data[0].last_name || '');
          setContext(data[0].context || '');
        }
        const {data: {user}} = await supabase.auth.getUser();
        const {data: conversationData, error: conversationError} = await supabase.from('conversations').select('summary').eq('user_id', user?.id).order('created_at', { ascending: false }).limit(1);
        if (conversationError) throw new Error(conversationError.message);
        if (conversationData && conversationData.length > 0) {
          setConversationSummary(conversationData[0].summary || '');
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchRemaining();
    fetchProfile();
  }, [isAuthenticated, isCheckingAuth, supabase]);

  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
    micMuted: micMuted,
  });

  // Audio analysis setup - simpler approach using isSpeaking state with enhanced animation
  const setupAudioAnalysis = useCallback(() => {
    if (mode === 'voice') {
      // Start audio level simulation based on isSpeaking
      const simulateAudioLevel = () => {
        if (mode === 'voice') {
          if (conversation?.isSpeaking) {
            // Generate pseudo-random audio levels when speaking
            const baseLevel = 0.3 + Math.random() * 0.4; // Base level between 0.3-0.7
            const variation = Math.sin(Date.now() * 0.01) * 0.2; // Smooth oscillation
            const randomSpikes = Math.random() > 0.8 ? Math.random() * 0.3 : 0; // Occasional spikes
            
            const level = Math.min(baseLevel + variation + randomSpikes, 1);
            setAudioLevel(level);
          } else {
            // Gradually fade to idle level when not speaking
            setAudioLevel(prev => Math.max(prev * 0.95, 0.1));
          }
          
          animationFrameRef.current = requestAnimationFrame(simulateAudioLevel);
        }
      };
      
      simulateAudioLevel();
    }
  }, [mode, conversation?.isSpeaking]);

  const cleanupAudioAnalysis = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    setAudioLevel(0);
  }, []);

  // Set up audio analysis when entering voice mode
  useEffect(() => {
    if (mode === 'voice') {
      setupAudioAnalysis();
    } else {
      cleanupAudioAnalysis();
    }

    return () => {
      cleanupAudioAnalysis();
    };
  }, [mode, setupAudioAnalysis, cleanupAudioAnalysis]);

  const getSignedUrl = async (): Promise<string> => {
    const { data, error } = await supabase.functions.invoke('get-signed-url');
    if (error) throw new Error(error.message);
    if (!data?.signedUrl) throw new Error("No signedUrl in response");
    return data.signedUrl;
  };

  async function startConversation() {
    setMode('loading')
    console.log('startConversation called, current mode:', mode);
    
    // Check authentication before proceeding
    if (!isAuthenticated) {
      console.error('User not authenticated');
      setMode('idle');
      return;
    }

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

      console.log('Starting conversation session...', user?.id);
      await conversation.startSession({
        signedUrl,
        dynamicVariables: {
          user_name: firstName || 'User',
          userId: user?.id || 'anonymous',
          user_context: String(context || 'No context provided'),
          conversation_context: String(conversationSummary || 'No context provided')
        }
      });

      console.log('Setting mode to voice...');
      setMode('voice');
    } catch (err) {
      console.error('Start conversation failed:', err);
      setMode('idle');
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

  // Store the current conversation ID for the active chat session
  const currentConversationIdRef = useRef<string | null>(null);

  // Keep ref synchronized with conversationId state
  useEffect(() => {
    currentConversationIdRef.current = conversationId;
  }, [conversationId]);

  const { messages, input, handleInputChange, handleSubmit, isLoading, status: chatStatus } = useChat({
    onFinish: async (message, { usage, finishReason }) => {
      console.log('Finished streaming message:', message);
      console.log('Token usage:', usage);
      console.log('Finish reason:', finishReason);
      
      // Save the assistant's message to the database
      try {
        // Use the current conversation ID from ref, which should be set by customHandleSubmit
        const targetConversationId = currentConversationIdRef.current || conversationId;
        if (!targetConversationId) {
          console.error('No conversation ID available for saving assistant message');
          return;
        }
        await saveMessages(message.content, 'assistant', targetConversationId);
      } catch (error) {
        console.error('Failed to save assistant message:', error);
      }
    },
    onError: (error) => {
      console.error('An error occurred during chat:', error);
    },
    onResponse: (response) => {
      console.log('Received HTTP response from server:', response);
    },
  });

  async function createConversation() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('No authenticated user found');
    }
    const newConversationId = crypto.randomUUID();
    const { data, error } = await supabase.from('conversations').insert({
      id: newConversationId,
      user_id: user?.id,
      summary: '',
      type: 'text'
    });
    if (error) {
      throw new Error(error.message);
    }
    setConversationId(newConversationId);
    return newConversationId;
  }
  async function saveMessages(message: string, role: string, targetConversationId?: string){
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('No authenticated user found');
    }
    const { data, error } = await supabase.from('messages').insert({
      conversation_id: targetConversationId || conversationId,
      user_id: user?.id,
      message: message,
      role: role,
    });
    if (error) {
      throw new Error(error.message);
    }
  }

  async function customHandleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    
    if (!input.trim()) return; // Don't submit empty messages
    
    let targetConversationId = conversationId || undefined;
    if (!conversationId) {
      targetConversationId = await createConversation();
    }
    
    // Store the conversation ID in ref for the assistant message to use
    currentConversationIdRef.current = targetConversationId || null;
    
    await saveMessages(input, 'user', targetConversationId);
    handleSubmit(e);
  }

  return {
    status: conversation?.status,
    chatStatus, // Add chat status from useChat hook
    isLoading, // Add isLoading state
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
    isAuthenticated,
    isCheckingAuth,
    firstName,
    lastName,
    context,
    audioLevel,
    conversationId,
    customHandleSubmit,
  };
}
