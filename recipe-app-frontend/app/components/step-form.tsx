import { useNavigate } from '@remix-run/react'
import { useCallback, useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import MethodsFieldArray from './methods-field-array'
import { SiderContext } from './sider/sider-context'
import Textarea from './textarea'
export interface StepFormProps {
  title: string
  methods: { timeStemp: string | undefined; content: string }[]
}

const defaultValues: StepFormProps = {
  title: '',
  methods: [{ content: '', timeStemp: '' }],
}

const mockData: StepFormProps[] = [
  {
    title: 'test1',
    methods: [{ content: 'asdfasdf', timeStemp: '' }],
  },
  {
    title: 'test2',
    methods: [{ content: '13213213', timeStemp: '' }],
  },
  {
    title: 'test3',
    methods: [{ content: 'good', timeStemp: '' }],
  },
]

export default function StepForm(): JSX.Element {
  return (
    <form
      // id={`step_${id}_form`}
      className="flex flex-col space-y-12"
      // onSubmit={methods.handleSubmit(onSubmit)}
    >
      <label>
        <p className="label-required">Step Title</p>
        <Textarea name="title" maxLength={100} rows={2} />
      </label>
      <div>
        <p className="label-required">Methods</p>
        <MethodsFieldArray name="methods" />
      </div>
    </form>
  )
}
