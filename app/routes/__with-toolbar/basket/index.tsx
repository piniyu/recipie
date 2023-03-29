import { Basket, Ingredient, NumIngredientOnRecipe } from '@prisma/client'
import { ActionFunction, json, LoaderArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/configure-store'
import {
  addIngredient,
  addRecipeId,
  deleteRecipeId,
} from '../../../store/ingredients-slice'
import {
  addRecipeServings,
  deleteRecipeServings,
} from '../../../store/recipe-servings-slice'
import RecipeServingsForm from '~/pages/basket/recipe-servings-form'
import CardListItem from '~/components/ui/card/card-list-item'
import { db } from '~/service/db.server'
import { getThumbnails } from '~/service/loaders/query-card-list'

type LoaderData = {
  basket: Basket & {
    recipes: {
      title: string
      id: string
      ingredientsNum: (NumIngredientOnRecipe & {
        ingredient: Ingredient
      })[]
    }[]
  }
  ingredients: (NumIngredientOnRecipe & {
    ingredient: Ingredient
  })[]
  list: string[]
} | null

export const loader = async ({ request }: LoaderArgs) => {
  const basket = await db.basket.findFirst({
    where: { userId: 'testuser0' },
    include: {
      recipes: {
        select: {
          title: true,
          id: true,
          ingredientsNum: { include: { ingredient: true } },
          thumbnail: true,
        },
      },
    },
  })

  const withThumbnail = await getThumbnails(
    basket?.recipes.map(e => ({
      recipeId: e.id,
      thumbnails3Key: e.thumbnail?.s3Key ?? '',
    })),
  )
  const mappedBasket = {
    ...basket,
    recipes: basket?.recipes.map(e => ({
      ...e,
      thumbnail: {
        ...e.thumbnail,
        url:
          withThumbnail?.find(el => el.recipeId === e.id)?.thumbnail.url ??
          null,
      },
    })),
  }

  return json(
    { basket: mappedBasket },
    { headers: { 'Cache-Control': 'max-age=3600' } },
  )
}
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const id = form.get('deleteId')
  if (id) {
    await db.basket.update({
      where: { id: 'testbasket0' },
      data: { recipes: { disconnect: { id: id.toString() } } },
    })
  }
  return json({})
}

export default function BasketSidePanel() {
  const data = useLoaderData<typeof loader>()
  const fetcher = useFetcher<LoaderData>()
  const servings = useAppSelector(state => state.recipeServings)
  const dispatch = useAppDispatch()

  const onDelete = (
    e: React.FormEvent,
    id: string,
    ingredientsNum: (NumIngredientOnRecipe & {
      ingredient: Ingredient
    })[],
  ) => {
    ingredientsNum.forEach(item => {
      dispatch(
        deleteRecipeId({
          name: item.ingredient.name,
          recipeId: id,
        }),
      )
    })
    dispatch(deleteRecipeServings({ recipeId: id }))
    fetcher.submit(e.currentTarget as HTMLFormElement, {
      action: '/basket?index',
    })
  }

  useEffect(() => {
    data?.basket.recipes?.forEach(({ id, ingredientsNum }) => {
      dispatch(addRecipeServings({ recipeId: id, servings: 1 }))
      ingredientsNum.forEach(({ ingredient }) => {
        dispatch(
          addIngredient({ name: ingredient.name, recipeIds: [id], hadQant: 0 }),
        )
        dispatch(addRecipeId({ name: ingredient.name, recipeId: id }))
      })
    })
  }, [data?.basket.recipes, dispatch])

  return (
    <>
      <div>
        <h4 className="mb-4 text-lg font-bold text-inherit">
          Recipes in basket
        </h4>

        {data?.basket?.recipes &&
          data?.basket.recipes.map(
            ({ title, id, ingredientsNum, thumbnail }, idx) => {
              return (
                <CardListItem
                  key={`${title}_${idx}`}
                  title={title}
                  recipeId={id}
                  imgSrc={thumbnail.url ?? ''}
                  onDelete={e => onDelete(e, id, ingredientsNum)}
                  subTitle={
                    <RecipeServingsForm
                      recipeId={id}
                      defaultValue={
                        servings.find(item => item.recipeId === id)?.servings
                      }
                    />
                  }
                />
              )
            },
          )}
      </div>
    </>
  )
}
