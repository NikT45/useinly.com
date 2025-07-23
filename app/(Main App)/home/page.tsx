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
    const {mode,messages} = useConversation();
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
    <div className={`flex-1 w-full flex flex-col items-center gap-2 ${mode === "text" && messages.length > 0 ? "justify-start" : "justify-center"}`}>
      {mode === 'idle' && (
          <h1 className="text-brand-wine text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-medium mb-8">How are you feeling?</h1>
      )}
      {mode === 'text' && (
        <div className="flex flex-col items-cente justify-center w-full">
            <Chat/>
        </div>
          )}
        <div className={`flex justify-center ${mode === "text" && messages.length > 0 ? "fixed bottom-0 left-0 right-0 pb-8 z-10" : ""}`}>
          <TalkCircle/>
          <div className="absolute z-[-1] bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white via-white/95 via-white/80 to-transparent pointer-events-none"></div>
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
