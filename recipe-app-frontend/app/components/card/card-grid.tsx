import type { Prisma } from '@prisma/client'
import { useEffect, useState } from 'react'
import type { recipesListData } from '~/routes'
import type { CardProps } from './card'
import Card from './card'

type CardGridProps = {
  data: Prisma.RecipeGetPayload<typeof recipesListData>[] | null
}

export default function CardGrid({ data }: CardGridProps): JSX.Element | null {
  const [modifiedData, setModifiedData] = useState<CardProps[]>([])

  useEffect(() => {
    if (data) {
      const newData = data.map(recipe => ({
        favCounts: Math.floor(Math.random() * 1000),
        basketCounts: Math.floor(Math.random() * 1000),
        title: recipe.title,
        author: recipe.author.name ?? recipe.author.id,
        id: recipe.id,
      }))
      setModifiedData(newData)
    }
  }, [data])

  if (!data) return null
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-9">
      {modifiedData.map(
        ({ id, title, favCounts, basketCounts, author }, idx) => (
          <Card
            key={`${title}_${idx}`}
            {...{ id, title, favCounts, basketCounts, author }}
          />
        ),
      )}
    </div>
  )
}
