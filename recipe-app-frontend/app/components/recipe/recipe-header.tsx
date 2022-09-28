import { Link, useNavigate } from '@remix-run/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import Difficulty from '../difficulty'
import IconBtn from '../Icon-btn'
import Tag from '../tag'

const date = new Date(2022, 8, 6)

export default function RecipeHeader(): JSX.Element {
  // const [scrollPosition, setScrollPosition] = useState(0)
  // useEffect(() => {
  //   const localValue = localStorage.getItem('scrollPosition')
  //   if (localValue && localValue !== '0') {
  //     setScrollPosition(parseInt(localValue))
  //   }
  //   const onScroll = (e: Event) => {
  //     let element = (e.target as Document).scrollingElement
  //     if (element) {
  //       setScrollPosition(element.scrollTop)
  //     }
  //   }
  //   document.addEventListener('scroll', onScroll)
  //   return () => {
  //     console.log(window.scrollY)
  //     localStorage.setItem('scrollPosition', scrollPosition.toString())
  //     document.removeEventListener('scroll', onScroll)
  //   }
  // }, [])
  const navigate = useNavigate()
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 mt-4 mb-6">
          <Tag text="tag" />
          <Tag text="tag" />
        </div>
        <div className="flex items-center gap-6 text-gray-500">
          <div className="flex items-center gap-2">
            <IconBtn
              type="border"
              icon={
                <span className="material-symbols-rounded text-lg leading-none">
                  favorite
                </span>
              }
            />
            <span className="text-gray-500 text-sm">320</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-lg leading-none">
              shopping_basket
            </span>
            <span className="text-gray-500 text-sm">1,452</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <h1 className="mb-4 text-black">Salmon & Bun</h1>
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
        </div>
        <a
          className="btn-primary btn-md h-fit text-lg cursor-pointer"
          onClick={() => {
            localStorage.setItem('scrollPosition', window.scrollY.toString())
            console.log(window.scrollY)
            navigate('/recipe/modal/1')
          }}
        >
          Start Cooking
        </a>
      </div>
      <div className="flex items-center mb-9 text-sm text-gray-400">
        <span>Difficulty:</span>
        <Difficulty stars={3} />
      </div>
    </>
  )
}
