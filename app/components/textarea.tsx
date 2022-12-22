import { useCallback, useEffect, useRef, useState } from 'react'
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
  UseFormStateReturn,
} from 'react-hook-form'
import { Control, Controller, useFormContext, useWatch } from 'react-hook-form'

const MyTextarea = ({
  field,
  maxLength,
  rows,
  placeholder,
}: {
  field: ControllerRenderProps<FieldValues, string>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<FieldValues>
  // methods: UseFormReturn<FieldValues, any>
  maxLength?: number
  name: string
  rows?: number
  placeholder?: string
  // isOptional?: boolean
}): JSX.Element => {
  let textareaMyRef: HTMLTextAreaElement | null = null
  const { register, watch, control } = useFormContext()
  // const {register ,watch}=methods
  const { name } = field
  const textareaRef = useCallback(
    (v: HTMLTextAreaElement | null) => register(name).ref,
    [name, register],
  )
  const watchTextarea = watch(name)
  useEffect(() => {
    if (textareaMyRef && window) {
      const computedStyle = window.getComputedStyle(textareaMyRef)
      const borderTop = +computedStyle
        .getPropertyValue('border-top-width')
        .replace('px', '')
      const borderBottom = +computedStyle
        .getPropertyValue('border-bottom-width')
        .replace('px', '')

      textareaMyRef.style.height =
        textareaMyRef.scrollHeight + borderBottom + borderTop + 'px'
    }
  }, [watchTextarea, textareaMyRef])
  return (
    <textarea
      {...field}
      rows={rows}
      className="input w-full resize-none align-bottom text-black"
      maxLength={maxLength}
      onChange={e => {
        // if (maxLength) {
        //   setLength(e.target.textLength)
        // }
        field.onChange(e.target.value)
      }}
      placeholder={placeholder}
      ref={v => {
        textareaRef(v)
        textareaMyRef = v
      }}
    />
  )
}

export default function Textarea({
  methods,
  maxLength,
  name,
  rows,
  placeholder = '',
}: {
  methods?: UseFormReturn<FieldValues, any>
  maxLength?: number
  name: string
  rows?: number
  placeholder?: string
  // isOptional?: boolean
}): JSX.Element {
  const { register, watch, control } = useFormContext()
  const watchValue = watch(name)
  let textareaMyRef: HTMLTextAreaElement | null = null
  const { ref, ...rest } = register(name)

  // const [length, setLength] = useState(0)
  useEffect(() => {
    if (textareaMyRef && window) {
      const computedStyle = window.getComputedStyle(textareaMyRef)
      const borderTop = +computedStyle
        .getPropertyValue('border-top-width')
        .replace('px', '')
      const borderBottom = +computedStyle
        .getPropertyValue('border-bottom-width')
        .replace('px', '')

      textareaMyRef.style.height =
        textareaMyRef.scrollHeight + borderBottom + borderTop + 'px'
    }
  }, [watchValue, textareaMyRef])
  // console.log(watchValue, name)
  // useEffect(() => {
  //   const subscribe = watch(value => {
  //     setLength(value.title.length)
  //     // console.log(value)
  //   })
  //   return () => {
  //     subscribe.unsubscribe()
  //   }
  // }, [watch])
  return (
    <div className="relative w-full">
      {/* <textarea {...register(name)} /> */}
      <textarea
        {...rest}
        rows={rows}
        className={` input w-full resize-none align-bottom text-black ${
          maxLength ? 'pb-8' : ''
        }`}
        maxLength={maxLength}
        placeholder={placeholder}
        ref={e => {
          // register(name).ref(v)
          ref(e)
          textareaMyRef = e
        }}
      />
      {/* <Controller
        name={name}
        control={control}
        render={props => {
          return (
            <MyTextarea {...{ ...props, maxLength, name, rows, placeholder }} />
          )
        }}
      /> */}

      {maxLength !== undefined && (
        <span className="absolute inline-block right-0 bottom-0 mr-2 mb-2 text-gray-400 text-xs">
          {watchValue ? watchValue.length : 0}/{maxLength}
        </span>
      )}
    </div>
  )
}
