import { ReactNode } from 'react'

export default function IconBtn({
  type,
  icon,
}: {
  type: 'ghost' | 'border'
  icon: ReactNode
}): JSX.Element {
  return (
    <button
      className={`
    ${
      type === 'ghost'
        ? 'btn-ghost'
        : 'bg-white shadow-md hover:text-orange-600 hover:shadow-lg hover:-translate-y-0.5 transition-all'
    } h-12 w-12 rounded-full flex items-center justify-center`}
    >
      {icon}
    </button>
  )
}
