import { ReactNode, useEffect, useState } from 'react'
import { useCallback } from 'react'
import ReactDOM from 'react-dom'

const Modal = ({
  children,
  open,
}: {
  children: ReactNode
  open: boolean
}): JSX.Element | null => {
  const [renderChildren, setRenderChildren] = useState(false)
  const [containerDiv, setContainerDiv] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!(typeof window === 'object')) {
      return
    }
    const div = document.createElement('div')
    div.id = 'modal-container'
    if (open) {
      document.body.appendChild(div)
      setContainerDiv(div)
      setRenderChildren(true)
    }
    return () => {
      console.log('removeChild')
      const el = document.getElementById('modal-container')
      if (el) {
        document.body.removeChild(el)
      }
    }
  }, [open])

  if (!open || !(typeof window === 'object') || !containerDiv) {
    return null
  }

  return ReactDOM.createPortal(
    <div className="fixed flex items-center justify-center left-0 top-0 right-0 bottom-0 bg-gray-600/50">
      <div className="overflow-hidden w-1/2 max-h-[75vh] rounded-lg bg-white">
        {children}
      </div>
    </div>,
    containerDiv,
  )
}

export default Modal
