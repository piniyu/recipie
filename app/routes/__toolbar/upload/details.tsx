import { Difficulty } from '@prisma/client'
import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { ActionFunction, json, LoaderArgs } from '@remix-run/server-runtime'
import cuid from 'cuid'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import type {
  ClearIndicatorProps,
  ControlProps,
  DropdownIndicatorProps,
  InputProps,
  MenuListProps,
  MenuProps,
  MultiValueGenericProps,
  MultiValueRemoveProps,
  OptionProps,
} from 'react-select'
import { components } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { ErrorMessageComponent } from '~/components/error-message'
import FileUploadInput from '~/components/image-input-form/img-upload-input'
import { searchTags } from '~/utils/loaders/search-ingredients.server'
import { useAppDispatch, useAppSelector } from '~/store/configure-store'
import {
  DetailsFormState,
  updateDetails,
} from '~/store/upload-temp/details-form-slice'
import { updatePublish } from '~/store/upload-temp/publish-slice'
import { db } from '~/utils/db.server'
import DifficultyComponent, {
  getDifficulty,
} from '../../../components/difficulty'
import Textarea from '../../../components/textarea'

type SelectOpeionType = { value: string; label: string }[]

export type ImgFormProp = {
  name: string
  src: string | null
  type: string
}
export interface DetailsFormProps {
  title: string
  tags: SelectOpeionType | null
  difficulty: Difficulty
  thumbnail: ImgFormProp | null
}

const mockTags = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'dinner', label: 'Dinner' },
]

export const ControlComponent = ({ children, ...props }: ControlProps<any>) => {
  const { isFocused } = props
  return (
    <components.Control
      {...props}
      className={` py-0.5 dark:bg-dark-gray ${
        isFocused
          ? '!border-focus-outline !shadow-[0_0_0_1px_black] !shadow-focus-outline'
          : 'border-gray-200 dark:border-gray-500'
      }
      rounded-lg
      `}
    >
      {children}
    </components.Control>
  )
}

export const OptionComponent = ({ children, ...props }: OptionProps<any>) => {
  return (
    <components.Option
      {...props}
      className={` cursor-pointer rounded-lg ${
        props.isSelected
          ? 'bg-primary text-inherit dark:bg-primary-dark'
          : props.isFocused
          ? 'bg-gray-100 dark:bg-gray-700'
          : 'bg-transparent'
      }`}
    >
      {children}
    </components.Option>
  )
}

export const MenuComponent = ({ children, ...props }: MenuProps<any>) => {
  return (
    <components.Menu
      {...props}
      className={`${props.className} z-10 rounded-lg shadow-lg dark:border dark:border-gray-600 dark:bg-dark-gray`}
    >
      {children}
    </components.Menu>
  )
}

export const MenuListComponent = ({
  children,
  ...props
}: MenuListProps<any>) => {
  return (
    <components.MenuList {...props} className="p-2">
      {children}
    </components.MenuList>
  )
}

export const DropdownIndicatorComponent = ({
  children,
  ...props
}: DropdownIndicatorProps<any>) => {
  return (
    <components.DropdownIndicator
      {...{
        ...props,
        className: `${props.className} ${
          props.isFocused ? 'dark:text-gray-400' : ''
        }`,
      }}
    >
      {children}
    </components.DropdownIndicator>
  )
}

export const ClearIndicatorComponent = ({
  children,
  ...props
}: ClearIndicatorProps<any>) => {
  return (
    <components.ClearIndicator
      {...{
        ...props,
        className: `${props.className} ${
          props.isFocused ? 'dark:text-gray-400' : ''
        }`,
      }}
    >
      {children}
    </components.ClearIndicator>
  )
}

const MultiValueLabel = (props: MultiValueGenericProps<any>) => {
  const { innerProps } = props
  return (
    <components.MultiValueLabel
      {...props}
      innerProps={{
        ...innerProps,
        className: `${innerProps.className} dark:bg-gray-600 text-inherit`,
      }}
    />
  )
}

