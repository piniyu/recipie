import { Link, useNavigate } from '@remix-run/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import DifficultyBtn from '../difficulty'
import IconBtn from '../Icon-btn'
import Tag from '../tag'
import HeaderImg from './header-img'
import img1 from '../../../public/assets/img1.jpeg'
import type { Difficulty } from '@prisma/client'
import ContentCard from '../card/content-card'

const date = new Date(2022, 8, 6)

export default function RecipeHeader({
  title,
  authorName,
  createdAt,
  difficulty,
}: {
  title: string
  authorName: string
  createdAt: Date
  difficulty: Difficulty
}): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col space-y-10">
      <ContentCard>
        <div className="flex space-x-10">
          <HeaderImg src={img1} />
          <div className="flex-1 flex flex-col space-y-8">
            <h1 className=" text-black">{title}</h1>
            <div>
              <div className="flex items-center gap-2 text-gray-500">
                <span className="inline-flex items-center gap-2">
                  <span className="material-icons-round leading-none text-gray-500">
                    person
                  </span>
                  {authorName}
                </span>
                <div className="self-stretch w-[1px] bg-gray-200"></div>
                <span>{moment(createdAt).format('LL')}</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex gap-3">
                <Tag text="tag" />
                <Tag text="tag" />
              </div>
            </div>
            <div className="flex justify-center">
              <Link
                className="btn-primary btn-md w-full h-fit text-lg cursor-pointer"
                to={'/recipe/modal'}
              >
                Start Cooking
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around mt-10 text-gray-600">
          <div className="flex items-center text-gray-500">
            <span>Difficulty:</span>
            <DifficultyBtn {...{ difficulty }} />
          </div>
          <div className="w-[1px] bg-gray-200 h-[35px]"></div>
          <div className="flex items-center gap-2">
            <button className="icon-btn-sm bg-red-400 text-white">
              <span className="material-symbols-rounded leading-none">
                favorite
              </span>
            </button>
            <span className="">320</span>
          </div>
          <div className="w-[1px] bg-gray-200 h-[35px]"></div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded leading-none">
              shopping_basket
            </span>
            <span className="">1,452</span>
          </div>
        </div>
      </ContentCard>
    </div>
  )
}
