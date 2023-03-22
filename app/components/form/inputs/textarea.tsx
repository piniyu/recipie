import React, { useEffect } from 'react'
import type { FieldValues, UseFormRegister } from 'react-hook-form'
import { useFormContext, useWatch } from 'react-hook-form'
import { ErrorMessageComponent } from '../../ui/error-message'

export default function Textarea({
  maxLength,
  name,
  rows,
  placeholder = '',
  onChangeCallback,
  registerOptions,
}: {
  maxLength?: number
  name: string
  rows?: number
  placeholder?: string
  registerOptions?: Parameters<UseFormRegister<FieldValues>>['1']
  onChangeCallback?: (name: string, value: any, e: React.ChangeEvent) => void
}): JSX.Element {
  const {
    register,
    watch,
    control,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext()
  const watchValue = useWatch({ control, defaultValue: { name } })
  let textareaMyRef: HTMLTextAreaElement | null = null

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

  return (
    <>
      <div className="relative w-full">
        <textarea
          {...register(name, {
            ...registerOptions,
            onChange: e => {
              trigger(name)
              registerOptions?.onChange && registerOptions.onChange(e)
              if (onChangeCallback) {
                onChangeCallback(name, getValues(name), e)
              }
            },
          })}
          rows={rows}
          className={` input w-full resize-none align-bottom text-inherit ${
            maxLength ? 'pb-8' : ''
          } ${errors[name]?.message ? 'input-error' : ''}
        `}
          maxLength={maxLength}
          placeholder={placeholder}
          ref={e => {
            register(name).ref(e)
            textareaMyRef = e
          }}
        />
        {maxLength !== undefined && (
          <span className="absolute right-0 bottom-0 mr-2 mb-2 inline-block text-xs text-gray-400">
            {watch(name) ? watch(name).length : 0}/{maxLength}
          </span>
        )}
      </div>
      <ErrorMessageComponent errors={errors} name={name} />
    </>
  )
}
