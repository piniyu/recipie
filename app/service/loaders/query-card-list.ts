import { Prisma, Recipe, Thumbnail } from '@prisma/client'
import { db } from '~/service/db.server'
import { getThumbnailPresignedUrl } from '../s3/s3.server'

export async function getLikedAndBasket({
  userId,
  recipes,
}: {
  userId: string | null
  recipes: (Prisma.RecipeGetPayload<typeof recipesListData> & Recipe)[]
}) {
  if (!userId)
    return recipes.map(recipe => {
      return {
        recipeId: recipe.id,
        isLiked: false,
        isInBasket: false,
      }
    })
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
      recipeId: recipe.id,
      isLiked: !!userFavs?.recipes.find(item => item.id === recipe.id),
      isInBasket: !!userBasket?.recipes.find(item => item.id === recipe.id),
    }
  })
}

export const recipesListData = Prisma.validator<Prisma.RecipeArgs>()({
  include: {
    favorite: { select: { userId: true } },
    baskets: { select: { userId: true } },
    author: true,
    thumbnail: true,
  },
})

export const getThumbnailAndLikeAndBasket = async (
  recipes: (Recipe & Prisma.RecipeGetPayload<typeof recipesListData>)[],
  userId: string | null,
) => {
  const recipesWithThumbnails = await getThumbnails(
    recipes.map(e => ({
      recipeId: e.id,
      thumbnails3Key: e.thumbnail?.s3Key ?? '',
    })),
  )

  if (!userId) {
    return recipesWithThumbnails?.map(recipe => ({
      ...recipe,
      isLiked: false,
      isInBasket: false,
    }))
  }

  const withLikedAndBasket = await getLikedAndBasket({
    userId,
    recipes: recipes,
  })

  return withLikedAndBasket
}

export const getAllRecipes = async ({
  take = 20,
  orderBy = 'new',
}: {
  take?: number
  orderBy?: 'new' | 'popular' | null
}) => {
  const recipes = await db.recipe.findMany({
    take: take,
    ...recipesListData,
    orderBy:
      orderBy === 'popular' ? { likesNum: 'desc' } : { updatedAt: 'desc' },
  })

  return recipes
}

export const getFavRecipes = async ({
  userId,
  orderBy = 'new',
}: {
  userId: string
  orderBy?: 'new' | 'popular' | null
}) => {
  return await db.recipe.findMany({
    where: {
      favorite: { some: { userId } },
    },
    ...recipesListData,
    take: 20,
    orderBy:
      orderBy === 'popular' ? { likesNum: 'desc' } : { updatedAt: 'desc' },
  })
}

export const getMyRecipes = async ({
  userId,
  orderBy = 'new',
}: {
  userId: string
  orderBy?: 'new' | 'popular' | null
}) => {
  return await db.recipe.findMany({
    where: { authorId: userId },
    ...recipesListData,
    take: 20,
    orderBy:
      orderBy === 'popular' ? { likesNum: 'desc' } : { updatedAt: 'desc' },
  })
}

export const getThumbnails = async (
  queryList: { recipeId: string; thumbnails3Key: string }[] | undefined,
) => {
  if (!queryList) {
    return null
  }

  const thumbnails = await Promise.allSettled(
    queryList.map(e => {
      if (e.thumbnails3Key) {
        return getThumbnailPresignedUrl(e.thumbnails3Key, e.recipeId, 'jpg')
      }
    }),
  )

  const thumbnailsData = thumbnails.map(thumbnail => {
    if (thumbnail.status === 'rejected') return null
    return thumbnail.value
  })

  return queryList.map(e => {
    return {
      ...e,
      thumbnail: {
        recipeId: e.recipeId,
        jpgSrc:
          thumbnailsData.find(
            thumbnail =>
              thumbnail?.recipeId === e.recipeId && thumbnail?.type === 'jpg',
          )?.preSignedUrl ?? '',
      },
    }
  })
}
export const getBigThumbnails = async <
  T extends Recipe & { thumbnail: Thumbnail | null },
>(
  recipes: T[],
) => {
  const thumbnails = await Promise.allSettled(
    recipes.map(recipe => {
      if (recipe.thumbnail) {
        return getThumbnailPresignedUrl(
          recipe.thumbnail.s3Key,
          recipe.id,
          'jpg',
        )
      }
    }),
  )

  const thumbnailsData = thumbnails.map(thumbnail => {
    if (thumbnail.status === 'rejected') return null
    return thumbnail.value
  })

  return recipes.map(recipe => {
    return {
      ...recipe,
      thumbnail: {
        id: recipe.thumbnail?.id ?? '',
        recipeId: recipe.id,
        jpgSrc:
          thumbnailsData.find(
            thumbnail =>
              thumbnail?.recipeId === recipe.id && thumbnail.type === 'jpg',
          )?.preSignedUrl ?? '',
      },
    }
  })
}
