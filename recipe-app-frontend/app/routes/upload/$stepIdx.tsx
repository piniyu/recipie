import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  getLocalValue,
  localStorageKey,
  setLocalValue,
} from '~/components/localstorage-form/methods'
import { SiderActionKind, SiderContext } from '~/components/sider/sider-context'
import type { StepFormProps } from '~/components/step-form'
import StepForm from '~/components/step-form'

const defaultValues: StepFormProps = {
  title: '',
  methods: [{ content: '', timeStemp: '' }],
}

export default function (): JSX.Element {
  const { stepIdx } = useParams()
  const { state, dispatch } = useContext(SiderContext)
  const [id, setId] = useState(stepIdx ? +stepIdx : 1)
  const [localFormValue, setLocalFormValue] = useState<StepFormProps[]>()
  const navigate = useNavigate()
  const location = useLocation()
  const methods = useForm<StepFormProps>({
    defaultValues: localFormValue ? localFormValue[id - 1] : defaultValues,
    shouldUnregister: true,
  })
  const { handleSubmit, reset, getValues } = methods
  const onSubmit = useCallback(
    (data: StepFormProps) => {
      dispatch({
        type: SiderActionKind.UPDATE_CHILD,
        payload: { value: `${id}. ${data.title}` },
        index: 2,
        childIndex: id - 1,
      })

      setLocalValue(localStorageKey.MOCK_STEP_FORM, data, id - 1)
    },
    [id, dispatch],
  )

  useEffect(() => {
    if (stepIdx) {
      setId(+stepIdx)
    }
  }, [stepIdx])

  useEffect(() => {
    const localValue = getLocalValue(localStorageKey.MOCK_STEP_FORM)
    reset(localValue[id - 1])
  }, [reset, id])

  useEffect(() => {
    return () => {
      if (getValues && getValues().title !== '') onSubmit(getValues())
    }
  }, [id, getValues, onSubmit])

  return (
    <div className="space-y-12">
      <h3 className="font-medium text-orange-600">Step {id}</h3>
      <FormProvider {...methods}>
        <StepForm />
      </FormProvider>
      <div className="flex gap-4">
        {id !== 1 && (
          <button
            className="btn-sm btn-border"
            onClick={() => {
              handleSubmit(onSubmit)()
              navigate(`../${id - 1}`)
            }}
            type="submit"
          >
            Previous
          </button>
        )}
        {state[2] &&
        state[2].children &&
        state[2].children.length - 1 === id ? (
          <button
            className="btn-sm btn-primary"
            onClick={() => {
              handleSubmit(onSubmit)()
              setLocalValue(
                localStorageKey.MOCK_STEP_FORM,
                { title: '', methods: [{ timeStemp: '', content: '' }] },
                id,
              )
              dispatch({
                type: SiderActionKind.ADD_CHILD,
                index: 2,
                payload: { value: `${id + 1}. `, route: `upload/${id + 1}` },
              })
              navigate(`../${id + 1}`)
            }}
            type="submit"
          >
            Add next step
          </button>
        ) : (
          <button
            className="btn-sm btn-primary"
            onClick={() => {
              handleSubmit(onSubmit)()
              navigate(`../${id + 1}`)
            }}
            type="submit"
          >
            Next step
          </button>
        )}
      </div>
    </div>
  )
}
