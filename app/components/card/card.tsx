import { Thumbnail } from '@prisma/client'
import { Form, FormProps, Link, useFetcher } from '@remix-run/react'
import { FormHTMLAttributes, ReactNode, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import AuthCheck from '../auth/auth-check'
import BasketIcon from '~/components/icons/ShoppingBasketFill0Wght400Grad25Opsz48'
import BasketIconFill from '~/components/icons/ShoppingBasketFill1Wght400Grad25Opsz48'
import LikeIcon from '~/components/icons/FavoriteFill0Wght400Grad25Opsz48'
import LikeIconFill from '~/components/icons/FavoriteFill1Wght400Grad25Opsz48'
import PersonIcon from '~/components/icons/PersonFill0Wght400Grad25Opsz48'

export interface CardProps {
  title: string
  favCounts: number
  basketCounts: number
  author: string
  id: string
  isLiked: boolean
  isInBasket: boolean
  thumbnail: string
}

export function IconForm({
  action,
  icon,
  className,
  onClickHandler,
  ...props
}: {
  action: string
  icon: ReactNode
  className?: string
  onClickHandler?: () => void
} & FormHTMLAttributes<HTMLFormElement> &
  FormProps) {
  const fetcher = useFetcher()

  return (
    <AuthCheck loginConfirmModal>
      {user => (
        <fetcher.Form {...props} method="post" action={action}>
          <button
            type="submit"
            className={`icon-btn-sm icon-btn-square flex ${className ?? ''} `}
            onClick={e => {
              if (!user?.id) {
                e.preventDefault()
              } else {
                e.stopPropagation()
                onClickHandler && onClickHandler()
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
      invisible
      absolute
      flex h-full
      w-full

      items-end 
      bg-gradient-to-t from-gray-800/80 via-transparent
      p-5 text-white opacity-0
      transition-all 
      group-hover:visible group-hover:opacity-100 dark:from-black 
       dark:text-gray-200
      `}
    >
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex rounded-full bg-white p-1 dark:bg-gray-200">
            {/* <span className="material-icons-round  leading-none text-black">
              person
            </span> */}
            <PersonIcon className="svg-lg fill-black" />
          </span>
          {author}
        </div>
        <div className="flex gap-3">
          <IconForm
            action={`/action/recipe/like/${id}`}
            icon={
              isLiked ? (
                <LikeIconFill className="svg-md fill-red-500" />
              ) : (
                <LikeIcon className="svg-md" />
              )
            }
          />
          <IconForm
            action={`/action/add-basket/${id}`}
            icon={
              isInBasket ? (
                <BasketIconFill className="svg-md fill-blue-500" />
              ) : (
                <BasketIcon className="svg-md" />
              )
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
  thumbnail,
}: CardProps): JSX.Element {
  return (
    <Link
      to={`/recipe/${id}`}
      className="group flex flex-col rounded-lg bg-white p-0.5 shadow-xl shadow-gray-200/50 transition-all ease-in dark:bg-dark-gray dark:shadow-black"
    >
      <div className="aspect-w-4 aspect-h-3 relative flex items-center justify-center overflow-hidden rounded-t-lg">
        {/* <picture> */}
        {/* <source srcSet={thumbnail?.webpSrc} /> */}
        <LazyLoadImage
          className="h-full w-full object-cover object-center "
          src={thumbnail}
          effect="opacity"
        />

        {/* </picture> */}
        <Overlay
          author={author}
          id={id}
          isLiked={isLiked}
          isInBasket={isInBasket}
        />
      </div>
      <div className="mx-5 my-4 flex flex-col gap-2">
        <h4 className="font-medium text-black line-clamp-2 dark:text-gray-200">
          {title}
        </h4>
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-sm text-gray-400 ">
            <LikeIcon className="svg-sm svg-gray" />
            {favCounts}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-400 ">
            <BasketIcon className="svg-sm svg-gray" />
            {basketCounts}
          </span>
        </div>
      </div>
    </Link>
  )
}
