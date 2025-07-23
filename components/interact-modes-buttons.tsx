import { Speech, MessageSquareText } from 'lucide-react'
import { useConversation } from '@/context/ConversationProvider';

export function InteractModesButtons() {
    const {mode, setMode, startConversation} = useConversation();
    return (
        <div className="flex mt-10 p-[2px] bg-brand-softPink bg-opacity-50 rounded-full">
            <button onClick={() => {startConversation()}} className="rounded-full  justify-center flex px-[12px] px-[16px]py-[8px] hover:bg-brand-coral hover:bg-opacity-50 transition-all duration-300 items-center gap-[12px]">
                <a className="text-white font-medium">Speak</a>
                <Speech className="text-white">
                </Speech>
            </button>

            <button onClick={() => setMode('text')} className="rounded-full  justify-center flex px-[12px] px-[16px] py-[8px] hover:bg-brand-coral hover:bg-opacity-50 transition-all duration-300 items-center  gap-[12px]">
                <a className="text-white font-medium">Type</a>
                <MessageSquareText className="text-white">
                </MessageSquareText>
            </button>
        </div>

    );
}
