'use client'

import { useState, useRef, useEffect } from 'react'
import { useReflection } from '@/context/ReflectionProvider'

export default function ReflectionEntry(props: {
    id: string
    title: string
    text: string
    date: string
    onTextChange?: (newText: string) => void
    onUpdate?: (id: string, content: string, title?: string) => Promise<void>
}) {
    const { id, title, text, date, onTextChange, onUpdate } = props
    const { updateReflection } = useReflection()
    
    // Format the date for display
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric', 
                month: 'long',
                day: 'numeric'
            })
        } catch (error) {
            return dateString // fallback to original string if parsing fails
        }
    }
    
    const formattedDate = formatDate(date)
    const [isExpanded, setIsExpanded] = useState(false)
    const [hasOverflow, setHasOverflow] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(text)
    const [editTitle, setEditTitle] = useState(title)
    const textRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textRef.current && !isEditing) {
            const element = textRef.current
            // Temporarily force collapsed state to check for overflow
            const wasExpanded = isExpanded
            const originalDisplay = element.style.display
            const originalWebkitLineClamp = element.style.webkitLineClamp
            const originalOverflow = element.style.overflow

            // Temporarily apply collapsed styles to check overflow
            element.style.display = '-webkit-box'
            element.style.webkitLineClamp = '3'
            element.style.overflow = 'hidden'

            // Check if text overflows in collapsed state
            const hasOverflowInCollapsedState = element.scrollHeight > element.clientHeight
            setHasOverflow(hasOverflowInCollapsedState)

            // Restore original styles
            if (wasExpanded) {
                element.style.display = originalDisplay
                element.style.webkitLineClamp = originalWebkitLineClamp
                element.style.overflow = originalOverflow
            }
        }
    }, [text, isEditing, isExpanded])

    // Auto-resize textarea in edit mode
    useEffect(() => {
        if (isEditing && textareaRef.current) {
            const textarea = textareaRef.current
            // Reset height to auto to get the correct scrollHeight
            textarea.style.height = 'auto'
            // Set height to fit content with a minimum height
            textarea.style.height = `${Math.max(100, textarea.scrollHeight)}px`
        }
    }, [isEditing, editText])

    const toggleExpanded = () => {
        if (hasOverflow && !isEditing) {
            setIsExpanded(!isExpanded)
        }
    }

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsEditing(true)
        setEditText(text)
        setEditTitle(title)
        // Reset expanded state when entering edit mode
        setIsExpanded(false)
    }

    const handleSave = async () => {
        try {
            // Call updateReflection from context
            await updateReflection(id, editText, editTitle || null)
            
            // Also call onUpdate prop if provided for backward compatibility
            if (onUpdate) {
                await onUpdate(id, editText, editTitle)
            }
            
            if (onTextChange) {
                onTextChange(editText)
            }
            
            setIsEditing(false)
        } catch (error) {
            console.error('Error updating reflection:', error)
        }
    }

    const handleCancel = () => {
        setEditText(text)
        setEditTitle(title)
        setIsEditing(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleCancel()
        } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            handleSave()
        }
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditText(e.target.value)
    }

    if (isEditing) {
        return (
            <div className="w-full bg-brand-coral bg-opacity-15 rounded-2xl mb-4 p-4">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-xs text-brand-wine opacity-50">{formattedDate}</p>
                    <button
                        onClick={handleCancel}
                        className="text-brand-wine hover:text-brand-berry transition-colors"
                        title="Dismiss prompt"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button> 
                </div>
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="text-brand-wine w-full p-2 mb-3 outline-none rounded-lg bg-white border border-gray-300 focus:border-brand-berry transition-colors text-lg font-semibold"
                    placeholder="Reflection title (optional)"
                />
                <textarea
                    ref={textareaRef}
                    value={editText}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                    className="text-brand-wine w-full p-2 resize-none outline-none rounded-lg bg-white border border-gray-300 focus:border-brand-berry transition-colors overflow-hidden"
                    placeholder="Write your reflection..."
                    autoFocus
                    style={{ minHeight: '100px' }}
                />
                <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-brand-wine opacity-50 mt-1">Press Cmd+Enter to save, Escape to cancel</p>
                    <button
                        onClick={handleSave}
                        className="text-xs bg-brand-berry text-white px-4 py-2 rounded-lg hover:bg-brand-coral transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>

        )
    }

    return (
        <div className="w-full border border-gray-200 rounded-2xl mb-4 overflow-hidden relative shadow-sm">
            {/* Edit button positioned absolutely */}
            <button
                onClick={handleEditClick}
                className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors p-1"
                title="Edit reflection"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            </button>

            {/* Main content area - clickable for expand/collapse */}
            <div
                onClick={toggleExpanded}
                className={`p-4 flex flex-col w-full ${hasOverflow ? 'hover:bg-brand-coral hover:bg-opacity-5 cursor-pointer' : 'cursor-default'} transition-colors`}
            >
                <p className="text-xs text-gray-500 mb-2 pr-8">{formattedDate}</p>
                {title && <h2 className="text-lg font-semibold text-brand-wine mb-2">{title}</h2>}
                <div
                    ref={textRef}
                    className={`text-brand-wine w-full text-brand-wine whitespace-pre-wrap ${!isExpanded ? 'line-clamp-3' : ''
                        }`}
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: !isExpanded ? 3 : 'none',
                        WebkitBoxOrient: 'vertical',
                        overflow: !isExpanded ? 'hidden' : 'visible'
                    }}
                >
                    {text}
                </div>
                {hasOverflow && (
                    <div className="mt-2 text-xs text-brand-coral font-medium">
                        {isExpanded ? 'Show less' : 'Show more'}
                    </div>
                )}
            </div>
        </div>
    )
}