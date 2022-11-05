import { Link, useNavigate } from '@remix-run/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Difficulty from '../difficulty'
import IconBtn from '../Icon-btn'
import Tag from '../tag'
import HeaderImg from './header-img'
import img1 from '../../../public/assets/img1.jpeg'

const date = new Date(2022, 8, 6)

export default function RecipeHeader(): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col space-y-10">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-6 text-gray-500">
          <div className="flex items-center gap-2">
            <IconBtn
              type="border"
              icon={
                <span className="material-symbols-rounded text-2xl leading-none">
                  favorite
                </span>
              }
            />
            <span className="text-gray-500 ">320</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-2xl leading-none">
              shopping_basket
            </span>
            <span className="text-gray-500">1,452</span>
          </div>
        </div>
        <button
          className="btn-primary btn-md w-fit h-fit text-lg cursor-pointer"
          onClick={() => {
            localStorage.setItem('scrollPosition', window.scrollY.toString())
            console.log(window.scrollY)
            navigate('/recipe/modal')
          }}
        >
          Start Cooking
        </button>
      </div>
      <div className="flex space-x-10">
        <HeaderImg src={img1} />
        <div className="flex-1 flex flex-col space-y-6">
          <div className="flex gap-3">
            <Tag text="tag" />
            <Tag text="tag" />
          </div>
          <h1 className=" text-black">Salmon & Bun</h1>
          <div>
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
              <span className="inline-flex items-center gap-2">
                <span className="material-icons-round text-lg leading-none text-gray-400">
                  person
                </span>
                User Name
              </span>
              <div className="self-stretch w-[1px] bg-gray-200"></div>
              <span>{moment(date).format('LL')}</span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <span>Difficulty:</span>
              <Difficulty stars={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
