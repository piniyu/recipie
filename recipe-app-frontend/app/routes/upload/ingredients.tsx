// import { useFieldArray, useForm } from 'react-hook-form'

import { Link } from '@remix-run/react'
import { useFieldArray, useForm } from 'react-hook-form'

type IngredientsFormProps = {
  serving: number
  ingredients: [{ name: string; qty: string }]
}

export default (): JSX.Element => {
  const { register, control } = useForm<IngredientsFormProps>({
    defaultValues: { serving: 1, ingredients: [{ name: '', qty: '' }] },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  })
  return (
    <div className="space-y-12">
      <h3 className="font-medium text-black">Ingredients</h3>
      <form className="flex flex-col space-y-12">
        <label>
          <p className="label-required">Default serving</p>
          <input
            {...register('serving')}
            type="number"
            placeholder="1"
            className="input w-12 text-right"
            min={1}
          />
          <span className="ml-2">serving</span>
        </label>
        <label>
          <p className="label-required">Ingredients list</p>
          <ul className="space-y-4">
            {fields.map((field, idx) => {
              return (
                <div key={field.id} className="flex gap-4">
                  <input
                    {...field}
                    name={`ingredients.${idx}.name`}
                    className="input flex-1"
                    placeholder="Name"
                  />
                  <input
                    {...field}
                    name={`ingredients.${idx}.qty`}
                    className="input w-20"
                    placeholder="QTY"
                  />
                  <button
                    className="btn-sm btn-ghost"
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
                append({ name: '', qty: '' })
              }}
            >
              Add a ingredient
            </button>
          </ul>
        </label>
      </form>
      <div className="flex gap-4">
        <Link to="../" className="btn-sm btn-border">
          Previous
        </Link>
        <Link to="../1" className="btn-sm btn-primary">
          Next
        </Link>
      </div>
    </div>
  )
}
