import { Difficulty } from '@prisma/client'
import _ from 'lodash'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Textarea from '~/components/form/inputs/textarea'
import { SelectOpeionType } from '~/components/ui/react-select-custom'
import { ImgFormProp } from '~/routes/__with-toolbar/upload/details'
import { useAppDispatch, useAppSelector } from '~/store/configure-store'
import {
  DetailsFormState,
  updateDetails,
} from '~/store/upload-temp/details-form-slice'
import { updatePublish } from '~/store/upload-temp/publish-slice'
import { Tags } from './tags'
import DifficultyComponent, {
  getDifficulty,
} from '../../../components/form/difficulty'
import FileUploadInput from '~/components/form/image-input-form/img-upload-input'

export interface DetailsFormProps {
  title: string
  tags: SelectOpeionType[] | null
  difficulty: Difficulty
  thumbnail: ImgFormProp | null
}

export const DetailsForm = () => {
  const dispatch = useAppDispatch()
  const localDetails = useAppSelector(state => state.detailsForm)
  const localImgSrc = useAppSelector(state => state.detailsForm).thumbnail
  const methods = useForm<DetailsFormProps>({
    defaultValues: {
      ...localDetails,
      tags: localDetails.tags,
    },
    mode: 'onChange',
  })

  const {
    setValue,
    watch,
    formState: { errors },
  } = methods

  useEffect(() => {
    const subscription = watch(
      _.debounce<Parameters<typeof watch>[0]>(v => {
        dispatch(
          updateDetails({
            title: v.title ?? '',
            tags: !!v.tags
              ? v.tags.map(e => {
                  if (!!e && !!e.label && !!e.value) {
                    return e as NonNullable<DetailsFormState['tags']>[0]
                  }
                  return { label: '', value: '' } as NonNullable<
                    DetailsFormState['tags']
                  >[0]
                })
              : null,
            thumbnail: {
              name: v.thumbnail?.name ?? '',
              type: v.thumbnail?.type ?? '',
              src: v.thumbnail?.src ?? '',
            },
          }),
        )

        if (
          Object.keys(errors).length === 0 &&
          v.difficulty &&
          v.tags &&
          v.tags.length > 0 &&
          v.thumbnail &&
          v.thumbnail.src &&
          v.thumbnail.src.length > 0 &&
          v.title
        ) {
          dispatch(updatePublish({ details: true }))
        } else {
          dispatch(updatePublish({ details: false }))
        }
      }),
    )
    return () => {
      subscription.unsubscribe()
    }
  }, [errors])

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-6  md:flex-row">
        <div className="flex flex-1 flex-col space-y-12">
          <label>
            <p className="label-required">Tilte</p>
            <Textarea
              name="title"
              maxLength={100}
              rows={2}
              registerOptions={{ required: 'Require title!' }}
            />
          </label>
          <Tags methods={methods} />
          <label>
            <p className="label-required">Difficulty</p>
            <div className="flex items-center">
              <DifficultyComponent
                isInput
                difficulty={localDetails.difficulty}
                onChange={value => {
                  setValue('difficulty', getDifficulty(value) as Difficulty)
                }}
              />
            </div>
          </label>
        </div>
        <div className="w-full justify-self-stretch md:w-2/5">
          <label className="label-required">Thumbnail</label>
          <FileUploadInput
            name="thumbnail"
            text="Thumbnail"
            src={localImgSrc?.src}
          />
        </div>
      </form>
    </FormProvider>
  )
}
