import { useParams } from '@remix-run/react'
import { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '../../../store/configure-store'
import AuthCheck from '~/feature/auth/auth-check'
import ArrowDownIcon from '~/components/icons/ExpandMoreFill0Wght400Grad25Opsz48'
import ArrowUpIcon from '~/components/icons/ExpandLessFill0Wght400Grad25Opsz48'
import BasketIcon from '~/components/icons/ShoppingBasketFill0Wght400Grad25Opsz48'
import DoneIcon from '~/components/icons/DoneFill0Wght400Grad25Opsz48'

type FormPropsType = {
  input: number
}

export default function ServingForm({
  onSubmit,
  defaultServings,
}: {
  onSubmit: (v: FormPropsType) => void
  defaultServings: number
}): JSX.Element {
  const { recipeId } = useParams()
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
    defaultValues: recipe
      ? { input: recipe.servings }
      : { input: defaultServings },
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
      <div className="mb-6 flex items-center justify-center gap-2 py-9 text-center text-xl font-bold">
        <span className="">I need </span>
        <div className="relative inline-block h-9 min-w-[60px] max-w-[80px]  text-3xl  ">
          <button
            className={`
                    absolute 
                    bottom-full left-1/2 mb-1 
                    flex 
                    -translate-x-1/2 rounded-full 
                    border border-gray-200 p-1`}
            type="button"
            onClick={() => {
              if (servingInputRef.current) {
                servingInputRef.current.stepUp()
                setValue('input', watchValue + 1, { shouldDirty: true })
              }
            }}
          >
            <ArrowUpIcon className="svg-md svg-gray" />
          </button>
          <span className="inline-block max-w-[80px] overflow-hidden whitespace-pre">
            {watchValue}
          </span>
          <input
            {...register('input')}
            type="number"
            className="absolute top-0 left-0 w-full text-center align-top outline-focus-outline"
            onWheel={e => {
              ;(e.target as HTMLElement).blur()
            }}
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
                    top-full left-1/2 mt-1 
                    flex 
                    -translate-x-1/2 rounded-full 
                    border border-gray-200 p-1
                    ${watchValue === 1 ? 'text-gray-300 ' : 'text-gray-500'}
                    `}
            type="button"
            onClick={e => {
              if (servingInputRef.current) {
                servingInputRef.current.stepDown()
                setValue('input', watchValue - 1, { shouldDirty: true })
              }
            }}
            disabled={watchValue === 1}
          >
            <ArrowDownIcon className="svg-md svg-gray" />
          </button>
        </div>
        <span className=""> Servings</span>
      </div>
      <AuthCheck>
        {userId => (
          <button
            className={`btn-md w-full gap-2 ${
              isSubmitSuccessful && !isDirty
                ? 'btn-successful'
                : 'btn-secondary'
            }`}
            disabled={userId === null || watchValue === 0}
            type="submit"
          >
            <span className="material-symbols-rounded text-xl leading-none">
              {isSubmitSuccessful && !isDirty ? (
                <DoneIcon className="svg-sm svg-neutral" />
              ) : (
                <BasketIcon className="svg-sm svg-neutral" />
              )}
            </span>
            {userId
              ? isSubmitSuccessful && !isDirty
                ? recipe
                  ? 'Updated basket'
                  : 'Added to basket'
                : recipe
                ? 'Update basket servings'
                : 'Add to basket'
              : 'Login to add in basket'}
          </button>
        )}
      </AuthCheck>
    </form>
  )
}
