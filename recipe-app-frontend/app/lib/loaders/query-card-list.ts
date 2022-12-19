import { Prisma } from '@prisma/client'
import { db } from '~/utils/db.server'

export async function getLikedAndBasket({
  userId,
  recipes,
}: {
  userId: string
  recipes: Prisma.RecipeGetPayload<typeof recipesListData>[]
}) {
  const userFavs = await db.favorite.findFirst({
    where: { userId },
    select: { recipes: { select: { id: true } } },
  })
  const userBasket = await db.basket.findFirst({
    where: { userId },
    select: { recipes: { select: { id: true } } },
  })
  return recipes.map(recipe => {
    return {
      ...recipe,
      isLiked: !!userFavs?.recipes.find(item => item.id === recipe.id),
      isInBasket: !!userBasket?.recipes.find(item => item.id === recipe.id),
    }
  })
}

export const recipesListData = Prisma.validator<Prisma.RecipeArgs>()({
  select: {
    title: true,
    id: true,
    favorite: { include: { user: { select: { id: true } } } },
    baskets: true,
    author: true,
  },
})

export async function getAllRecipes(take?: number) {
  return await db.recipe.findMany({
    take: take ?? 20,
    ...recipesListData,
  })
}

export async function getFavRecipes(userId: string) {
  return await db.recipe.findMany({
    where: {
      favorite: { some: { userId } },
    },
    ...recipesListData,
    take: 20,
  })
}
