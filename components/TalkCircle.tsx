"use client"
import { motion } from "framer-motion";

type Props = {
    mode: 'idle' | 'voice' | 'text';
};

export default function TalkCircle({mode}: Props) {
    return (
        <motion.div 
            className={`rounded-full w-[256px] h-[256px] ${mode === 'voice' ? 'bg-brand-coral' : 'bg-brand-softPink'} ${mode ==='text' ? 'w-[512px] rounded-2xl bg-gray-100' : ''}`}
            animate={{
                scale: mode === 'voice' ? 1.1 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 15
            }}
        >
        </motion.div>
    );
}
