import { Form, useLocation } from '@remix-run/react'
import React, { ReactNode } from 'react'
import DeletIcon from '~/components/icons/DeleteFill0Wght400Grad25Opsz48'

export default function CardListItem({
  title,
  onDelete,
  recipeId,
  subTitle,
  imgSrc,
}: {
  title: string
  onDelete?: (e: React.FormEvent) => void
  recipeId: string
  subTitle?: ReactNode
  imgSrc: string
}): JSX.Element {
  const location = useLocation()
  return (
    <div className="flex gap-4 ">
      <div className="w-24">
        <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg shadow-md">
          <img
            className="h-full w-full object-cover object-center "
            src={imgSrc}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <h4 className="flex-1  font-medium">{title}</h4>
        {subTitle}
      </div>
      {onDelete ? (
        <Form className="flex " onSubmit={onDelete} method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={`${location.pathname}${location.search}`}
          />
          <input type="hidden" name="deleteId" value={recipeId} />
          <button className="flex rounded-full p-1" type="submit">
            <DeletIcon className="svg-md fill-red-500 dark:fill-red-400" />
          </button>
        </Form>
      ) : null}
    </div>
  )
}
