'use client'

import { useState, useRef, useEffect } from 'react'
import { useReflection } from '@/context/ReflectionProvider'

interface NewReflectionEntryProps {
    suggestPrompt?: string
    onSave?: (text: string) => void
    onCancel: () => void
    placeholder?: string
}

export default function NewReflectionEntry({
    onSave,
    onCancel,
    placeholder = "Write your reflection..."
}: NewReflectionEntryProps) {
    const [text, setText] = useState('')
    const [showPrompt, setShowPrompt] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { saveReflection, suggestedPrompt } = useReflection()
    useEffect(() => {
        if (suggestedPrompt) {
            setShowPrompt(true)
        }
    }, [suggestedPrompt])

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            const textarea = textareaRef.current
            textarea.style.height = 'auto'
            textarea.style.height = `${Math.max(120, textarea.scrollHeight)}px`
        }
    }, [text])

    // Focus textarea on mount
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus()
        }
    }, [])

    const handleSave = async () => {
        if (text.trim()) {
            // Extract title from first line or use a default
            const lines = text.trim().split('\n')
            //keeping title empty for now
            const title = suggestedPrompt || null;
            const content = text.trim()

            try {
                await saveReflection(title, content)
                setText('')
                // Call optional onSave callback if provided
                if (onSave) {
                    onSave(text.trim())
                }
            } catch (error) {
                console.error('Failed to save reflection:', error)
                // Could add user-facing error handling here
            }
        }
    }

    const handleCancel = () => {
        setText('')
        onCancel()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleCancel()
        } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            handleSave()
        }
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    }

    const handleDismissPrompt = () => {
        setShowPrompt(false)
        if (textareaRef.current) {
            textareaRef.current.focus()
        }
    }

    return (
        <div className="w-full bg-white border border-gray-200 rounded-2xl mb-4 p-4 shadow-sm relative">
            {/* Header with date and action buttons */}
            <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-gray-500">
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
                {/* <div className="flex gap-2">
                    <button
                        onClick={handleSave}
                        disabled={!text.trim()}
                        className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="text-xs bg-gray-600 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                </div> */}
            </div>

            {/* Suggested prompt section */}
            {showPrompt && suggestedPrompt && (
                <div className="px-2 rounded-lg flex justify-between items-start">
                    <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-brand-wine ">{suggestedPrompt}</h2>
                    <button
                        onClick={handleDismissPrompt}
                        className="ml-4 text-brand-wine hover:text-brand-berry transition-colors"
                        title="Dismiss prompt"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            )}

            {/* Main textarea */}
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                className="w-full p-3 resize-none outline-none rounded-lg focus:border-brand-berry  transition-colors overflow-hidden"
                placeholder={placeholder}
                style={{ minHeight: '120px' }}
            />

            {/* Helper text */}
            {/* <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-400">Press Cmd+Enter to save, Escape to cancel</p>
                <p className="text-xs text-gray-400">{text.length} characters</p>
            </div> */}

            {/* Save button - appears when there's text */}
            {text.trim() && (
                <button
                    onClick={handleSave}
                    className="absolute bottom-4 right-4 bg-brand-berry text-white px-4 py-2 rounded-lg hover:bg-brand-coral transition-colors text-sm font-medium"
                >
                    Save
                </button>
            )}
        </div>
    )
} 