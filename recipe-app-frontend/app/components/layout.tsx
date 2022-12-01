import type { ReactNode } from 'react'
import { useContext } from 'react'
import Sider from './sider/sider'
import SiderProvider, { SiderContext } from './sider/sider-context'

const Toolbar = () => {
  const { setClose, close } = useContext(SiderContext)
  return (
    <header
      className={`fixed z-10 w-screen min-h-[64px] flex items-center bg-inherit ${
        close ? '' : 'pl-[255px]'
      }`}
    >
      <div className="flex items-center layout-px w-full">
        <button
          className="icon-btn-sm icon-btn-ui -ml-2"
          onClick={() => {
            // setClose(false)
            setClose(prev => {
              console.log(prev)
              return !prev
            })
          }}
        >
          <span
            className="material-symbols-rounded leading-none "
            style={{ fontVariationSettings: '"wght" 300 ' }}
          >
            menu
          </span>
        </button>
        <div className="flex-1"></div>
        <button className="btn-sm btn-secondary mr-4">Uplode Recipe</button>
        <button className="icon-btn-sm icon-btn-ui">
          <span
            className="material-symbols-rounded leading-none "
            style={{ fontVariationSettings: "'wght' 300" }}
          >
            shopping_basket
          </span>
        </button>
        <div className="w-[1px] h-[25px] mx-2 bg-gray-300"></div>
        <button className="icon-btn-sm icon-btn-ui">
          <span
            className="material-symbols-rounded leading-none "
            style={{ fontVariationSettings: "'wght' 300" }}
          >
            account_circle
          </span>
        </button>
      </div>
    </header>
  )
}

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
