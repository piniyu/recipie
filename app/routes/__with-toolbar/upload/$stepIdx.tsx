import { useNavigate, useParams } from '@remix-run/react'
import { v4 as uuidv4 } from 'uuid'
import StepForm from '~/pages/upload/step/step-form'
import { useAppDispatch, useAppSelector } from '~/store/configure-store'
import { addStep } from '~/store/upload-temp/step-form-slice'

export default function StepsPage(): JSX.Element {
  const { stepIdx } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const localStepForms = useAppSelector(state => state.stepForm)
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
