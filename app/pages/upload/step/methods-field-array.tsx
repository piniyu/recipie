import {
  Controller,
  FieldPath,
  FieldValues,
  useFieldArray,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form'
import { StepFormProps } from './step-form'
import Textarea from '../../../components/form/inputs/textarea'

const regexNum = new RegExp('^[0-9]$')
const regexChar = new RegExp('^[a-zA-Z]$')

// const TimeInput = ({
//   name,
//   ...methods
// }: { name: string } & UseFormReturn<FieldValues, any>): JSX.Element => {
//   const { register, control, watch, setValue } = methods
//   const watchValue = watch(name)
//   return (
//     // <Controller
//     //   name={name}
//     //   control={control}
//     //   render={({ field }) => (
//     <input
//       {...register(name)}
//       type="text"
//       className="input w-20 text-right"
//       placeholder="0:00"
//       onKeyDown={e => {
//         if (
//           watchValue.length === 4 &&
//           // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,].includes(parseInt(e.key))
//           regexNum.test(e.key)
//         ) {
//           e.preventDefault()
//         }
//         if (regexChar.test(e.key)) {
//           e.preventDefault()
//         }
//       }}
//       onFocus={e => {
//         setValue(name, e.target.value.replace(':', ''))
//       }}
//       onBlur={e => {
//         const arr = e.target.value.split('')
//         while (arr.length < 4) {
//           arr.unshift('0')
//         }
//         const length = arr.length
//         arr.splice(length - 2, 0, ':')
//         setValue(name, arr.join(''))
//       }}
//     />
//     // )}
//     // />
//   )
// }

export default function MethodsFieldArray(): JSX.Element {
  const name: FieldPath<StepFormProps> = 'methods'
  const methods = useFormContext<StepFormProps>()
  const { control, watch, setError, clearErrors } = methods
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })
  const watchFieldArray = watch(name)
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    }
  })
  return (
    <ul className="space-y-4">
      {controlledFields.map((field, idx) => {
        return (
          <div key={field.id}>
            <div className="flex gap-4">
              {/* <TimeInput {...methods} name={`${name}.${idx}.timeStemp`} /> */}
              <Textarea
                {...methods}
                name={`${name}.${idx}.content`}
                rows={1}
                placeholder="Method"
                registerOptions={{
                  onChange: () => {
                    clearErrors(name)
                  },
                  onBlur: () => {
                    if (watchFieldArray.every(e => e.content.length === 0)) {
                      setError(name, {
                        type: 'required',
                        message: 'Please add one methods at least!',
                      })
                    }
                  },
                }}
              />
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
          append({ content: '' })
        }}
      >
        Add a method
      </button>
    </ul>
  )
}
