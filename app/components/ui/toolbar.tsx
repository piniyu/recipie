import { Link, useLocation } from '@remix-run/react'
import { useState } from 'react'
import DropdownMenu from './drop-down-menu'
import LogoutForm from '../form/logout-form'
import AuthCheck from '../../feature/auth/auth-check'
import { Theme, useTheme } from '~/context/theme-provider'
import BasketModal from './basket-modal'
import PersonIcon from '~/components/icons/PersonFill0Wght400Grad25Opsz48'
import DarkModeIcon from '~/components/icons/DarkModeFill0Wght400Grad25Opsz48'
import LightModeIcon from '~/components/icons/LightModeFill0Wght400Grad25Opsz48'
import MenuIcon from '~/components/icons/MenuFill1Wght400Grad25Opsz48'
import BasketIcon from '~/components/icons/ShoppingBasketFill0Wght400Grad25Opsz48'
import { useAppDispatch, useAppSelector } from '~/store/configure-store'
import { setSiderOpen } from '~/store/sider-slice'

const Toolbar = ({
  basketData,
}: {
  basketData:
    | { id: string; title: string; thumbnailSrc: string }[]
    | null
    | undefined
}) => {
  const location = useLocation()
  const [theme, setTheme] = useTheme()
  const [openBasket, setOpenBasket] = useState(false)
  const dispatch = useAppDispatch()
  const siderState = useAppSelector(s => s.sider)

  if (siderState.hidden) return null
  return (
    <header
      className={`fixed z-10 flex min-h-[64px] w-screen items-center bg-inherit ${
        !siderState.open ? '' : 'lg:pl-[255px] '
      }`}
    >
      <div className="layout-px flex w-full items-center">
        <button
          className={`icon-btn-sm icon-btn-ui -ml-2 ${
            !siderState.open ? '' : 'hidden lg:block'
          }`}
          onClick={() => {
            dispatch(setSiderOpen(!siderState.open))
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
                    <button className="icon-btn-sm icon-btn-ui" type="button">
                      <PersonIcon className="svg-md svg-gray" />

                      <span>{user.email.split('@')[0]}</span>
                    </button>
                  }
                  details={<LogoutForm btnClassName="drop-down-item" />}
                  data-cy="avatar"
                />
              </>
            ) : (
              <Link
                to={`/login?redirectTo=${location.pathname}`}
                className="icon-btn-sm icon-btn-ui"
                data-cy="login"
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
