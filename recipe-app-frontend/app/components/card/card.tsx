import { Link } from '@remix-run/react'
import img1 from '../../../public/assets/img1.jpeg'

export interface CardProps {
  title: string
  favCounts: number
  basketCounts: number
  author: string
  id: string
}

function Overlay({ author }: Pick<CardProps, 'author'>): JSX.Element {
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
          <button className="icon-btn-sm icon-btn-square flex ">
            <span className="material-symbols-rounded  leading-none">
              favorite
            </span>
          </button>
          <button className="icon-btn-sm icon-btn-square flex  ">
            <span className="material-symbols-rounded  leading-none">
              shopping_basket
            </span>
          </button>
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
}: CardProps): JSX.Element {
  return (
    <Link
      to={`/recipe/${id}`}
      className="group flex flex-col gap-2 bg-white p-2 rounded-lg shadow-gray-200/50 shadow-xl hover:shadow-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all ease-in"
    >
      <div className="relative aspect-w-4 aspect-h-3 flex items-center justify-center overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover object-center " src={img1} />
        <Overlay author={author} />
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
