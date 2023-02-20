import { Link, useLocation, useMatches, useNavigate } from '@remix-run/react'
import { useContext, useState } from 'react'
import DropdownMenu from '../drop-down-menu'
import { SiderContext } from '../sider/sider-context'
import LogoutForm from '../logout-form'
import AuthCheck from '../auth/auth-check'
import { Theme, useTheme } from '~/utils/theme-provider'
import BasketModal from './basket-modal'

const Toolbar = ({
  basketData,
}: {
  basketData: { id: string; title: string }[] | null | undefined
}) => {
  const { setClose, close, hidden } = useContext(SiderContext)
  const [theme, setTheme] = useTheme()
  const [openBasket, setOpenBasket] = useState(false)

  if (hidden) return null
  return (
    <header
      className={`fixed z-10 flex min-h-[64px] w-screen items-center bg-inherit ${
        close ? '' : 'pl-[255px]'
      }`}
    >
      <div className="layout-px flex w-full items-center">
        <button
          className="icon-btn-sm icon-btn-ui -ml-2"
          onClick={() => {
            setClose(prev => !prev)
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
              <span
                className="material-symbols-rounded leading-none "
                style={{ fontVariationSettings: "'wght' 300" }}
              >
                shopping_basket
              </span>
            </button>
          )}
        </AuthCheck>
        <div className="mx-2 h-[25px] w-[1px] bg-gray-300 dark:bg-gray-600"></div>
        <DropdownMenu
          summary={
            <button className={`icon-btn-sm icon-btn-ui`}>
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'wght' 300" }}
              >
                {theme === Theme.LIGHT ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          }
          details={
            <ul>
              <li>
                <button
                  className="drop-down-item flex gap-1"
                  onClick={() => setTheme(Theme.LIGHT)}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'wght' 300" }}
                  >
                    light_mode
                  </span>
                  Light
                </button>
              </li>
              <li>
                <button
                  className="drop-down-item flex gap-1"
                  onClick={() => setTheme(Theme.DARK)}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'wght' 300" }}
                  >
                    dark_mode
                  </span>
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
                      <span
                        className="material-symbols-rounded leading-none "
                        style={{ fontVariationSettings: "'wght' 300" }}
                      >
                        account_circle
                      </span>
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
                <span
                  className="material-symbols-rounded leading-none "
                  style={{ fontVariationSettings: "'wght' 300" }}
                >
                  account_circle
                </span>
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
