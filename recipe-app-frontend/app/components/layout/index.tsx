import type { ReactNode } from 'react'
import { useContext } from 'react'
import Sider from '../sider/sider'
import SiderProvider, { SiderContext } from '../sider/sider-context'
import Toolbar from './toolbar'

const LayoutChildren = ({ children }: { children: ReactNode }) => {
  const { close } = useContext(SiderContext)
  return (
    <div className={`min-h-screen flex-1 pt-16 ${close ? '' : 'pl-[255px]'}`}>
      {children}
    </div>
  )
}

export default function Layout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <SiderProvider>
      <div className="flex bg-gray-100">
        <Sider />
        <Toolbar />
        <LayoutChildren>{children}</LayoutChildren>
      </div>
    </SiderProvider>
  )
}
