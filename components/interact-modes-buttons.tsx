import { Speech, MessageSquareText } from 'lucide-react'
import { useConversation } from '@/context/ConversationProvider';

export function InteractModesButtons() {
    const { mode, setMode, startConversation, minutes_remaining } = useConversation();
    const isDisabled = minutes_remaining === 0;
    
    return (
        <div className="flex flex-col items-center justify-center gap-[12px]">
            <div className="flex mt-10 p-[2px] bg-brand-softPink bg-opacity-50 rounded-full shadow-md">
                <button 
                    onClick={isDisabled ? undefined : () => { startConversation() }} 
                    disabled={isDisabled}
                    className={`rounded-full justify-center flex px-[12px] px-[16px] py-[8px] transition-all duration-300 items-center gap-[12px] ${
                        isDisabled 
                            ? 'cursor-not-allowed opacity-30' 
                            : 'hover:bg-brand-coral hover:bg-opacity-50'
                    }`}
                >
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
            <a className="text-sm text-brand-wine text-opacity-30">{minutes_remaining} minutes remaining</a>

        </div >

    );
}
