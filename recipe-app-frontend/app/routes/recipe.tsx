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

export default function Recipe(): JSX.Element {
  useEffect(() => {
    const scrollValue = localStorage.getItem('scrollPosition')
    if (scrollValue) {
      window.scrollTo({ top: parseInt(scrollValue) })
    }
  }, [])
  return (
    <div className="flex flex-col mx-auto min-h-screen relative max-w-7xl">
      <div className="flex-1 relative ">
        {/* <div className="absolute bg-white mask-image w-full h-20 -translate-y-full"></div> */}
        <div className="layout-px layout-pt pb-8 space-y-10">
          {/* <div className="flex"> */}
          <RecipeHeader />
          {/* </div> */}
          <div className="flex space-x-10 text-black ">
            <IngredientsCard data={ingredientsTableData} />
            <RecipeNutrition data={nutritionData} />
          </div>
        </div>
      </div>
    </div>
  )
}
