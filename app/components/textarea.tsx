import { ErrorMessage } from '@hookform/error-message'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormRegister,
  UseFormReturn,
  UseFormStateReturn,
} from 'react-hook-form'
import { Control, Controller, useFormContext, useWatch } from 'react-hook-form'
import { useAppDispatch } from '~/store/configure-store'
import { ErrorMessageComponent } from './error-message'

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
  onChangeCallback,
  registerOptions,
}: {
  methods?: UseFormReturn<FieldValues, any>
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
            // register(name).ref(v)
            register(name).ref(e)
            textareaMyRef = e
          }}
        />
        {maxLength !== undefined && (
          <span className="absolute right-0 bottom-0 mr-2 mb-2 inline-block text-xs text-gray-400">
            {/* {console.log(watchValue)} */}
            {watch(name) ? watch(name).length : 0}/{maxLength}
          </span>
        )}
      </div>
      <ErrorMessageComponent errors={errors} name={name} />
    </>
  )
}
