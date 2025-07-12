import { X, Mic, MicOff } from "lucide-react";
import { useConversation } from "@/context/ConversationProvider";

export default function VoiceCallButtons() {
    const {stopConversation, toggleMicrophone, micMuted} = useConversation();
    return (
        <div className="flex gap-[24px]">
            <button onClick={() => toggleMicrophone()} className={`rounded-full w-[70px] h-[70px] justify-center flex items-center ${micMuted ? 'bg-brand-softPink bg-opacity-35' : 'bg-[#D3D3D3] bg-opacity-30'}`}>
                {micMuted ? <MicOff size={32} className="text-brand-wine" /> : <Mic size={32} className="text-brand-wine" />}
            </button>
            <button onClick={() => stopConversation()} className="rounded-full w-[70px] h-[70px] justify-center flex items-center bg-[#D3D3D3] bg-opacity-30">
                <X size={32} className="text-brand-wine">
                </X>
            </button>
        </div>
    )
}