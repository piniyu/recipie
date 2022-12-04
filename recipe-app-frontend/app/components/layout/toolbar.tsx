import { useNavigate } from '@remix-run/react'
import { useContext } from 'react'
import { SiderContext } from '../sider/sider-context'
const Toolbar = () => {
  const { setClose, close } = useContext(SiderContext)
  const navigate = useNavigate()

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
        <button className="btn-sm btn-secondary mr-4">Uplode Recipe</button>
        <button
          className="icon-btn-sm icon-btn-ui"
          onClick={() => {
            navigate('?basket-panel=true')
          }}
        >
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
export default Toolbar
