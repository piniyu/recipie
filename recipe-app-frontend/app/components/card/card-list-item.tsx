import React from 'react'
import img1 from '../../../public/assets/img1.jpeg'

export default function CardListItem({
  title,
  onDelete,
  recipeId,
}: {
  title: string
  onDelete?: (e: React.FormEvent) => void
  recipeId: string
}): JSX.Element {
  return (
    <div className="flex gap-4 ">
      <div className="w-24">
        <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg shadow-md">
          {/* <div className="p-1 bg-white rounded-lg"> */}
          <img
            className="w-full h-full object-cover object-center "
            src={img1}
          />
          {/* </div> */}
        </div>
      </div>
      <h4 className="flex-1 py-2 text-black font-medium">{title}</h4>
      {onDelete ? (
        <form className="flex items-center" onSubmit={onDelete} method="post">
          <input type="hidden" name="delete" value={recipeId} />
          <button
            className="flex p-1 border border-gray-200 rounded-full"
            name={recipeId}
            type="submit"
          >
            <span className="material-symbols-rounded text-lg leading-none text-gray-500">
              close
            </span>
          </button>
        </form>
      ) : null}
    </div>
  )
}
