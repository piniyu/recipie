import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

export default function Modal({
  onClose,
  open,
  children,
  className,
  dialogClassName,
  disableClickOutsideClose,
}: {
  onClose: () => void
  open: boolean
  children: ReactNode
  className?: string
  dialogClassName?: string
  disableClickOutsideClose?: boolean
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
    if (!disableClickOutsideClose) {
      document.addEventListener('click', onClick)
    }
    return () => {
      if (!disableClickOutsideClose) {
        document.removeEventListener('click', onClick)
      }
    }
  }, [onClose])
  useEffect(() => {
    if (!dialogRef.current) {
      return
    }
    if (open) {
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      if (document.body.clientHeight > window.innerHeight) {
        document.body.style.overflowY = 'scroll'
      }
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
    return () => {
      document.body.style.position = 'static'
      document.body.style.overflow = 'unset'
    }
  }, [open])

  if (!modalContainer) {
    throw new Error('modal-container not found!')
  }

  if (!open) {
    return null
  }

  return ReactDOM.createPortal(
    <dialog
      className={` bg-transparent p-0 backdrop:bg-black/70 ${
        dialogClassName ?? ''
      } `}
      ref={dialogRef}
    >
      <div className={`${className ?? ''}`}>{children}</div>
    </dialog>,
    modalContainer,
  )
}
