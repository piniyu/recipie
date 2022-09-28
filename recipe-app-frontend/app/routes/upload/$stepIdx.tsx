import { Link, useParams } from '@remix-run/react'
import { FormProvider, useForm } from 'react-hook-form'
import MethodsFieldArray from '~/components/methods-field-array'
import Textarea from '~/components/textarea'

type StepFormProps = {
  title: string
  methods: { timeStemp: string | undefined; content: string }[]
}

export default function (): JSX.Element {
  const { stepIdx } = useParams()
  const methods = useForm<StepFormProps>({
    defaultValues: {
      title: '',
      methods: [{ content: '', timeStemp: '' }],
    },
    mode: 'onChange',
  })

  return (
    <div className="space-y-12">
      <h3 className="font-medium text-orange-600">Step {stepIdx}</h3>
      <FormProvider {...methods}>
        <form className="flex flex-col space-y-12">
          <label>
            <p className="label-required">Step Title</p>
            <Textarea
              name="title"
              placeholder="Method"
              maxLength={100}
              rows={2}
            />
          </label>
          <div>
            <p className="label-required">Methods</p>
            <MethodsFieldArray name="methods" />
          </div>
        </form>
      </FormProvider>
      <div className="flex gap-4">
        <Link
          to={`${
            stepIdx &&
            (+stepIdx === 1 ? '../ingredients' : `../${+stepIdx - 1}`)
          }`}
          className="btn-sm btn-border"
        >
          Previous
        </Link>
        <Link
          to={`../${stepIdx && +stepIdx + 1}`}
          className="btn-sm btn-primary"
        >
          Add next step
        </Link>
      </div>
    </div>
  )
}
