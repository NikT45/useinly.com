"use client"
import { motion } from "framer-motion";
import { useConversation } from "@/context/ConversationProvider";
import { Send } from "lucide-react";

export default function TalkCircle() {
    const { mode, handleSubmit, input, handleInputChange } = useConversation();

    function customHandleSubmit(e?: React.FormEvent) {
        if (e) e.preventDefault();
        console.log("handling...");
        handleSubmit();
        // rest of your logic
    }

    return (
        <motion.div
            className={`${mode === 'text' ? 'w-[512px] h-[128px] mt-10 rounded-2xl bg-gray-100' : 'rounded-full w-[300px] h-[300px]'} ${mode === 'voice' ? 'bg-brand-coral' : mode === 'idle' || mode === 'loading' ? 'bg-brand-softPink' : ''} flex items-center justify-between`}
            animate={{
                scale: mode === 'voice' ? 1 : mode === 'loading' ? [0.95, 1.05, 0.95] : mode === 'idle' ? [0.9, 0.95, 0.9] : 0.9,
            }}
            transition={{
                ...(mode === 'loading'
                    ? {
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut"
                    }
                    : mode === 'idle'
                    ? {
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                    }
                    : {
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                    }
                )
            }}
        >
            {mode === 'text' && (
                //<form onSubmit={handleSubmit}>
                <form onSubmit={customHandleSubmit} className="w-full h-full relative">
                    <textarea
                        className="w-full h-full p-4 pr-14 bg-transparent resize-none outline-none rounded-2xl"
                        placeholder="Speak your mind..."
                        disabled={mode !== 'text'}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                customHandleSubmit();
                            }
                        }}
                    />
                    <button
                        type="submit"
                        className="absolute bottom-3 right-3 w-10 h-10 bg-brand-coral rounded-full flex items-center justify-center hover:bg-opacity-80 transition-all duration-200"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </button>
                </form>
            )}
        </motion.div>
    );
}
