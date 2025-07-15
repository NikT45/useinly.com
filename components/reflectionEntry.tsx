'use client'

import { useState, useRef, useEffect } from 'react'

export default function ReflectionEntry(props: {
    id: string
    text: string
    date: string
    onTextChange?: (newText: string) => void
    onUpdate?: (id: string, content: string) => Promise<void>
}) {
    const { id, text, date, onTextChange, onUpdate } = props
    const [isExpanded, setIsExpanded] = useState(false)
    const [hasOverflow, setHasOverflow] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(text)
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
        // Reset expanded state when entering edit mode
        setIsExpanded(false)
    }

    const handleSave = () => {
        if (onUpdate) {
            onUpdate(id, editText).then(() => {
                if (onTextChange) {
                    onTextChange(editText)
                }
            })
        }
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditText(text)
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
            <div className="w-full bg-gray-100 rounded-2xl mb-4 p-4">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-gray-500">{date}</p>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                <textarea
                    ref={textareaRef}
                    value={editText}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                    className="w-full p-2 resize-none outline-none rounded-lg bg-white border border-gray-300 focus:border-blue-500 transition-colors overflow-hidden"
                    placeholder="Write your reflection..."
                    autoFocus
                    style={{ minHeight: '100px' }}
                />
                <p className="text-xs text-gray-400 mt-1">Press Cmd+Enter to save, Escape to cancel</p>
            </div>
        )
    }

    return (
        <div className="w-full bg-gray-100 rounded-2xl mb-4 overflow-hidden relative">
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
                className={`p-4 flex flex-col w-full ${hasOverflow ? 'hover:bg-gray-200 cursor-pointer' : 'cursor-default'} transition-colors`}
            >
                <p className="text-xs text-gray-500 mb-2 pr-8">{date}</p>
                <div
                    ref={textRef}
                    className={`w-full text-gray-800 whitespace-pre-wrap ${
                        !isExpanded ? 'line-clamp-3' : ''
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
                    <div className="mt-2 text-xs text-blue-600 font-medium">
                        {isExpanded ? 'Show less' : 'Show more'}
                    </div>
                )}
            </div>
        </div>
    )
}