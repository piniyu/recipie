import type { ReactNode } from 'react'
import React from 'react'

export default function IconBtn({
  type,
  icon,
}: {
  type: 'ghost' | 'border'
  icon: ReactNode
}): JSX.Element {
  /**TODO:expose onClick? */
  return (
    <button
      className={`
    ${
      type === 'ghost'
        ? 'btn-ghost'
        : 'bg-white text-black shadow-md  transition-all hover:-translate-y-0.5 hover:text-primary hover:shadow-lg'
    } flex h-12 w-12 items-center justify-center rounded-full`}
    >
      {icon}
    </button>
  )
}
