import type { ReactNode } from 'react'
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

export default function Modal({
  onClose,
  open,
  children,
  className,
  dialogClassName,
}: {
  onClose: () => void
  open: boolean
  children: ReactNode
  className?: string
  dialogClassName?: string
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const modalContainer = document.getElementById('modal-container')
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).contains(dialogRef.current)) {
        return
      }
      if (dialogRef.current) {
        onClose()
      }
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [onClose])
  useEffect(() => {
    if (!dialogRef.current) {
      return
    }
    if (open) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [open])

  if (!modalContainer) {
    throw new Error('modal-container not found!')
  }

  return ReactDOM.createPortal(
    <dialog
      className={` p-0 bg-transparent ${dialogClassName ?? ''}`}
      ref={dialogRef}
    >
      <div className={` bg-white ${className ?? ''}`}>{children}</div>
    </dialog>,
    modalContainer,
  )
}
