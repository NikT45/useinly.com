import { Speech, MessageSquareText } from 'lucide-react'

export function InteractModesButtons() {
    return (
        <div className="flex gap-[24px]">
            <button className="rounded-full min-w-[128px] justify-center flex px-[12px] py-[8px] items-center bg-brand-softPink gap-[12px]">
                <a className="text-brand-wine font-medium">Speak</a>
                <Speech className="text-brand-wine">
                </Speech>
            </button>

            <div className="rounded-full min-w-[128px] justify-center flex px-[12px] py-[8px] items-center bg-brand-softPink gap-[12px]">
                <a className="text-brand-wine font-medium">Type</a>
                <MessageSquareText className="text-brand-wine">
                </MessageSquareText>
            </div>
        </div>

    );
}
