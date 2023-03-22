import { useParams } from '@remix-run/react'
import _ from 'lodash'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '~/store/configure-store'
import { updatePublish } from '~/store/upload-temp/publish-slice'
import { StepFormState, updateStep } from '~/store/upload-temp/step-form-slice'
import { ErrorMessageComponent } from '../../../components/ui/error-message'
import MethodsFieldArray from './methods-field-array'
import Textarea from '../../../components/form/inputs/textarea'
import FileUploadInput from '~/components/form/image-input-form/img-upload-input'
import { ImageState } from '~/store/upload-temp/details-form-slice'
export interface StepFormProps {
  title: string
  photo: ImageState
  methods: { content: string }[]
}

const defaultValues: StepFormProps = {
  title: '',
  methods: [{ content: '' }],
  photo: { name: '', type: '', src: '' },
}

export default function StepForm(): JSX.Element {
  const { stepIdx } = useParams()
  const dispatch = useAppDispatch()
  const localStepForms = useAppSelector(state => state.stepForm)
  const localStepForm = stepIdx ? localStepForms[+stepIdx - 1] : undefined
  const localImgSrcs = useAppSelector(state => state.stepForm)
  const localImgSrc = stepIdx
    ? localImgSrcs[+stepIdx - 1].photo?.src
    : undefined

  const methods = useForm<StepFormProps>({
    defaultValues: localStepForm ? localStepForm : defaultValues,
    mode: 'onChange',
  })
  const {
    reset,
    watch,
    formState: { errors },
  } = methods

  useEffect(() => {
    const filteredMethods = (
      input: any[] | undefined,
    ): StepFormState['methods'] => {
      if (!input) return [{ content: '' }]
      const hasMethods = input?.some(e => e?.content && e?.content?.length > 0)

      if (!hasMethods) return input.slice(undefined, 1)

      return input.filter(e => !!e.content && e.content.length > 0)
    }
    const stepFullfilled = (
      input: Parameters<Parameters<typeof watch>[0]>[0],
    ): input is StepFormState => {
      return (
        !!input &&
        !!input.methods &&
        !!input.photo &&
        input.methods.some(e => !!e?.content) &&
        !!input.photo.src &&
        input.photo.src.length > 0
      )
    }
    const subscription = watch(
      _.debounce<Parameters<typeof watch>[0]>(
        value => {
          if (!localStepForm?.id) return

          dispatch(
            updateStep({
              id: localStepForm.id,
              title: value.title ?? '',
              methods: filteredMethods(value.methods),
              photo: {
                src: value.photo?.src ?? '',
                name: value.photo?.name ?? '',
                type: value.photo?.type ?? '',
              },
            }),
          )
          if (stepFullfilled(value)) {
            dispatch(updatePublish({ steps: true }))
          } else {
            dispatch(updatePublish({ steps: false }))
          }
        },
        300,
        { trailing: true },
      ),
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [errors, stepIdx])
  useEffect(() => {
    if (localStepForm) {
      reset(localStepForm)
    }
  }, [stepIdx])

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col space-y-12">
        <div className="w-2/5 justify-self-stretch">
          <label className="label-required">Photo</label>
          <FileUploadInput name="photo" text="Photo" src={localImgSrc} />
        </div>
        <label>
          <p className="label">Step Title</p>
          <Textarea
            name="title"
            maxLength={100}
            rows={2}
            registerOptions={{ required: 'Require title!' }}
          />
        </label>
        <div>
          <p className="label-required">Methods</p>
          <ErrorMessageComponent name="methods" errors={errors} />
          <MethodsFieldArray />
        </div>
      </form>
    </FormProvider>
  )
}
