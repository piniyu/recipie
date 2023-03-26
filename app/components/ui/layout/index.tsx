import { ReactNode, useEffect } from 'react'
import useResizeObserver from 'use-resize-observer'
import { useAppDispatch } from '~/store/configure-store'
import { setSiderOpen } from '~/store/sider-slice'
import Sider from '../sider/sider'

export default function Layout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const { width } = useResizeObserver({ ref: document.body })
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (width === undefined) {
      return
    }
    if (width && width <= 768) {
      dispatch(setSiderOpen(false))
    } else {
      dispatch(setSiderOpen(true))
    }
  }, [])

  useEffect(() => {
    if (width === undefined) {
      return
    }
    if (width <= 768) {
      dispatch(setSiderOpen(false))
    }
  }, [width])

  return (
    <div className="flex  bg-gray-100 dark:bg-gray-800">
      <Sider />
      {children}
    </div>
  )
}
