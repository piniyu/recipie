import { useEffect, useRef, useState } from 'react'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import { Control, Controller, useFormContext, useWatch } from 'react-hook-form'

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
  let textareaMyRef: HTMLTextAreaElement | null = null
  const [length, setLength] = useState(0)
  const { register, watch, control } = useFormContext()

  const textareaRef = register(name).ref
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
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <textarea
              {...field}
              rows={rows}
              className="input w-full resize-none align-bottom text-black"
              maxLength={maxLength}
              onChange={e => {
                if (maxLength) {
                  setLength(e.target.textLength)
                }
                field.onChange(e)
              }}
              placeholder={placeholder}
              ref={v => {
                textareaRef(v)
                textareaMyRef = v
              }}
            />
          )
        }}
      />

      {maxLength !== undefined && (
        <span className="absolute inline-block right-0 bottom-0 mr-2 mb-2 text-gray-400 text-xs">
          {length}/{maxLength}
        </span>
      )}
    </div>
  )
}
