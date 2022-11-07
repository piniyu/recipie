import { Link } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import {
  components,
  ControlProps,
  CSSObjectWithLabel,
  GroupBase,
  MenuListProps,
  MenuProps,
  OptionProps,
} from 'react-select'
import CreatableSelect from 'react-select/creatable'
import FileUploadInput from '~/components/image-input-form/img-upload-input'
import {
  getLocalValue,
  localStorageKey,
  setLocalValue,
} from '~/components/localstorage-form/methods'
import Difficulty from '../../components/difficulty'
import Textarea from '../../components/textarea'

type SelectOpeionType = { value: string; label: string }[]

export type ImgFormProp = {
  name: string
  src: string
  type: string
  size: string
}
export interface DetailsFormProps {
  title: string
  tags: SelectOpeionType
  difficulty: number
  thumbnail: ImgFormProp
}

const mockTags = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'dinner', label: 'Dinner' },
]

const defaultFormValues: DetailsFormProps = {
  title: '',
  tags: mockTags,
  difficulty: 1,
  thumbnail: { name: '', src: '', type: '', size: '' },
}

const ControlComponent = ({
  children,
  ...props
}: ControlProps<
  { value: string; label: string },
  true,
  GroupBase<{ value: string; label: string }>
>) => {
  const { isFocused } = props
  return (
    <components.Control
      {...props}
      className={` py-0.5 ${
        isFocused
          ? '!shadow-[0_0_0_1px_black] !shadow-focus-outline !border-focus-outline '
          : 'border-gray-200'
      }
      rounded-lg
      `}
    >
      {children}
    </components.Control>
  )
}

const OptionComponent = ({
  children,
  ...props
}: OptionProps<{ value: string; label: string }, true>) => {
  return (
    <components.Option
      {...props}
      className={` rounded-lg cursor-pointer ${
        props.isFocused ? 'text-orange-600 bg-orange-600/10' : ''
      } `}
    >
      {children}
    </components.Option>
  )
}

const MenuComponent = ({
  children,
  ...props
}: MenuProps<{ value: string; label: string }, true>) => {
  return (
    <components.Menu {...props} className="shadow-lg rounded-lg">
      {children}
    </components.Menu>
  )
}

const MenuListComponent = ({
  children,
  ...props
}: MenuListProps<{ value: string; label: string }, true>) => {
  return (
    <components.MenuList {...props} className="p-2">
      {children}
    </components.MenuList>
  )
}

export default function Details(): JSX.Element {
  const [formValue, setFormValue] = useState<DetailsFormProps>()
  const methods = useForm<DetailsFormProps>({
    defaultValues: defaultFormValues,
  })

  useEffect(() => {
    const onBeforeunload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      setLocalValue(localStorageKey.MOCK_DETAILS_FORM, methods.getValues())
    }
    if (window) {
      window.addEventListener('beforeunload', onBeforeunload)
    }
    return () => {
      window.removeEventListener('beforeunload', onBeforeunload)
    }
  }, [methods])

  useEffect(() => {
    methods.reset(getLocalValue(localStorageKey.MOCK_DETAILS_FORM))
    return () => {
      setLocalValue(localStorageKey.MOCK_DETAILS_FORM, methods.getValues())
      // console.log('ditail unmount')
    }
  }, [methods])

  return (
    <div className="space-y-12 ">
      <h3 className="font-medium text-black">Recipe details</h3>
      <FormProvider {...methods}>
        <form className="flex gap-6">
          <div className="flex-1 flex flex-col space-y-12">
            <label>
              <p className="label-required">Tilte</p>
              <Textarea name="title" maxLength={100} rows={2} />
            </label>
            <label>
              <p className="label-required">Tags</p>
              <Controller
                name="tags"
                control={methods.control}
                render={({ field: { name, value } }) => (
                  <CreatableSelect
                    id={name}
                    isClearable
                    isMulti
                    options={mockTags}
                    className=""
                    components={{
                      ClearIndicator: undefined,
                      Control: ControlComponent,
                      Option: OptionComponent,
                      Menu: MenuComponent,
                      MenuList: MenuListComponent,
                    }}
                  />
                )}
              />
            </label>
            <label>
              <p className="label-required">Difficulty</p>
              <div className="flex items-center">
                <Difficulty stars={1} isInput />
              </div>
            </label>
          </div>
          <div className="w-2/5 justify-self-stretch">
            <label className="label-required">Thumbnail</label>
            <FileUploadInput name="thumbnail" text="Thumbnail" />
          </div>
        </form>
      </FormProvider>
      <Link to="../ingredients" className="btn-sm btn-primary w-fit">
        Next
      </Link>
    </div>
  )
}
