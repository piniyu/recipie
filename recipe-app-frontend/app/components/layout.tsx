import { ReactNode } from 'react'
import Sider from './sider/sider'
import SiderProvider from './sider/sider-context'

export default function Layout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <SiderProvider>
      <div className="flex bg-gray-50">
        <Sider />
        <div className="flex-1 ">{children}</div>
      </div>
    </SiderProvider>
  )
}
