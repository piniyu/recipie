import { ReactNode } from 'react'

export default function ContentCard({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <div className="w-full h-full border border-gray-50 bg-white px-9 py-8 rounded-lg shadow-gray-300 shadow-2xl">
      {children}
    </div>
  )
}
