import type { NutritionBarChartProps } from '~/pages/recipe/recipe-nutrition/nutrition-chart'
import RecipeHeader from '~/pages/recipe/recipe-header'
import IngredientsCard from '~/pages/recipe/recipe-ingredients'
import RecipeNutrition from '~/pages/recipe/recipe-nutrition'
import { json, LoaderArgs } from '@remix-run/node'
import { Prisma } from '@prisma/client'
import { db } from '~/service/db.server'
import { useLoaderData } from '@remix-run/react'
import { getBigThumbnails } from '~/service/loaders/query-card-list'
import { badRequest } from '~/service/request.server'
import { getUserId } from '~/service/session.server'

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
      name: 'Fiber',
      pct: 40,
      qat: { value: 13, mes: 'g' },
    },
  ],
]

const RecipeWithPayload = Prisma.validator<Prisma.RecipeInclude>()({
  ingredientsNum: { include: { ingredient: true } },
  thumbnail: true,
  favorite: { select: { userId: true } },
  baskets: { select: { userId: true } },
  author: true,
  tags: { include: { tag: { select: { name: true } } } },
})

export const loader = async ({ request, params }: LoaderArgs) => {
  const id = params.recipeId
  const userId = await getUserId(request)

  if (!id) {
    return badRequest('recipeId not exist')
  }

  const recipe = await db.recipe.findFirst({
    where: { id },
    include: RecipeWithPayload,
  })

  if (!recipe) return badRequest('recipe not found')

  const mappedRecipe = {
    ...recipe,
    isLiked: !!recipe.favorite.find(e => e.userId === userId),
    isInBasket: !!recipe.baskets.find(e => e.userId === userId),
  }
  const withThumbnail = await getBigThumbnails([mappedRecipe])

  return json(withThumbnail)
}

export default function RecipeIndex(): JSX.Element {
  const data = useLoaderData<typeof loader>()

  if (!data || typeof data === 'string') {
    return <div>Not found the recipe!</div>
  }

  const {
    thumbnail,
    title,
    createdAt,
    difficulty,
    author,
    ingredientsNum,
    id,
    tags,
    isLiked,
    isInBasket,
    serving,
    likesNum,
    basketsNum,
  } = data[0]

  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col">
      <div className="relative flex-1 ">
        <div className="layout-px layout-pt space-y-6 pb-8 lg:space-y-10">
          <RecipeHeader
            {...{
              recipeId: id,
              title,
              tags: tags.map(e => e.tag.name),
              createdAt,
              difficulty,
              authorName: author.name ?? author.email.split('@')[0],
              thumbnailSrc: thumbnail.jpgSrc,
              favCounts: likesNum,
              basketCounts: basketsNum,

              isLiked,
              isInBasket,
            }}
          />
          <div className="flex flex-col gap-6 text-black dark:text-gray-200 lg:flex-row lg:gap-10 ">
            <IngredientsCard data={ingredientsNum} defaultServings={serving} />
            <RecipeNutrition data={nutritionData} />
          </div>
        </div>
      </div>
    </div>
  )
}
