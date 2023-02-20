import { useNavigate, useParams } from '@remix-run/react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import type { StepFormProps } from '~/components/step-form'
import StepForm from '~/components/step-form'
import { useAppDispatch, useAppSelector } from '~/store/configure-store'
import { addStep, updateStep } from '~/store/upload-temp/step-form-slice'

// const defaultValues: StepFormProps = {
//   title: '',
//   methods: [{ content: '' }],
// }
export default function StepsPage(): JSX.Element {
  const { stepIdx } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const localStepForms = useAppSelector(state => state.stepForm)
  // const localStepForm = stepIdx ? localStepForms[+stepIdx - 1] : undefined
  const onAdd = () => {
    if (stepIdx && !localStepForms[+stepIdx]) {
      dispatch(
        addStep({
          title: '',
          methods: [{ content: '' }],
          id: uuidv4(),
          photo: { name: '', src: '', type: '' },
        }),
      )
    }
  }

  return (
    <div className="space-y-12">
      <h3 className="text-primary-600 font-medium">Step {stepIdx}</h3>
      <StepForm />
      <div className="flex gap-4">
        {stepIdx && stepIdx !== '1' ? (
          <button
            className="btn-sm btn-gray"
            onClick={() => {
              // handleSubmit(onSubmit)()
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
              onAdd()
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
