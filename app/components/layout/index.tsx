import type { ReactNode } from 'react'
import Sider from '../sider/sider'
import SiderProvider from '../sider/sider-context'

export default function Layout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <SiderProvider>
      <div className="flex  bg-gray-100 dark:bg-gray-800">
        <Sider />
        {children}
      </div>
    </SiderProvider>
  )
}
