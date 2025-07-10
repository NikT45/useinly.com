"use client"
import { motion } from "framer-motion";

type Props = {
    mode: 'idle' | 'voice' | 'text';
};

export default function TalkCircle({mode}: Props) {
    return (
        <motion.div 
            className={`${mode === 'text' ? 'w-[512px] h-[128px] mt-10 rounded-2xl bg-gray-100' : 'rounded-full w-[300px] h-[300px]'} ${mode === 'voice' ? 'bg-brand-coral' : mode === 'idle' ? 'bg-brand-softPink' : ''} flex items-center justify-center`}
            animate={{
                scale: mode === 'voice' ? 1.1 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 15
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
