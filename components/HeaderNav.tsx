'use client'

import { MessageCircle, NotebookPen, Lightbulb } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function HeaderNav() {
    const pathname = usePathname()
    const isHome = pathname === '/home'
    
    return (
        <nav className="min-w-[25%] p-[6px] rounded-full flex items-center justify-between">
            <button className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 group ${isHome ? 'bg-brand-coral' : ''}`}>
                <MessageCircle size={24} className={`${isHome ? 'text-white' : 'text-brand-coral group-hover:text-brand-wine'}`} strokeWidth={2} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 group">
                <NotebookPen size={24} className="text-brand-coral group-hover:text-brand-wine" strokeWidth={2} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 group">
                <Lightbulb size={24} className="text-brand-coral group-hover:text-brand-wine" strokeWidth={2} />
            </button>
        </nav>
    )
}