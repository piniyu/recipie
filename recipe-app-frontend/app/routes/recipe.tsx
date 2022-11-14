import { useEffect, useRef, useState } from 'react'
import HeaderImg from '~/components/recipe/header-img'
import type { NutritionBarChartProps } from '~/components/recipe/recipe-nutrition/nutrition-chart'

import RecipeHeader from '~/components/recipe/recipe-header'

import IngredientsCard from '~/components/recipe/recipe-ingredients'
import type { RecipeTableProps } from '~/components/recipe/recipe-ingredients/recipe-ingredients-table'
import RecipeNutrition from '~/components/recipe/recipe-nutrition'
import Tag from '~/components/tag'
import IconBtn from '~/components/Icon-btn'
import img1 from '../../public/assets/img1.jpeg'
import { LoaderFunction } from '@remix-run/node'
import { Prisma, prisma, Recipe } from '@prisma/client'
import { db } from '~/utils/db.server'
import { useLoaderData } from '@remix-run/react'

const nutritionData: NutritionBarChartProps[][] = [
  [
    {
      name: 'Protein',
      pct: 40,
      qat: { value: 13, mes: 'g' },
    },
  ],
  [
    {
      name: 'Fat',
      pct: 30,
      qat: { value: 10, mes: 'g' },
    },
  ],
  [
    {
      name: 'Soldium',
      pct: 10,
      qat: { value: 20, mes: 'mg' },
    },
  ],
  [
    {
      name: 'Cholestral',
      pct: 40,
      qat: { value: 13, mes: 'g' },
    },
  ],
]
const ingredientsTableData: RecipeTableProps[] = [
  {
    ingredient: 'Salmon',
    mes: 'g',
    qat: 300,
  },

  {
    ingredient: 'Salt',
    mes: 'mg',
    qat: 100,
  },

  {
    ingredient: 'Milk',
    mes: 'ml',
    qat: 50,
  },

  {
    ingredient: 'Egg',
    mes: 'pcs',
    qat: 1,
  },
]

type RecipeWithIngredients = Prisma.RecipeGetPayload<{
  include: { ingredientsNum: { include: { ingredient: true } } }
}>

export const loader: LoaderFunction = async () => {
  const recipe = await db.recipe.findUnique({
    where: { id: 'testrecipe0' },
    include: { ingredientsNum: { include: { ingredient: true } } },
  })

  return recipe
}

export default function RecipeIndex(): JSX.Element {
  const data = useLoaderData<(Recipe & RecipeWithIngredients) | null>()

  useEffect(() => {
    const scrollValue = localStorage.getItem('scrollPosition')
    if (scrollValue) {
      window.scrollTo({ top: parseInt(scrollValue) })
    }
  }, [])

  if (!data) {
    throw new Error()
  }
  const {
    title,
    authorId: authorName,
    createdAt,
    difficulty,
    ingredientsNum,
  } = data
  console.log(data)
  return (
    <div className="flex flex-col mx-auto min-h-screen relative max-w-7xl">
      <div className="flex-1 relative ">
        {/* <div className="absolute bg-white mask-image w-full h-20 -translate-y-full"></div> */}
        <div className="layout-px layout-pt pb-8 space-y-10">
          {/* <div className="flex"> */}
          <RecipeHeader {...{ title, createdAt, difficulty, authorName }} />
          {/* </div> */}
          <div className="flex space-x-10 text-black ">
            <IngredientsCard data={ingredientsNum} />
            <RecipeNutrition data={nutritionData} />
          </div>
        </div>
      </div>
    </div>
  )
}
