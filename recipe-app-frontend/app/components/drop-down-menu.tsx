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
  summary: string | ReactNode
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
    <div
      // key={`${summary}`}
      className="relative select-none text-gray-500"
      ref={detailsRef}
    >
      {typeof summary === 'string' ? (
        <button
          className="h-full btn-sm bg-white border-none shadow-sm flex items-center gap-2  cursor-pointer"
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
      ) : (
        <div onClick={() => setOpen(prev => !prev)}>{summary}</div>
      )}
      {open && (
        <div
          className={`
          absolute z-10 
          flex flex-col 
           border-gray-200 rounded-lg 
          mt-1 px-2 py-2 
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
