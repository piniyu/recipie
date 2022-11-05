import React, { ReactNode, useEffect, useRef, useState } from 'react'

export default function DropdownMenu({
  hasDownArrow,
  icon,
  summary,
  details,
  direction = 'left',
}: {
  hasDownArrow?: boolean
  icon?: ReactNode
  summary: string
  details: ReactNode
  direction?: 'left' | 'right'
}): JSX.Element {
  const [open, setOpen] = useState(false)
  const detailsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        detailsRef.current &&
        e.target &&
        !detailsRef.current.contains(e.target as HTMLElement)
      ) {
        setOpen(false)
      }
    }
    window.addEventListener('click', clickOutside)

    return () => {
      window.addEventListener('click', clickOutside)
    }
  }, [])

  return (
    <div key={`${summary}`} className="relative select-none " ref={detailsRef}>
      <button
        className="marker:content-[''] btn-sm bg-white text-black border-none shadow-sm flex items-center gap-2  cursor-pointer"
        onClick={e => {
          setOpen(o => !o)
        }}
      >
        {icon}
        {summary}
        {hasDownArrow && (
          <span
            className={`material-symbols-rounded transition-transform ${
              open ? '-rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        )}
      </button>
      {open && (
        <div
          className={`
          absolute z-10 
          flex flex-col 
           border-gray-200 rounded-lg 
          mt-1 px-4 py-3 
          bg-white shadow-xl
          ${direction === 'left' ? '' : 'right-0'}
				`}
        >
          {details}
        </div>
      )}
    </div>
  )
}
