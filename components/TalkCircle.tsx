"use client"
import { motion } from "framer-motion";
import { useConversation } from "@/context/ConversationProvider";
import { Send, ArrowLeft } from "lucide-react";

export default function TalkCircle() {
    const { mode, customHandleSubmit, input, handleInputChange, messages_remaining, setMode, audioLevel } = useConversation();

    function handleSubmit(e?: React.FormEvent) {
        if (e) e.preventDefault();
        console.log("handling...");
        customHandleSubmit();
        // rest of your logic
    }

    // Calculate dynamic scale based on audio level
    const getVoiceScale = () => {
        if (mode === 'voice' && audioLevel !== undefined) {
            // Base scale of 1.0, with audio-reactive scaling from 0.95 to 1.15
            return 1.0 + (audioLevel * 0.2) - 0.05;
        }
        return 1; // Default scale for voice mode
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {mode === 'text' &&
                <motion.div 
                    className="flex px-6 justify-start w-full"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                    }}
                >
                    <button type="button" onClick={() => { setMode('idle') }} className="group p-2 shadow-2xl rounded-full ring-1 ring-gray-500 ring-opacity-10 bg-brand-coral flex gap-[2px] items-center text-sm text-white transition-all duration-300 hover:rounded-full hover:px-3">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[100px] overflow-hidden transition-all duration-300 whitespace-nowrap">Back to home</span>
                    </button>
                </motion.div>
            }

            <motion.div
                className={`${mode === 'text' ? 'w-[512px] h-[128px] rounded-2xl shadow-lg ring-1 ring-gray-500 ring-opacity-10 backdrop-blur-sm' : 'rounded-full w-[300px] h-[300px]'} ${mode === 'voice' ? 'bg-brand-coral' : mode === 'idle' || mode === 'loading' ? 'bg-brand-softPink bg-opacity-50' : ''} flex items-center justify-between`}
                animate={{
                    scale: mode === 'voice' ? getVoiceScale() : mode === 'loading' ? [0.95, 1.05, 0.95] : mode === 'idle' ? [0.9, 0.95, 0.9] : 0.9,
                }}
                transition={{
                    ...(mode === 'voice'
                        ? {
                            type: "spring",
                            stiffness: 400,
                            damping: 5,
                            mass: 0.8
                        }
                        : mode === 'loading'
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
                    <form onSubmit={handleSubmit} className="w-full h-full">
                        <textarea
                            className="text-brand-wine w-full h-full p-4 pr-14 bg-transparent resize-none outline-none rounded-2xl"
                            placeholder="Speak your mind..."
                            disabled={mode !== 'text'}
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit();
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
            {mode === 'text' && <a className="text-sm text-brand-wine text-opacity-30">{messages_remaining} messages remaining</a>}
        </div>
    );
}
