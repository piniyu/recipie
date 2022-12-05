import { useParams, useSubmit } from '@remix-run/react'
import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'store/configure-store'

type FormPropsType = {
  input: number
}

export default function ServingForm({
  onSubmit,
}: {
  onSubmit: (v: FormPropsType) => void
}): JSX.Element {
  const { recipeId } = useParams()
  console.log(recipeId)
  const recipeServing = useAppSelector(state => state.recipeServings)
  const recipe = recipeServing.find(recipe => recipe.recipeId === recipeId)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitSuccessful, isDirty },
  } = useForm<FormPropsType>({
    defaultValues: recipe ? { input: recipe.servings } : { input: 1 },
  })
  const watchValue = watch('input')
  const servingInputRef = useRef<HTMLInputElement | null>(null)
  const inputRef = useCallback(
    (node: HTMLInputElement) => {
      if (node !== null) {
        servingInputRef.current = node
        register('input').ref(node)
      }
    },
    [register],
  )

  // const [inputValue, setInputValue] = useState('2')
  return (
    <form
      onSubmit={handleSubmit(e => {
        onSubmit(e)
        reset(
          {
            input: e.input,
          },
          { keepDirty: false },
        )
      })}
    >
      <div className="flex items-center justify-center gap-2 text-center mb-6 py-9 text-xl font-bold">
        <span className="">I need </span>
        <div className="relative inline-block min-w-[60px] max-w-[80px] h-9  text-3xl  ">
          <button
            className={`
                    absolute 
                    bottom-full left-1/2 -translate-x-1/2 
                    flex 
                    mb-1 p-1 
                    border border-gray-200 rounded-full`}
            type="button"
            onClick={() => {
              if (servingInputRef.current) {
                servingInputRef.current.stepUp()
                setValue('input', watchValue + 1, { shouldDirty: true })
              }
            }}
          >
            <span className="material-symbols-rounded text-lg leading-none text-gray-500">
              keyboard_arrow_up
            </span>
          </button>
          <span
            className="whitespace-pre inline-block max-w-[80px] overflow-hidden"
            // ref={inputTemplate}
          >
            {watchValue}
          </span>
          <input
            {...register('input')}
            type="number"
            className="absolute w-full top-0 left-0 text-center align-top outline-focus-outline"
            // onChange={e => {
            //   console.log(e, inputValue)
            //   // setInputValue(e.target.value)
            //   if (inputTemplate.current) {
            //     inputTemplate.current.textContent = e.target.value
            //   }
            // }}
            onWheel={e => {
              ;(e.target as HTMLElement).blur()
            }}
            // value={inputValue}
            onKeyDown={e => {
              if (
                ((e.target as HTMLInputElement).value.length === 0 &&
                  ['0'].includes(e.key)) ||
                ['.', 'e'].includes(e.key)
              ) {
                e.preventDefault()
              }
            }}
            ref={inputRef}
          />
          <button
            className={`
                    absolute 
                    top-full left-1/2 -translate-x-1/2 
                    flex 
                    mt-1 p-1 
                    border border-gray-200 rounded-full
                    ${watchValue === 1 ? 'text-gray-300 ' : 'text-gray-500'}
                    `}
            type="button"
            onClick={e => {
              // if (inputValue === '1') {
              //   e.preventDefault()
              //   return
              // }
              if (servingInputRef.current) {
                servingInputRef.current.stepDown()
                setValue('input', watchValue - 1, { shouldDirty: true })
              }
            }}
            disabled={watchValue === 1}
          >
            <span className={`material-symbols-rounded text-lg leading-none  `}>
              keyboard_arrow_down
            </span>
          </button>
        </div>
        <span className=""> Servings</span>
      </div>
      <button
        className={`btn-md w-full gap-2 ${
          isSubmitSuccessful && !isDirty ? 'btn-successful' : 'btn-secondary'
        }`}
        disabled={watchValue === 0}
        type="submit"
      >
        <span className="material-symbols-rounded text-xl leading-none">
          {isSubmitSuccessful && !isDirty ? 'done' : ' shopping_basket '}
        </span>
        {isSubmitSuccessful && !isDirty
          ? recipe
            ? 'Updated basket'
            : 'Added to basket'
          : recipe
          ? 'Update basket servings'
          : 'Add to basket'}
      </button>
    </form>
  )
}
