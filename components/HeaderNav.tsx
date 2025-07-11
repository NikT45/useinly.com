import { MessageCircle, NotebookPen, Lightbulb } from 'lucide-react'

export default function HeaderNav() {
    return (
        /*        <nav className="w-[25%] bg-opacity-35 p-2 rounded-full border bg-brand-softPink">
                   <div className="flex items-center justify-between px-2">
                       <button className="w-10 h-10 rounded-full bg-brand-coral flex items-center justify-center flex-shrink-0">
                           <MessageCircle size={20} className="text-white" strokeWidth={2} />
                       </button>
                       <button className="w-10 h-10 rounded-full bg-brand-coral flex items-center justify-center flex-shrink-0">
                           <Zap size={20} className="text-white" strokeWidth={2} />
                       </button>
                       <button className="w-10 h-10 rounded-full bg-brand-coral flex items-center justify-center flex-shrink-0">
                           <Heart size={20} className="text-white" strokeWidth={2} />
                       </button>
                   </div>
               </nav> */
        <nav className="min-w-[25%] bg-opacity-35 p-[6px] rounded-full bg-brand-softPink flex items-center justify-between">
            <button className="w-10 h-10 rounded-full bg-opacity-30 bg-brand-coral flex items-center justify-center flex-shrink-0">
                <MessageCircle size={20} className="text-brand-wine" strokeWidth={2} />
            </button>
            <button className="w-10 h-10 rounded-full bg-opacity-30 bg-brand-coral flex items-center justify-center flex-shrink-0">
                <NotebookPen size={20} className="text-brand-wine" strokeWidth={2} />
            </button>
            <button className="w-10 h-10 rounded-full bg-opacity-30 bg-brand-coral flex items-center justify-center flex-shrink-0">
                <Lightbulb size={20} className="text-brand-wine" strokeWidth={2} />
            </button>
        </nav>
    )
}