'use client'
import { InteractModesButtons } from "@/components/interact-modes-buttons";
import TalkCircle from "@/components/TalkCircle";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Conversation } from "@/components/conversation";
import VoiceCallButtons from "@/components/voiceCallButtons";
import { useConversation } from "@/context/ConversationProvider";
import { Chat } from "@/components/chat";

export default function Home() {
    const {mode} = useConversation();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();


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
      {mode === 'text' && (
            <Chat></Chat>
          )}
        <div className="flex justify-center">
          <TalkCircle/>
        </div>

        {/* <Conversation /> */}
        {mode === 'idle' && (
        <div className="flex justify-center">
          <InteractModesButtons  />
        </div>
        )}
    </div>
    
    {/* Voice call buttons at the bottom */}
    {mode === 'voice' && (
      <div className="flex justify-center pb-8">
          <VoiceCallButtons />
      </div>
    )}
    </div>
  );
}
