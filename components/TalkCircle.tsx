"use client"
import { motion } from "framer-motion";
import { useConversation } from "@/context/ConversationProvider";

export default function TalkCircle() {
    const {mode} = useConversation();
    return (
        <motion.div 
            className={`${mode === 'text' ? 'w-[512px] h-[128px] mt-10 rounded-2xl bg-gray-100' : 'rounded-full w-[300px] h-[300px]'} ${mode === 'voice' ? 'bg-brand-coral' : mode === 'idle' || mode === 'loading' ? 'bg-brand-softPink' : ''} flex items-center justify-between`}
            animate={{
                scale: mode === 'voice' ? 1 : mode === 'loading' ? [0.95, 1.05, 0.95] : 0.9,
            }}
            transition={{
                ...(mode === 'loading' 
                    ? {
                        repeat: Infinity,
                        duration: 1.5,
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
                <textarea
                    className="w-full h-full p-4 bg-transparent resize-none outline-none rounded-2xl"
                    placeholder="Speak your mind..."
                    disabled={mode !== 'text'}
                />
            )}
        </motion.div>
    );
}
