import { useNavigate, useParams } from '@remix-run/react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import type { StepFormProps } from '~/components/step-form'
import StepForm from '~/components/step-form'
import { useAppDispatch, useAppSelector } from '~/store/configure-store'
import { addStep, updateStep } from '~/store/upload-temp/step-form-slice'

const defaultValues: StepFormProps = {
  title: '',
  methods: [{ content: '', timeStamp: '' }],
}
export default function StepsPage(): JSX.Element {
  const { stepIdx } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const localStepForms = useAppSelector(state => state.stepForm)
  const localStepForm = stepIdx ? localStepForms[+stepIdx - 1] : undefined

  const methods = useForm<StepFormProps>({
    defaultValues: localStepForm ? localStepForm : defaultValues,
    shouldUnregister: true,
  })
  const { handleSubmit, reset, getValues } = methods

  useEffect(() => {
    // if (!localStepForm && stepIdx) {
    //   dispatch(
    //     addStep({
    //       title: '',
    //       id: uuidv4(),
    //       methods: [{ timeStamp: '', content: '' }],
    //     }),
    //   )
    // }
    if (localStepForm) {
      reset(localStepForm)
    }
  }, [dispatch, localStepForm, reset, stepIdx])

  useEffect(() => {
    return () => {
      const formValue = getValues()
      if (formValue && localStepForm) {
        dispatch(
          updateStep({
            title: formValue.title,
            methods: formValue.methods,
            id: localStepForm.id,
          }),
        )
      }
    }
  }, [dispatch, getValues, localStepForm, stepIdx])

  const onSubmit = (v: StepFormProps) => {
    if (localStepForm) {
      dispatch(
        updateStep({
          title: v.title,
          methods: v.methods,
          id: localStepForm.id,
        }),
      )
    }
  }
  const onSubmitAdd = (v: StepFormProps) => {
    if (stepIdx && !localStepForms[+stepIdx]) {
      dispatch(
        addStep({
          title: '',
          methods: [{ timeStamp: '', content: '' }],
          id: uuidv4(),
        }),
      )
    }
  }

  return (
    <div className="space-y-12">
      <h3 className="font-medium text-primary-600">Step {stepIdx}</h3>
      <FormProvider {...methods}>
        <StepForm />
      </FormProvider>
      <div className="flex gap-4">
        {stepIdx && stepIdx !== '1' ? (
          <button
            className="btn-sm btn-gray"
            onClick={() => {
              handleSubmit(onSubmit)()
              navigate(`../${+stepIdx - 1}`)
            }}
            type="submit"
          >
            Previous
          </button>
        ) : null}

        {stepIdx ? (
          <button
            className="btn-sm btn-primary"
            onClick={() => {
              handleSubmit(onSubmitAdd)()
              navigate(`../${+stepIdx + 1}`)
            }}
            type="submit"
          >
            Next step
          </button>
        ) : null}
      </div>
    </div>
  )
}
