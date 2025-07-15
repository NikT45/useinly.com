import { ReactNode } from 'react'
import { ConversationProvider } from '@/context/ConversationProvider'
interface HomeLayoutProps {
  children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <ConversationProvider>
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </ConversationProvider>
  )
}
