import type { Thumbnail, User } from '@prisma/client'
import Card, { CardProps } from './card'

export default function CardGrid({
  data,
}: {
  data: CardProps[]
}): JSX.Element | null {
  if (!data) return null
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-9">
      {data.map(
        (
          {
            id,
            title,
            favCounts,
            basketCounts,
            author,
            isLiked,
            isInBasket,
            thumbnail,
          },
          idx,
        ) => (
          <Card
            key={`${title}_${idx}`}
            {...{
              id,
              title,
              favCounts,
              basketCounts,
              author,
              isLiked,
              isInBasket,
              thumbnail,
            }}
          />
        ),
      )}
    </div>
  )
}
