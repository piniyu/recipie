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
      <div className="flex">
        <Sider />
        <div className="flex-1 bg-gray-50">{children}</div>
      </div>
    </SiderProvider>
  )
}
