import {
  Basket,
  Ingredient,
  NumIngredientOnRecipe,
  Recipe,
} from '@prisma/client'
import { ActionFunction, json, LoaderFunction } from '@remix-run/node'
import { useFetcher, useLoaderData, useTransition } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/configure-store'
import {
  addIngredient,
  addRecipeId,
  deleteRecipeId,
} from 'store/ingredients-slice'
import {
  addRecipeServings,
  deleteRecipeServings,
} from 'store/recipe-servings-slice'
import ServingsForm from '~/components/basket/servings-form'
import CardListItem from '~/components/card/card-list-item'
import SearchBar from '~/components/search-bar'
import { db } from '~/utils/db.server'

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

export const loader: LoaderFunction = async ({ request }) => {
  const basket = await db.basket.findUnique({
    where: { userId: 'testuser0' },
    include: {
      recipes: {
        select: {
          title: true,
          id: true,
          ingredientsNum: { include: { ingredient: true } },
        },
      },
    },
  })

  const url = new URL(request.url)
  const query = url.searchParams.get('search') ?? ''
  const res = (async () => {
    if (query.length === 0) {
      return [null]
    } else {
      const recipes = await db.recipe.findMany({
        where: {
          AND: [
            { baskets: { some: { id: 'testbasket0' } } },
            { title: { contains: query } },
          ],
        },
        take: 10,
      })
      return recipes
    }
  })()

  const list = (await res).map(v => {
    if (v === null) return v
    return v.title
  })

  return { basket, list }
}
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const id = form.get('delete')
  if (id) {
    await db.basket.update({
      where: { id: 'testbasket0' },
      data: { recipes: { disconnect: { id: id.toString() } } },
    })
  }
  return json({})
}

export default function BasketSidePanel() {
  const data = useLoaderData<LoaderData>()
  const fetcher = useFetcher<LoaderData>()
  const servings = useAppSelector(state => state.recipeServings)
  const dispatch = useAppDispatch()
  const [resList, setResList] = useState<string[] | null>(null)

  useEffect(() => {
    data?.basket.recipes.forEach(({ id, ingredientsNum }) => {
      dispatch(addRecipeServings({ recipeId: id, servings: 1 }))
      ingredientsNum.forEach(({ ingredient }) => {
        dispatch(
          addIngredient({ name: ingredient.name, recipeIds: [id], hadQant: 0 }),
        )
        dispatch(addRecipeId({ name: ingredient.name, recipeId: id }))
      })
    })
  }, [data?.basket.recipes, dispatch])

  const onSearch = (inputValue: string) => {
    fetcher.load(`/basket?index&search=${inputValue}`)
  }

  useEffect(() => {
    if (fetcher.data?.list) {
      setResList(fetcher.data.list)
    }
  }, [fetcher.data?.list])

  return (
    <>
      <SearchBar
        placeholder="Basket Search"
        border
        fetch={onSearch}
        list={resList}
      />
      <div>
        <h4 className="mb-4 font-bold text-black">Recipes in basket</h4>

        {data?.basket.recipes &&
          data?.basket.recipes.map(({ title, id, ingredientsNum }, idx) => {
            return (
              <CardListItem
                key={`${title}_${idx}`}
                title={title}
                recipeId={id}
                onDelete={(e: React.FormEvent) => {
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
                }}
                subTitle={
                  <ServingsForm
                    recipeId={id}
                    ingredients={ingredientsNum}
                    defaultValue={
                      servings.find(item => item.recipeId === id)?.servings
                    }
                  />
                }
              />
            )
          })}
      </div>
    </>
  )
}
