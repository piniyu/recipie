import { useEffect, useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function HeaderImg({
  // jpgSrc,
  src,
}: {
  // jpgSrc: string
  src: string
}): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div className=" relative flex-1 ">
      <div className=" aspect-w-4 aspect-h-3 overflow-hidden rounded-2xl bg-white dark:bg-gray-600">
        <img src={src} alt="recipe-header-img" />
      </div>
    </div>
  )
}
