'use client'

import { MessageCircle, NotebookPen, Lightbulb } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export default function HeaderNav() {
    const pathname = usePathname()
    const isHome = pathname === '/home'
    const isReflections = pathname === '/reflections'
    const isInsights = pathname === '/insights'
    const router = useRouter()
    return (
        <nav className="min-w-[25%] p-[6px] rounded-full flex items-center justify-between">
            <button onClick={() => router.push('/home')} className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 group hover:bg-brand-coral ${isHome ? 'bg-brand-coral' : ''}`}>
                <MessageCircle size={24} className={`${isHome ? 'text-white' : 'text-brand-coral group-hover:text-white'}`} strokeWidth={2} />
            </button>
            <button onClick={() => router.push('/reflections')} className={`w-10 h-10 rounded-full flex items-center hover:bg-brand-coral justify-center flex-shrink-0 group ${isReflections ? 'bg-brand-coral' : ''}`}>
                <NotebookPen size={24} className={`${isReflections ? 'text-white' : 'text-brand-coral group-hover:text-white'}`} strokeWidth={2} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-brand-coral flex-shrink-0 group">
                <Lightbulb size={24} className="text-brand-coral group-hover:text-white" strokeWidth={2} />
            </button>
        </nav>
    )
}