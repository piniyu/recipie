import { Link } from '@remix-run/react'
import { useContext, useState } from 'react'
import DropdownMenu from './drop-down-menu'
import { SiderContext } from './sider/sider-context'
import LogoutForm from '../form/logout-form'
import AuthCheck from '../../feature/auth/auth-check'
import { Theme, useTheme } from '~/context/theme-provider'
import BasketModal from './basket-modal'
import PersonIcon from '~/components/icons/PersonFill0Wght400Grad25Opsz48'
import DarkModeIcon from '~/components/icons/DarkModeFill0Wght400Grad25Opsz48'
import LightModeIcon from '~/components/icons/LightModeFill0Wght400Grad25Opsz48'
import MenuIcon from '~/components/icons/MenuFill1Wght400Grad25Opsz48'
import BasketIcon from '~/components/icons/ShoppingBasketFill0Wght400Grad25Opsz48'

const Toolbar = ({
  basketData,
}: {
  basketData:
    | { id: string; title: string; thumbnailSrc: string }[]
    | null
    | undefined
}) => {
  const { setClose, close, hidden } = useContext(SiderContext)
  const [theme, setTheme] = useTheme()
  const [openBasket, setOpenBasket] = useState(false)

  if (hidden) return null
  return (
    <header
      className={`fixed z-10 flex min-h-[64px] w-screen items-center bg-inherit ${
        close ? '' : 'lg:pl-[255px] '
      }`}
    >
      <div className="layout-px flex w-full items-center">
        <button
          className={`icon-btn-sm icon-btn-ui -ml-2 ${
            close ? '' : 'hidden lg:block'
          }`}
          onClick={() => {
            setClose(prev => !prev)
          }}
        >
          <MenuIcon className="svg-md svg-gray" />
        </button>
        <div className="flex-1"></div>

        <AuthCheck>
          {user => (
            <button
              className="icon-btn-sm icon-btn-ui"
              onClick={() => {
                if (user?.id) {
                  setOpenBasket(true)
                }
              }}
            >
              <BasketIcon className="svg-md svg-gray" />
            </button>
          )}
        </AuthCheck>
        <div className="mx-2 h-[25px] w-[1px] bg-gray-300 dark:bg-gray-600"></div>
        <DropdownMenu
          summary={
            <button className={`icon-btn-sm icon-btn-ui`}>
              {theme === Theme.LIGHT ? (
                <LightModeIcon className="svg-md svg-gray" />
              ) : (
                <DarkModeIcon className="svg-md svg-gray" />
              )}
            </button>
          }
          details={
            <ul>
              <li>
                <button
                  className="drop-down-item flex gap-1"
                  onClick={() => setTheme(Theme.LIGHT)}
                >
                  <LightModeIcon className="svg-md svg-gray" />
                  Light
                </button>
              </li>
              <li>
                <button
                  className="drop-down-item flex gap-1"
                  onClick={() => setTheme(Theme.DARK)}
                >
                  <DarkModeIcon className="svg-md svg-gray" />
                  Dark
                </button>
              </li>
            </ul>
          }
        />
        <AuthCheck loginConfirmModal={false}>
          {user =>
            user !== null && user.id !== null && user.email ? (
              <>
                <DropdownMenu
                  summary={
                    <button className="icon-btn-sm icon-btn-ui">
                      <PersonIcon className="svg-md svg-gray" />

                      <span>{user.email.split('@')[0]}</span>
                    </button>
                  }
                  details={<LogoutForm btnClassName="drop-down-item" />}
                />
              </>
            ) : (
              <Link
                to={`/login?redirectTo=${window.location.href}`}
                className="icon-btn-sm icon-btn-ui"
              >
                <PersonIcon className="svg-md svg-gray" />

                <span>Login</span>
              </Link>
            )
          }
        </AuthCheck>
      </div>
      <BasketModal
        basketData={basketData}
        open={openBasket}
        onClose={() => {
          setOpenBasket(false)
        }}
      />
    </header>
  )
}
export default Toolbar
