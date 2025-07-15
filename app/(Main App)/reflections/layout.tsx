import { ReactNode } from 'react'
import { ReflectionProvider } from '@/context/ReflectionProvider'
interface ReflectionsLayoutProps {
  children: ReactNode
}

export default function ReflectionsLayout({ children }: ReflectionsLayoutProps) {
  return (
    <ReflectionProvider>
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </ReflectionProvider>
  )
}
