import { Link, useNavigate, useParams } from '@remix-run/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import DifficultyBtn from '../difficulty'
import IconBtn from '../Icon-btn'
import Tag from '../tag'
import HeaderImg from './header-img'
import img1 from '../../../public/assets/img1.jpeg'
import type { Difficulty, Thumbnail } from '@prisma/client'
import ContentCard from '../card/content-card'
import { IconForm } from '../card/card'

export default function RecipeHeader({
  title,
  authorName,
  createdAt,
  difficulty,
  thumbnailSrc,
  favCounts,
  basketCounts,
  recipeId,
  isInBasket,
  isLiked,
  tags,
}: {
  title: string
  authorName: string
  createdAt: string
  difficulty: Difficulty
  // preSignedUrl: string
  thumbnailSrc: string
  favCounts: number
  basketCounts: number
  recipeId: string
  isLiked: boolean
  isInBasket: boolean
  tags: string[]
}): JSX.Element {
  const [like, setLike] = useState(isLiked)
  const [likeCounts, setLikeCounts] = useState(favCounts)
  const [basket, setBasket] = useState(isInBasket)
  const [inBasketCounts, setInBasketCounts] = useState(basketCounts)
  return (
    <div className="flex flex-col space-y-10">
      <ContentCard>
        <div className="flex space-x-10">
          <HeaderImg src={thumbnailSrc} />
          <div className="flex flex-1 flex-col space-y-8">
            <h1 className="text-black dark:text-gray-200">{title}</h1>
            <div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-2">
                  <span className="material-icons-round leading-none text-gray-500">
                    person
                  </span>
                  {authorName}
                </span>
                <div className="w-[1px] self-stretch bg-gray-200"></div>
                <span>{moment(createdAt).format('LL')}</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex gap-3">
                {tags?.map((e, i) => (
                  <Tag key={i} text={e} />
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Link
                className="btn-primary btn-md h-fit w-full cursor-pointer text-lg"
                to={`/recipe/${recipeId}/modal`}
              >
                Start Cooking
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-evenly text-gray-600 dark:text-gray-400">
          <div className="flex items-center ">
            <span>Difficulty:</span>
            <DifficultyBtn {...{ difficulty }} />
          </div>
          <div className="h-[35px] w-[1px] bg-gray-200 dark:bg-gray-500"></div>
          <div className="flex items-center gap-2">
            <IconForm
              className={`icon-btn-sm rounded-full bg-white text-black transition-colors hover:bg-gray-200 dark:bg-gray-200 dark:hover:bg-gray-300
              ${like ? 'text-red-500 dark:text-red-600' : ''}`}
              icon={
                <span
                  className="material-symbols-rounded leading-none "
                  style={
                    like ? { fontVariationSettings: '"FILL" 1' } : undefined
                  }
                >
                  favorite
                </span>
              }
              action={`/action/recipe/like/${recipeId}`}
              onClickHandler={() => {
                setLike(prev => {
                  if (prev) {
                    setLikeCounts(prevNum => prevNum - 1)
                  } else {
                    setLikeCounts(prevNum => prevNum + 1)
                  }
                  return !prev
                })
                // console.log(e)
              }}
            />
            <span>{likeCounts}</span>
          </div>
          <div className="h-[35px] w-[1px] bg-gray-200 dark:bg-gray-500"></div>
          <div className="flex items-center gap-2">
            <IconForm
              className={`icon-btn-sm rounded-full bg-white text-black transition-colors hover:bg-gray-200 dark:bg-gray-200 dark:hover:bg-gray-300
              ${basket ? 'text-blue-500 dark:text-blue-600' : ''}`}
              action={`/action/add-basket/${recipeId}`}
              icon={
                <span
                  className="material-symbols-rounded leading-none"
                  style={
                    basket ? { fontVariationSettings: '"FILL" 1' } : undefined
                  }
                >
                  shopping_basket
                </span>
              }
              onClickHandler={() => {
                setBasket(prev => {
                  if (prev) {
                    setInBasketCounts(prevNum => prevNum - 1)
                  } else {
                    setInBasketCounts(prevNum => prevNum + 1)
                  }
                  return !prev
                })
              }}
            />
            <span>{inBasketCounts}</span>
          </div>
        </div>
      </ContentCard>
    </div>
  )
}
