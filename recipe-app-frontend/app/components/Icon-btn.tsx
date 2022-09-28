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
      type === 'ghost' ? 'btn-ghost' : 'border'
    } h-8 w-8 rounded-lg flex items-center justify-center`}
    >
      {icon}
    </button>
  )
}