const MultiValueRemove = (props: MultiValueRemoveProps<any>) => {
  return (
    <components.MultiValueRemove
      {...props}
      innerProps={{
        ...props.innerProps,
        className: `${props.innerProps.className} dark:bg-gray-600 dark:hover:bg-red-600/80 dark:hover:text-red-200`,
      }}
    >
      {props.children}
    </components.MultiValueRemove>
  )
}

const MultiValueContainer = (props: MultiValueGenericProps<any>) => {
  return (
    <components.MultiValueContainer
      {...props}
      innerProps={{
        ...props.innerProps,
        className: `${props.innerProps.className} dark:bg-gray-600`,
      }}
    />
  )
}
export const InputComponent = (props: InputProps<any>) => {
  return (
    <components.Input {...props} className={`${props.className} text-inherit`}>
      {props.children}
    </components.Input>
  )
}

export const loader = async ({ request }: LoaderArgs) => {
  const searchRes = await searchTags(request)

  return json({ searchTags: searchRes })
}

export const action: ActionFunction = async ({ request }) => {
  const formdata = await request.formData()
  const tagId = formdata.get('id')
  const tagName = formdata.get('name')

  if (typeof tagId !== 'string' || typeof tagName !== 'string') {
    throw new Error('type of tagId or tagName is not string')
  }

  await db.tag.upsert({
    where: { name: tagName },
    create: { id: tagId, name: tagName },
    update: {},
  })

  return null
}

export default function Details(): JSX.Element {
  const data = useLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof loader>()
  const dispatch = useAppDispatch()
  const localDetails = useAppSelector(state => state.detailsForm)
  const localImgSrc = useAppSelector(state => state.detailsForm).thumbnail

  const [tagsOption, setTagsOption] = useState(
    data.searchTags.map(e => ({
      label: e.name[0].toUpperCase() + e.name.slice(1),
      value: e.id,
    })),
  )

  const methods = useForm<DetailsFormProps>({
    defaultValues: {
      ...localDetails,
      tags: localDetails.tags,
    },
    mode: 'onChange',
  })
  const {
    setValue,
    setError,
    clearErrors,
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

  useEffect(() => {
    if (fetcher.data?.searchTags) {
      setTagsOption(
        fetcher.data?.searchTags.map(e => ({
          label: e.name[0].toUpperCase() + e.name.slice(1),
          value: e.id,
        })),
      )
    }
  }, [fetcher.data?.searchTags])

  return (
    <div className="space-y-12 ">
      <h3 className="font-medium ">Details</h3>
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
            <label>
              <p className="label-required">Tags</p>
              <Controller
                name="tags"
                control={methods.control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    id={field.name}
                    menuShouldScrollIntoView
                    isMulti
                    value={field.value}
                    onChange={e => {
                      field.onChange(e)
                      if (e.length === 0) {
                        setError('tags', {
                          type: 'required',
                          message: 'Please pick one tag at least!',
                        })
                      } else {
                        clearErrors('tags')
                      }
                    }}
                    onInputChange={e => {
                      if (e.length > 0) {
                        _.debounce(
                          () => fetcher.load(`./?search-tags=${e}`),
                          300,
                          { trailing: true },
                        )
                      }
                    }}
                    onCreateOption={e => {
                      const newId = cuid()
                      const newValue = {
                        id: newId,
                        name: e,
                      }
                      const newFormValue = {
                        label: e[0].toUpperCase() + e.slice(1),
                        value: newId,
                      }
                      if (field.value === null) {
                        setValue('tags', [newFormValue])
                      } else {
                        setValue('tags', [...field.value, newFormValue])
                      }
                      fetcher.submit(newValue, { method: 'post' })
                    }}
                    options={tagsOption}
                    components={{
                      ClearIndicator: undefined,
                      IndicatorSeparator: undefined,
                      Control: ControlComponent,
                      Option: OptionComponent,
                      Menu: MenuComponent,
                      MenuList: MenuListComponent,
                      MultiValueLabel,
                      MultiValueRemove,
                      MultiValueContainer,
                      DropdownIndicator: DropdownIndicatorComponent,
                      Input: InputComponent,
                    }}
                  />
                )}
              />
              <ErrorMessageComponent errors={errors} name="tags" />
            </label>
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
      <Link to="../ingredients" className="btn-sm btn-primary w-fit">
        Next
      </Link>
    </div>
  )
}
