import { ErrorBoundaryComponent, json, LoaderFunction } from '@remix-run/node'
import { Link, NavLink, Outlet, useNavigate, useParams } from '@remix-run/react'
import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContentCard from '~/components/card/content-card'
import { useAppDispatch, useAppSelector } from '~/store/configure-store'
import { addStep, deleteStep } from '~/store/upload-temp/step-form-slice'
import { requireUserId } from '~/utils/session.server'
import {
  getLocalValue,
  localStorageKey,
} from '../components/localstorage-form/methods'

const defaultSideList = [
  { value: 'Details', route: './details' },
  { value: 'Ingredients', route: './ingredients' },
]
const defaultStepList = [
  {
    value: 'Steps',
  },
  { stepId: '1', value: `title`, route: `./1` },
]

const SideList = ({
  route,
  value,
  idx,
  stepId,
  onDelete,
}: {
  stepId?: string | undefined
  route?: string
  value: string
  idx: number
  onDelete?: (id: string) => void
}) => {
  if (!route) {
    return (
      <li
        key={`${value}_${route}`}
        className="sider-item px-0 text-sm text-gray-400 uppercase tracking-wider"
      >
        {value}
      </li>
    )
  }
  return (
    <li key={`${value}_${idx}`} className="relative flex">
      <NavLink
        to={route}
        className={({ isActive }) => `
        
                        sider-item 
                        sider-item-gray 
                      ${isActive ? 'bg-primary/10 ' : 'text-black'}
                      `}
      >
        {stepId ? idx + 1 + ' . ' : null}
        {value}
      </NavLink>
      {onDelete && stepId ? (
        <button
          className="absolute z-50 icon-btn-ui flex h-fit right-8 top-2 p-1 rounded-full hover:bg-red-500 text-red-300 hover:text-white"
          onClick={() => {
            // e.stopPropagation()
            onDelete(stepId)
          }}
        >
          <span
            className="material-symbols-outlined leading-none "
            style={{ fontVariationSettings: '"GRAD" -25' }}
          >
            delete
          </span>
        </button>
      ) : null}
    </li>
  )
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  return json({ userId })
}

export default function Upload(): JSX.Element {
  // const { state, dispatch } = useContext(SiderContext)
  const { stepIdx } = useParams()
  const [sideList, setSideList] = useState(defaultSideList)
  const stepForms = useAppSelector(state => state.stepForm)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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

  // useEffect(() => {
  //   const local = getLocalValue(localStorageKey.MOCK_STEP_FORM)
  //   if (stepIdx && +stepIdx > local.length) {
  //     // console.log(stepIdx, local.length)
  //     throw new Error()
  //   }
  // }, [stepIdx])

  return (
    // <div>
    <div className="max-w-6xl mx-auto layout-px py-14 space-y-6">
      <header className="flex items-center justify-between  text-black ">
        {/* <ContentCard className="flex items-center justify-between"> */}
        <h2 className="">Upload Recipe</h2>
        <div className="flex gap-2">
          <button className="btn-border btn-sm">Save</button>
          <button className="btn-secondary btn-sm">Public</button>
        </div>
        {/* </ContentCard> */}
      </header>
      <ContentCard className="!py-0 !px-0 max-h-[700px] flex">
        <div className="flex-1 flex w-full space-x-8">
          <div className="w-60 py-6 border-r border-gray-200 ">
            <nav className="flex flex-col h-full">
              <ul className="flex-1  overflow-auto">
                {defaultSideList.map(({ value, route }, idx) => {
                  return (
                    <SideList
                      key={`${value}_${idx}`}
                      route={route}
                      value={value}
                      idx={idx}
                    />
                  )
                })}
                <SideList value="Steps" idx={999} />
                {stepForms.length > 0
                  ? stepForms.map(({ title, id }, idx) => {
                      return (
                        <SideList
                          key={`${title}_${idx}`}
                          route={`/upload/${idx + 1}`}
                          value={title}
                          stepId={id}
                          idx={idx}
                          onDelete={() => {
                            if (stepIdx && +stepIdx === idx + 1) {
                              navigate(`/upload/${idx}`)
                            } else if (stepIdx && +stepIdx > idx + 1) {
                              navigate(`/upload/${+stepIdx - 1}`)
                            }
                            dispatch(deleteStep({ id }))
                          }}
                        />
                      )
                    })
                  : defaultStepList.map(({ value, stepId, route }, idx) => {
                      return (
                        <SideList
                          key={`${value}_${idx}`}
                          route={route}
                          value={value}
                          stepId={stepId}
                          idx={idx}
                          onDelete={stepId => {
                            navigate(`/upload/${idx}`)
                            dispatch(deleteStep({ id: stepId }))
                          }}
                        />
                      )
                    })}
              </ul>
              <div className="flex pt-4">
                <Link
                  to={`/upload/${
                    stepForms.length > 0
                      ? stepForms.length + 1
                      : defaultStepList.length + 1
                  }`}
                  className="flex-1 btn-sm btn-secondary sider-item  "
                  onClick={() => {
                    dispatch(
                      addStep({
                        title: '',
                        methods: [{ timeStamp: '', content: '' }],
                        id: uuidv4(),
                      }),
                    )
                  }}
                >
                  Add a step
                </Link>
              </div>
            </nav>
          </div>
          <div className="flex-1 py-6 flex">
            <div className="pr-9 flex-1 overflow-auto">
              <Outlet />
            </div>
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
