import { useConversationManager } from "./useConversationManager";
import { X, Mic, MicOff } from "lucide-react";


export default function VoiceCallButtons() {
    const {
        stopConversation,
    } = useConversationManager();

    return (
        <div className="flex gap-[24px]">
              <button onClick={() => stopConversation()} className="rounded-full w-[70px] h-[70px] justify-center flex items-center bg-[#D3D3D3] bg-opacity-30">
                <X size={32} className="text-brand-wine">
                </X>
            </button>
            <button onClick={() => stopConversation()} className="rounded-full w-[70px] h-[70px] justify-center flex items-center bg-[#D3D3D3] bg-opacity-30">
                <Mic size={32} className="text-brand-wine">
                </Mic>
            </button>
        </div>
    )
}