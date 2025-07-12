import { Speech, MessageSquareText } from 'lucide-react'
import { useConversation } from '@/context/ConversationProvider';

export function InteractModesButtons() {
    const {mode, setMode, startConversation} = useConversation();
    return (
        <div className="flex mt-10 gap-[24px]">
            <button onClick={() => {startConversation()}} className="rounded-full min-w-[128px] justify-center flex px-[12px] py-[8px] items-center bg-brand-softPink gap-[12px]">
                <a className="text-brand-wine font-medium">Speak</a>
                <Speech className="text-brand-wine">
                </Speech>
            </button>

            <button onClick={() => setMode('text')} className="rounded-full min-w-[128px] justify-center flex px-[12px] py-[8px] items-center bg-brand-softPink gap-[12px]">
                <a className="text-brand-wine font-medium">Type</a>
                <MessageSquareText className="text-brand-wine">
                </MessageSquareText>
            </button>
        </div>

    );
}
