'use client'

import { MessageCircle, NotebookPen, Lightbulb, Settings } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export default function HeaderNav() {
    const pathname = usePathname()
    const isHome = pathname === '/home'
    const isReflections = pathname === '/reflections'
    const isInsights = pathname === '/insights'
    const router = useRouter()
    return (
        <div className="relative w-full flex items-center justify-center">
            <nav className="min-w-[20%] p-[6px] rounded-full flex items-center justify-between">
                <button onClick={() => router.push('/home')} className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 group hover:bg-brand-berry ${isHome ? 'bg-brand-berry' : ''}`}>
                    <MessageCircle size={24} className={`${isHome ? 'text-white' : 'text-brand-berry group-hover:text-white'}`} strokeWidth={2} />
                </button>
                <button onClick={() => router.push('/reflections')} className={`w-10 h-10 rounded-full flex items-center hover:bg-brand-berry justify-center flex-shrink-0 group ${isReflections ? 'bg-brand-berry' : ''}`}>
                    <NotebookPen size={24} className={`${isReflections ? 'text-white' : 'text-brand-berry group-hover:text-white'}`} strokeWidth={2} />
                </button>
                <button onClick={() => router.push('/insights')} className={`w-10 h-10 rounded-full flex items-center hover:bg-brand-berry justify-center flex-shrink-0 group ${isInsights ? 'bg-brand-berry' : ''}`}>
                    <Lightbulb size={24} className={`${isInsights ? 'text-white' : 'text-brand-berry group-hover:text-white'}`} strokeWidth={2} />
                </button>
            </nav>
            
            {/* Settings button positioned on the far right */}
            <button 
                onClick={() => router.push('/settings')} 
                className="absolute right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-brand-berry hover:bg-gray-100 transition-colors"
            >
                <Settings size={18} strokeWidth={2} />
            </button>
        </div>
    )
}