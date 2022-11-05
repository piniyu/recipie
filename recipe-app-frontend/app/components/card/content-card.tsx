import { ReactNode } from 'react'

export default function ContentCard({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}): JSX.Element {
  return (
    <div
      className={`w-full h-full border border-gray-50 bg-white px-9 py-8 rounded-3xl shadow-2xl shadow-gray-300/50 ${className}`}
    >
      {children}
    </div>
  )
}
