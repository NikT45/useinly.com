'use client'
import { InteractModesButtons } from "@/components/interact-modes-buttons";
import TalkCircle from "@/components/TalkCircle";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Conversation } from "@/components/conversation";
import { useConversationManager } from "@/components/useConversationManager";
import VoiceCallButtons from "@/components/voiceCallButtons";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

//calling logic
  const {
    status,
    isSpeaking,
    startConversation,
    stopConversation,
    mode,
    setMode,
    micMuted,
    toggleMicrophone,
  } = useConversationManager();

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/auth/login");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, supabase.auth]);

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
   <div className="flex-1 flex flex-col items-center px-4 py-4 relative">
    {/* Main content centered */}
    <div className="flex-1 flex flex-col items-center justify-center gap-2">
      {mode === 'idle' && (
          <h1 className="text-brand-wine text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-medium font-playfair mb-8">How are you feeling?</h1>
      )}
        <div className="flex justify-center">
          <TalkCircle mode={mode} />
        </div>

        {/* <Conversation /> */}
        {mode === 'idle' && (
        <div className="flex justify-center">
          <InteractModesButtons mode={mode} setMode={setMode} startVoice={startConversation} />
        </div>
        )}
    </div>
    
    {/* Voice call buttons at the bottom */}
    {mode === 'voice' && (
      <div className="flex justify-center pb-8">
          <VoiceCallButtons stopVoice={stopConversation} toggleMicrophone={toggleMicrophone} micMuted={micMuted}/>
      </div>
    )}
    </div>
 /*    <div className="flex flex-col items-center justify-center h-full px-4 py-8 bg-blue-500">
        <p>hi</p>
    </div> */
  );
}
