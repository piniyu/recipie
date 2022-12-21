import { Link, useLocation, useMatches, useNavigate } from '@remix-run/react'
import { useContext } from 'react'
import DropdownMenu from '../drop-down-menu'
import { SiderContext } from '../sider/sider-context'
import LogoutForm from '../logout-form'
import AuthCheck from '../auth/auth-check'

const Toolbar = () => {
  const { setClose, close, hidden } = useContext(SiderContext)
  const navigate = useNavigate()

  if (hidden) return null
  // const userId = matches.find(match => match.pathname === '/')?.data.userId
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
        <Link to="/upload/details" className="btn-sm btn-secondary mr-4">
          Uplode Recipe
        </Link>
        <AuthCheck>
          {user => (
            <button
              className="icon-btn-sm icon-btn-ui"
              onClick={() => {
                user && navigate('?basket-panel=true')
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
        <div className="w-[1px] h-[25px] mx-2 bg-gray-300"></div>
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
    </header>
  )
}
export default Toolbar
