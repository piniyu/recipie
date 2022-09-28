import {
  Controller,
  FieldValues,
  useFieldArray,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form'
import Textarea from './textarea'

const TimeInput = ({
  name,
  ...methods
}: { name: string } & UseFormReturn<FieldValues, any>): JSX.Element => {
  const { control, setValue } = methods
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type="text"
          className="input w-20 text-right"
          placeholder="0:00"
          onKeyDown={e => {
            if (
              field.value.length === 4 &&
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(e.key))
            ) {
              e.preventDefault()
            }
          }}
          onFocus={e => {
            setValue(field.name, e.target.value.replace(':', ''))
          }}
          onBlur={e => {
            const arr = e.target.value.split('')
            while (arr.length < 4) {
              arr.unshift('0')
            }
            const length = arr.length
            arr.splice(length - 2, 0, ':')
            setValue(field.name, arr.join(''))
          }}
        />
      )}
    />
  )
}

export default ({ name }: { name: string }): JSX.Element => {
  const methods = useFormContext()
  const { register, control, setValue } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })
  return (
    <ul className="space-y-4">
      {fields.map((field, idx) => {
        return (
          <div key={field.id}>
            <div className="flex gap-4">
              <TimeInput {...methods} name={`${name}.${idx}.timeStemp`} />
              <Textarea {...methods} name={`${name}.${idx}.content`} rows={1} />
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  remove(idx)
                }}
                disabled={fields.length === 1}
              >
                Delet
              </button>
            </div>
          </div>
        )
      })}
      <button
        className="btn-sm btn-border"
        type="button"
        onClick={() => {
          append({ content: '', timeStemp: '' })
        }}
      >
        Add a method
      </button>
    </ul>
  )
}
