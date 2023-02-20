// import { useFieldArray, useForm } from 'react-hook-form'

import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { ActionFunction, json, LoaderArgs } from '@remix-run/server-runtime'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { SingleValueProps, components } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { searchIngredients } from '~/lib/loaders/search-ingredients.server'
import { useAppDispatch, useAppSelector } from '~/store/configure-store'
import {
  IngredientsProps,
  updateIngredients,
} from '~/store/upload-temp/ingredients-form-slice'
import {
  ClearIndicatorComponent,
  ControlComponent,
  DropdownIndicatorComponent,
  InputComponent,
  MenuComponent,
  MenuListComponent,
  OptionComponent,
} from './details'
import cuid from 'cuid'
import { db } from '~/utils/db.server'
import { badRequest } from '~/utils/request.server'
import { validate } from 'uuid'
import { ErrorMessageComponent } from '~/components/error-message'
import { updatePublish } from '~/store/upload-temp/publish-slice'

type SelectOpeionType = { value: string; label: string }

type IngredientInputProps = {
  name: SelectOpeionType | null
  qty: number
  unit: SelectOpeionType | null
}

type IngredientsFormProps = {
  serving: number
  ingredients: IngredientInputProps[]
}

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

export const loader = async ({ request }: LoaderArgs) => {
  const searchRes = await searchIngredients(request)

  return json({ searchRes })
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData()
  const name = data.get('label')
  const ingredientId = data.get('value')

  if (
    !name ||
    !ingredientId ||
    typeof name !== 'string' ||
    typeof ingredientId !== 'string'
  )
    return badRequest({ message: 'lack of ingredientId or Name' })

  await db.ingredient.upsert({
    where: {
      name,
    },
    update: {},
    create: { id: ingredientId, name },
  })
  return null
}

export default function IngredientsPage(): JSX.Element {
  const data = useLoaderData<typeof loader>()
  const fetcher = useFetcher()

  const [ingOptions, setIngOptions] = useState(
    data.searchRes.map(e => ({
      value: e.id,
      label: e.name[0].toUpperCase() + e.name.substring(1),
    })),
  )

  const local = useAppSelector(state => state.ingredientsForm)
  const dispatch = useAppDispatch()

  const {
    register,
    getValues,
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IngredientsFormProps>({
    defaultValues: {
      serving: local.servings,
      ingredients: local.ingredients ?? [{ name: null, qty: 0, unit: null }],
    },
    mode: 'onChange',
  })
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
    const filteredIngredients = (
      input: any[] | undefined,
    ): IngredientsProps['ingredients'] | undefined => {
      if (!input) return undefined
      const hasIngredient = input.some(e => e?.name)
      if (hasIngredient) {
        return input.filter((e, i) => e.name !== null)
      }
      return input.slice(undefined, 1)
    }

    const ingredietnFullfill = (
      input: any,
    ): input is {
      [P in keyof IngredientInputProps]: NonNullable<IngredientInputProps[P]>
    }[] => {
      const ingredients = input as IngredientInputProps[]
      return ingredients.every(
        e =>
          (e.name !== null && e.qty > 0 && e.unit !== null) || e.name === null,
      )
    }

    const subscription = watch(
      _.debounce<Parameters<typeof watch>[0]>(
        value => {
          dispatch(
            updateIngredients({
              servings: value.serving ?? 1,
              ingredients: filteredIngredients(value.ingredients),
            }),
          )
          if (
            value.ingredients &&
            value.serving &&
            value.serving > 0 &&
            ingredietnFullfill(value.ingredients)
          ) {
            dispatch(updatePublish({ ingredients: true }))
          } else {
            dispatch(updatePublish({ ingredients: false }))
          }
        },
        300,
        { trailing: true },
      ),
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="space-y-12">
      <h3 className="font-medium text-inherit">Ingredients</h3>
      <form className="flex flex-col space-y-12">
        <label>
          <p className="label-required">Default serving</p>
          <input
            type="number"
            {...register('serving', {
              valueAsNumber: true,
              min: { value: 1, message: "servings can't be 0" },
              required: true,
            })}
            placeholder="1"
            className="input w-12 text-right"
            min={1}
          />
          <span className="ml-2">servings</span>
          <ErrorMessageComponent name="serving" errors={errors} />
        </label>
        <div>
          <p className="label-required">Ingredients list</p>
          <ErrorMessageComponent name="ingredients" errors={errors} />
          <ul className="space-y-4">
            {controlledFields.map((field, idx) => {
              return (
                <div key={field.id} className="flex gap-4">
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
                            setIngOptions(prev => [...prev, newValue])
                            fetcher.submit(newValue, { method: 'post' })
                          }}
                          onInputChange={e => {
                            if (e.length > 0) {
                              _.debounce(
                                () => fetcher.load(`./?search-ingredient=${e}`),
                                300,
                                { trailing: true },
                              )
                            }
                          }}
                          onChange={e => {
                            controllerField.onChange(e)
                            clearErrors('ingredients')
                          }}
                          onBlur={() => {
                            if (
                              // (!controllerField.value ||
                              //   controllerField.value.value.length === 0 ||
                              //   controllerField.value.value === null) &&
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
                          // value={{ label: field.unit, value: field.unit }}
                          placeholder="Unit"
                          isSearchable
                          options={[
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
                  {/* <input
                    {...register(`ingredients.${idx}.unit` as const)}
                    type="text"
                    name={`ingredients.${idx}.qty`}
                    className="input w-20"
                    placeholder="Unit"
                    onKeyDown={e => {
                      if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(+e.key)) {
                        e.preventDefault()
                      }
                    }}
                  /> */}
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
      </form>
      <div className="flex gap-4">
        <Link to="./details" className="btn-sm btn-gray">
          Previous
        </Link>
        <Link to="../1" className="btn-sm btn-primary">
          Next
        </Link>
      </div>
    </div>
  )
}
