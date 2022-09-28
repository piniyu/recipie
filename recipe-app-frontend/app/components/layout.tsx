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
      <div className="grid grid-cols-[auto_1fr]">
        <Sider />
        {children}
      </div>
    </SiderProvider>
  )
}
