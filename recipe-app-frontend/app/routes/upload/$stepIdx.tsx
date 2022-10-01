import { Link, useLocation, useNavigate, useParams } from '@remix-run/react'
import { useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import MethodsFieldArray from '~/components/methods-field-array'
import { SiderContext } from '~/components/sider/sider-context'
import Textarea from '~/components/textarea'

type StepFormProps = {
  title: string
  methods: { timeStemp: string | undefined; content: string }[]
}

const defaultValues: StepFormProps = {
  title: '',
  methods: [{ content: '', timeStemp: '' }],
}

export default function (): JSX.Element {
  const { setValue } = useContext(SiderContext)
  const [id, setId] = useState(0)
  const { stepIdx } = useParams()
  useEffect(() => {
    if (stepIdx) {
      setId(+stepIdx)
    }
  }, [stepIdx])
  const navigate = useNavigate()
  const location = useLocation()

  const methods = useForm<StepFormProps>({
    defaultValues,
  })
  const { handleSubmit, reset } = methods
  useEffect(() => {
    return () => {
      reset(defaultValues)
    }
  }, [location.pathname, reset])

  const onSubmit = (data: StepFormProps) => {
    setValue(prev => {
      const items = [...prev.items]
      const item = { ...items[2] }
      const children = [...item.children!]
      const child = { ...children[id - 1] }
      child.value = `${id}. ` + data.title
      children[id - 1] = { ...child }
      item.children = [...children]
      items[2] = { ...item }
      // console.log({ items: [...items, { ...item, children: [...children] }] })
      return {
        items,
      }
    })
    navigate(`../${id + 1}`)
  }
  // console.log('render')
  return (
    <div className="space-y-12">
      <h3 className="font-medium text-orange-600">Step {id}</h3>
      <FormProvider {...methods}>
        <form className="flex flex-col space-y-12">
          <label>
            <p className="label-required">Step Title</p>
            <Textarea name="title" maxLength={100} rows={2} />
          </label>
          <div>
            <p className="label-required">Methods</p>
            <MethodsFieldArray name="methods" />
          </div>
        </form>
      </FormProvider>
      <div className="flex gap-4">
        <Link
          to={`${id === 1 ? '../ingredients' : `../${id - 1}`}`}
          className="btn-sm btn-border"
        >
          Previous
        </Link>
        <button
          // to={`../${stepIdx && +stepIdx + 1}`}
          className="btn-sm btn-primary"
          onClick={() => handleSubmit(onSubmit)()}
          type="submit"
        >
          Add next step
        </button>
      </div>
    </div>
  )
}
