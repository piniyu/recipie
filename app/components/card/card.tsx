import { Form, Link, useFetcher } from '@remix-run/react'
import { ReactNode, useEffect } from 'react'
import { CardListLoaderData } from '~/routes'
import img1 from '../../../public/assets/img1.jpeg'
import AuthCheck from '../auth/auth-check'

export interface CardProps {
  title: string
  favCounts: number
  basketCounts: number
  author: string
  id: string
  isLiked: boolean
  isInBasket: boolean
}

function IconForm({
  recipeId,
  action,
  icon,
}: {
  recipeId: string
  action: string
  icon: ReactNode
}) {
  const fetcher = useFetcher()
  // fetcher.load(`/recipe/like/${recipeId}`)
  // useEffect(() => {
  // }, [fetcher, recipeId])
  return (
    <AuthCheck loginConfirmModal>
      {user => (
        <fetcher.Form method="post" action={action}>
          <button
            type="submit"
            className="icon-btn-sm icon-btn-square flex "
            onClick={e => {
              if (!user?.id) {
                e.preventDefault()
              } else {
                e.stopPropagation()
              }
            }}
          >
            {icon}
          </button>
        </fetcher.Form>
      )}
    </AuthCheck>
  )
}

function Overlay({
  author,
  id,
  isLiked,
  isInBasket,
}: Pick<CardProps, 'author' | 'id' | 'isLiked' | 'isInBasket'>): JSX.Element {
  return (
    <div
      className={`
      opacity-0
      invisible
      group-hover:opacity-100 group-hover:visible
      transition-all

      absolute 
      flex items-end 
      w-full h-full 
      p-3 
      bg-gradient-to-t from-gray-800/80 via-transparent 
       text-white
      `}
    >
      <div className="flex-1 flex justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex p-0.5 rounded-full bg-white">
            <span className="material-icons-round  leading-none text-black">
              person
            </span>
          </span>
          {author}
        </div>
        <div className="flex gap-3">
          <IconForm
            recipeId={id}
            action={`/recipe/like/${id}`}
            icon={
              <span
                className={`material-symbols-rounded  leading-none ${
                  isLiked ? 'text-red-500' : ''
                }`}
                style={
                  isLiked ? { fontVariationSettings: '"FILL" 1' } : undefined
                }
              >
                favorite
              </span>
            }
          />
          <IconForm
            recipeId={id}
            action={`/add-basket/${id}`}
            icon={
              <span
                className={` material-symbols-rounded  leading-none ${
                  isInBasket ? 'text-blue-500' : ''
                }`}
                style={
                  isInBasket ? { fontVariationSettings: '"FILL" 1' } : undefined
                }
              >
                shopping_basket
              </span>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default function Card({
  id,
  title,
  favCounts,
  basketCounts,
  author,
  isLiked,
  isInBasket,
}: CardProps): JSX.Element {
  return (
    <Link
      to={`/recipe/${id}`}
      className="group flex flex-col gap-2 bg-white p-2 rounded-lg shadow-gray-200/50 shadow-xl hover:shadow-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all ease-in"
    >
      <div className="relative aspect-w-4 aspect-h-3 flex items-center justify-center overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover object-center " src={img1} />
        <Overlay
          author={author}
          id={id}
          isLiked={isLiked}
          isInBasket={isInBasket}
        />
      </div>
      <h4 className="line-clamp-1 text-center text-black font-medium">
        {title}
      </h4>
      <div className="flex justify-center gap-4">
        <span className="flex items-center gap-1 text-gray-400 text-sm">
          <span
            className="material-symbols-outlined text-xl leading-none "
            style={{ fontVariationSettings: '"wght" 300, "FILL" 0' }}
          >
            favorite
          </span>
          {favCounts}
        </span>
        <span className="flex items-center gap-1 text-gray-400 text-sm">
          <span
            className="material-symbols-outlined text-xl leading-none "
            style={{ fontVariationSettings: '"wght" 300,"FILL" 0' }}
          >
            shopping_basket
          </span>
          {basketCounts}
        </span>
      </div>
    </Link>
  )
}
