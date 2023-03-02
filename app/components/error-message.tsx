import { ErrorMessage } from '@hookform/error-message'

export function ErrorMessageComponent({
  errors,
  name,
}: {
  name: string
  errors: any
}) {
  let errorsObj = errors

  if (Array.isArray(errorsObj[name])) {
    errorsObj = errorsObj[name] = errorsObj[name].reduce((a: any, c: any) => {
      return a
    })
  }

  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => (
        <p className="relative  text-xs text-red-500 dark:text-red-400">
          {message}
        </p>
      )}
    />
  )
}
