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
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <IconBtn
              type="border"
              icon={
                <span className="material-symbols-rounded text-2xl leading-none">
                  favorite
                </span>
              }
            />
            <span className="">320</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-2xl leading-none">
              shopping_basket
            </span>
            <span className="">1,452</span>
          </div>
        </div>
        <Link
          className="btn-primary btn-md w-fit h-fit text-lg cursor-pointer"
          to={'/recipe/modal'}
          // onClick={() => {
          //   localStorage.setItem('scrollPosition', window.scrollY.toString())
          //   // console.log(window.scrollY)
          //   navigate('/recipe/modal')
          // }}
        >
          Start Cooking
        </Link>
      </div>
      <ContentCard>
        <div className="flex space-x-10">
          <HeaderImg src={img1} />
          <div className="flex-1 flex flex-col space-y-6">
            <div className="flex gap-3">
              <Tag text="tag" />
              <Tag text="tag" />
            </div>
            <h1 className=" text-black">{title}</h1>
            <div>
              <div className="flex items-center gap-2 mb-4 text-gray-500">
                <span className="inline-flex items-center gap-2">
                  <span className="material-icons-round leading-none text-gray-500">
                    person
                  </span>
                  {authorName}
                </span>
                <div className="self-stretch w-[1px] bg-gray-200"></div>
                <span>{moment(createdAt).format('LL')}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <span>Difficulty:</span>
                <DifficultyBtn {...{ difficulty }} />
              </div>
            </div>
          </div>
        </div>
      </ContentCard>
    </div>
  )
}
