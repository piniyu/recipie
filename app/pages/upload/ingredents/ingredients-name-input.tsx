import { useFetcher } from '@remix-run/react'
import cuid from 'cuid'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'
import { components, SingleValueProps } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { ErrorMessageComponent } from '~/components/ui/error-message'
import {
  ClearIndicatorComponent,
  ControlComponent,
  DropdownIndicatorComponent,
  InputComponent,
  MenuComponent,
  MenuListComponent,
  OptionComponent,
} from '~/components/ui/react-select-custom'
import { loader } from '~/routes/loader/search-ingredients'
import { IngredientsFormProps } from './ingredients-form'

enum Volume {
  mL = 'mL',
  L = 'L',
  tsp = 'tsp',
  oz = 'oz',
  cup = 'cup',
  qt = 'qt',
  pt = 'pt',
  gal = 'gal',
}

enum Weight {
  mg = 'mg',
  g = 'g',
  kg = 'kg',
  lb = 'lb',
  oz = 'oz',
}
enum Length {
  mm = 'mm',
  cm = 'cm',
  m = 'm',
  inch = 'inch',
  yard = 'yard',
}
enum Temperature {
  celsius = '°C',
  farenheit = '°F',
}

const SingleValueComponent = ({
  children,
  ...props
}: SingleValueProps<any>) => {
  return (
    <components.SingleValue
      {...props}
      className={`${props.className} text-inherit`}
    >
      {children}
    </components.SingleValue>
  )
}

export const IngredientsListInputs = ({
  methods,
}: {
  methods: UseFormReturn<IngredientsFormProps, any>
}) => {
  const fetcher = useFetcher<typeof loader>()
  const [ingOptions, setIngOptions] = useState(
    fetcher.data?.searchRes.map(e => ({
      value: e.id,
      label: e.name[0].toUpperCase() + e.name.substring(1),
    })),
  )
  const {
    control,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    watch,
    register,
  } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  })
  const watchFieldArray = watch('ingredients')
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    }
  })
  useEffect(() => {
    if (fetcher.data?.searchRes) {
      setIngOptions(
        fetcher.data?.searchRes.map(e => ({
          label: e.name[0].toUpperCase() + e.name.slice(1),
          value: e.id,
        })),
      )
    }
  }, [fetcher.data?.searchRes])
  return (
    <div>
      <p className="label-required">Ingredients list</p>
      <ErrorMessageComponent name="ingredients" errors={errors} />
      <ul className="space-y-4">
        {controlledFields.map((field, idx) => {
          return (
            <div key={field.id} className="flex flex-wrap gap-4 ">
              <label className="w-full ">
                <Controller
                  name={`ingredients.${idx}.name` as const}
                  control={control}
                  render={({ field: controllerField }) => (
                    <CreatableSelect
                      {...controllerField}
                      id={`ingredients_${controllerField.name}`}
                      menuShouldScrollIntoView
                      isMulti={false}
                      isClearable
                      placeholder="Ingredient name"
                      onCreateOption={e => {
                        const newValue = {
                          label: e[0].toUpperCase() + e.substring(1),
                          value: cuid(),
                        }
                        setValue(`ingredients.${idx}.name`, newValue)
                        setIngOptions(prev => {
                          if (prev) {
                            return [...prev, newValue]
                          }
                        })
                        fetcher.submit(newValue, { method: 'post' })
                      }}
                      onInputChange={e => {
                        if (e.length > 0) {
                          _.debounce(
                            () => {
                              fetcher.load(
                                `/loader/search-ingredients?search-ingredient=${e}`,
                              )
                            },
                            300,
                            { trailing: true },
                          )()
                        }
                      }}
                      onChange={e => {
                        controllerField.onChange(e)
                        clearErrors('ingredients')
                      }}
                      onBlur={() => {
                        if (
                          watchFieldArray.every(
                            e =>
                              !e.name ||
                              e.name?.value.length === 0 ||
                              e.name?.value === null,
                          )
                        ) {
                          setError('ingredients', {
                            type: 'required',
                            message: 'Please add an ingredient at least!',
                          })
                        }
                      }}
                      options={ingOptions}
                      components={{
                        ClearIndicator: ClearIndicatorComponent,
                        Control: ControlComponent,
                        Option: OptionComponent,
                        Menu: MenuComponent,
                        MenuList: MenuListComponent,
                        SingleValue: SingleValueComponent,
                        DropdownIndicator: DropdownIndicatorComponent,
                        Input: InputComponent,
                      }}
                    />
                  )}
                />
              </label>
              <input
                {...register(`ingredients.${idx}.qty` as const, {
                  required: true,
                })}
                type="number"
                name={`ingredients.${idx}.qty`}
                className="input w-20"
                placeholder="QTY"
              />
              <label className="w-40 ">
                <Controller
                  name={`ingredients.${idx}.unit` as const}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: controllerField }) => (
                    <Select
                      {...controllerField}
                      id={`ingredients_${idx}_${field.id}`}
                      placeholder="Unit"
                      isSearchable
                      options={[
                        { label: 'No unit', value: '' },
                        {
                          label: 'Volume',
                          options: Object.values(Volume).map(e => ({
                            label: e,
                            value: e,
                          })),
                        },
                        {
                          label: 'Weight',
                          options: Object.values(Weight).map(e => ({
                            label: e,
                            value: e,
                          })),
                        },
                        {
                          label: 'Length',
                          options: Object.values(Length).map(e => ({
                            label: e,
                            value: e,
                          })),
                        },
                        {
                          label: 'Temperature',
                          options: Object.values(Temperature).map(e => ({
                            label: e,
                            value: e,
                          })),
                        },
                      ]}
                      components={{
                        ClearIndicator: undefined,
                        IndicatorSeparator: undefined,
                        Control: ControlComponent,
                        Option: OptionComponent,
                        Menu: MenuComponent,
                        MenuList: MenuListComponent,
                        SingleValue: SingleValueComponent,
                        DropdownIndicator: DropdownIndicatorComponent,
                        Input: InputComponent,
                      }}
                    />
                  )}
                />
              </label>

              <button
                className={` btn-sm btn-ghost ${
                  fields.length === 1
                    ? 'text-red-600 disabled:text-gray-400'
                    : ''
                }`}
                type="button"
                onClick={() => {
                  remove(idx)
                }}
                disabled={fields.length === 1}
              >
                Delet
              </button>
            </div>
          )
        })}
        <button
          className="btn-sm btn-border"
          type="button"
          onClick={() => {
            append({ name: null, qty: 0, unit: null })
          }}
        >
          Add a ingredient
        </button>
      </ul>
    </div>
  )
}
