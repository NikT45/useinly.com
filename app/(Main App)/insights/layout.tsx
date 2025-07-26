import { ReactNode } from 'react'
import { InsightsProvider } from '@/context/InsightsProvider'
interface InsightsLayoutProps {
  children: ReactNode
}

export default function InsightsLayout({ children }: InsightsLayoutProps) {
  return (
    <InsightsProvider>
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </InsightsProvider>
  )
}
