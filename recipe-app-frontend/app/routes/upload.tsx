import type { ErrorBoundaryComponent } from '@remix-run/node'
import { Link, NavLink, Outlet, useNavigate, useParams } from '@remix-run/react'
import { useContext, useEffect, useState } from 'react'
import ContentCard from '~/components/card/content-card'
import {
  defaultSiderValue,
  SiderActionKind,
  SiderContext,
} from '~/components/sider/sider-context'
import { StepFormProps } from '~/components/step-form'
import {
  getLocalValue,
  localStorageKey,
} from '../components/localstorage-form/methods'

const initialSideList = [
  { value: 'Details', route: './details' },
  { value: 'Ingredients', route: './ingredients' },
  {
    value: 'Steps',
  },
  { stepId: '1', value: `title`, route: `./1` },
]

export default function Upload(): JSX.Element {
  const { state, dispatch } = useContext(SiderContext)
  const { stepIdx } = useParams()
  const [sideList, setSideList] = useState(initialSideList)
  // useEffect(() => {
  //   const localValue = getLocalValue(localStorageKey.MOCK_STEP_FORM)
  //   // if (localValue[0].title !== '') {
  //   const setSider = () =>
  //     dispatch({
  //       type: SiderActionKind.SET_NEW_SIDER,
  //       payload:   //     })
  //   if (localValue.every(v => v !== null)) {
  //     setSider()
  //   } else {
  //     localValue.map(v => {
  //       if (v === null) {
  //         return { title: '', methods: [{ timeStemp: '', content: '' }] }
  //       }
  //       return v
  //     })
  //     setSider()
  //   }
  //   return () => {
  //     dispatch({
  //       type: SiderActionKind.SET_NEW_SIDER,
  //       payload: defaultSiderValue,
  //     })
  //   }
  // }, [dispatch])

  useEffect(() => {
    const local = getLocalValue(localStorageKey.MOCK_STEP_FORM)
    if (stepIdx && +stepIdx > local.length) {
      // console.log(stepIdx, local.length)
      throw new Error()
    }
  }, [stepIdx])

  return (
    // <div>
    <div className="max-w-6xl mx-auto layout-px py-14 space-y-6">
      <header className="flex items-center justify-between  text-black ">
        {/* <ContentCard className="flex items-center justify-between"> */}
        <h2 className="">Upload Recipe</h2>
        <div className="flex gap-2">
          <button className="btn-border btn-sm">Save</button>
          <button className="btn-primary btn-sm">Public</button>
        </div>
        {/* </ContentCard> */}
      </header>
      <ContentCard className="!py-0 !pl-0">
        <div className=" flex w-full space-x-8 ">
          <div className="w-60 py-6 border-r border-gray-200 ">
            <nav className="flex flex-col h-full">
              <ul className="flex-1 [font-family:var(--font-ui)] overflow-auto">
                {sideList.map(({ stepId, value, route }, idx) => {
                  if (!route) {
                    return (
                      <li
                        key={`${value}_${route}`}
                        className="sider-item px-0 text-sm text-gray-400"
                      >
                        {value}
                      </li>
                    )
                  }
                  return (
                    <li key={`${value}_${idx}`} className="flex">
                      <NavLink
                        to={route}
                        className={({ isActive }) => `
                        flex-1 
                        sider-item 
                        transition-colors
                        hover:bg-gray-100/70 
                      
                      ${
                        isActive
                          ? 'text-primary-600 bg-primary-600/10 hover:text-primary-600 hover:bg-primary-600/10'
                          : 'text-black'
                      }
                      `}
                      >
                        {stepId}
                        {stepId && ' . '}
                        {value}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
              <div className="flex">
                <button className="flex-1 btn-sm btn-secondary sider-item  text-white">
                  Add a step
                </button>
              </div>
            </nav>
          </div>
          <div className="flex-1 py-6">
            <Outlet />
          </div>
        </div>
      </ContentCard>
    </div>
    // {/* </div> */}
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  const navigate = useNavigate()
  console.log('error')
  return (
    <div>
      <h1>Oops! Something went wrong!</h1>
      <button
        onClick={() => {
          navigate(-1)
        }}
      >
        Go back
      </button>
      <Link to="/">Home page</Link>
    </div>
  )
}
