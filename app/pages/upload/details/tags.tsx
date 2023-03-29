import { useFetcher } from '@remix-run/react'
import cuid from 'cuid'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import { ErrorMessageComponent } from '~/components/ui/error-message'
import {
  ControlComponent,
  DropdownIndicatorComponent,
  InputComponent,
  MenuComponent,
  MenuListComponent,
  MultiValueContainer,
  MultiValueLabel,
  MultiValueRemove,
  OptionComponent,
} from '~/components/ui/react-select-custom'
import { loader } from '~/routes/loader/search-tag-options'
import { DetailsFormProps } from './details-form'

export const Tags = ({
  methods,
}: {
  methods: UseFormReturn<DetailsFormProps, any>
}) => {
  const {
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = methods
  const fetcher = useFetcher<typeof loader>()
  const [tagsOption, setTagsOption] = useState(
    fetcher.data?.searchTags.map(e => ({
      label: e.name[0].toUpperCase() + e.name.slice(1),
      value: e.id,
    })),
  )

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
    <label>
      <p className="label-required">Tags</p>
      <Controller
        name="tags"
        control={control}
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
                  () =>
                    fetcher.load(`/loader/search-tag-options?search-tags=${e}`),
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
  )
}
