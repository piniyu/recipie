import type { ErrorBoundaryComponent } from '@remix-run/node'
import { Link, Outlet, useNavigate, useParams } from '@remix-run/react'
import { useContext, useEffect } from 'react'
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

export default function Upload(): JSX.Element {
  const { state, dispatch } = useContext(SiderContext)
  const { stepIdx } = useParams()
  useEffect(() => {
    const localValue = getLocalValue(localStorageKey.MOCK_STEP_FORM)
    // if (localValue[0].title !== '') {
    const setSider = () =>
      dispatch({
        type: SiderActionKind.SET_NEW_SIDER,
        payload: [
          { value: 'Details', route: 'upload/details' },
          { value: 'Ingredients', route: 'upload/ingredients' },
          {
            value: 'Steps',
            children: [
              ...localValue.map((item, idx) => {
                return {
                  value: `${idx + 1}. ${item.title}`,
                  route: `upload/${idx + 1}`,
                }
              }),
              {
                value: 'Add a step',
                route: `upload/${localValue.length + 1}`,
              },
            ],
          },
        ],
      })
    if (localValue.every(v => v !== null)) {
      setSider()
    } else {
      localValue.map(v => {
        if (v === null) {
          return { title: '', methods: [{ timeStemp: '', content: '' }] }
        }
        return v
      })
      setSider()
    }
    return () => {
      dispatch({
        type: SiderActionKind.SET_NEW_SIDER,
        payload: defaultSiderValue,
      })
    }
  }, [dispatch])

  useEffect(() => {
    const local = getLocalValue(localStorageKey.MOCK_STEP_FORM)
    if (stepIdx && +stepIdx > local.length) {
      throw new Error()
    }
  }, [stepIdx])

  return (
    <div>
      <header className="flex items-center justify-between layout-px pt-14 pb-4 border-b border-gray-200 text-black ">
        <h3 className="font-semibold">Upload Recipe</h3>
        <div className="flex gap-2">
          <button className="btn-border btn-sm">Save</button>
          <button className="btn-primary btn-sm">Public</button>
        </div>
      </header>
      <div className="layout-px pt-6">
        <Outlet />
      </div>
    </div>
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
