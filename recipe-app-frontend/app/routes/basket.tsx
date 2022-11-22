import {
  Basket,
  Ingredient,
  NumIngredientOnRecipe,
  Recipe,
} from '@prisma/client'
import { ActionFunction, LoaderFunction } from '@remix-run/node'
import { useFetcher, useLoaderData, useSubmit } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import BasketTable from '~/components/basket-table'
import CardGrid from '~/components/card/card-grid'
import CardListItem from '~/components/card/card-list-item'
import ContentCard from '~/components/card/content-card'
import DropdownMenu from '~/components/drop-down-menu'
import SearchBar from '~/components/search-bar'
import { db } from '~/utils/db.server'
import { mockCardGridData } from '.'

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
  list: Recipe[]
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
  let ingredients: (NumIngredientOnRecipe & {
    ingredient: Ingredient
  })[] = []
  basket?.recipes.forEach(({ ingredientsNum }) => {
    const foundIng = ingredients.find(
      ({ ingredientId }) => ingredientId === ingredientsNum[0].ingredientId,
    )
    if (foundIng) {
      foundIng.value += ingredientsNum[0].value
    } else {
      ingredients = ingredients.concat(ingredientsNum)
    }
  })

  const url = new URL(request.url)
  const query = url.searchParams.get('search') ?? ''
  let res
  if (query.length === 0) {
    res = [null]
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
    res = recipes
  }

  const list = res.map(v => {
    if (v === null) return v
    return v.title
  })

  return { basket, ingredients, list }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const id = form.get('delete')
  console.log(id)
  if (id) {
    await db.basket.update({
      where: { id: 'testbasket0' },
      data: { recipes: { disconnect: { id: id.toString() } } },
    })
  }
  return null
}

export default function BasketIndex(): JSX.Element {
  const data = useLoaderData<LoaderData>()

  const fetcher = useFetcher<LoaderData>()
  const submit = useSubmit()
  const [searchValue, setSearchValue] = useState('')
  const [searchList, setSearchList] = useState<Recipe[]>([])
  const onSearch = (inputValue: string) => {
    // setSearchValue(inputValue)
    fetcher.load(`/basket?search=${inputValue}`)
  }

  // useEffect(() => {
  //   if (searchValue.length === 0) {
  //     return
  //   }
  //   const timeOut = setTimeout(() => {
  //   }, 200)

  //   return () => {
  //     clearTimeout(timeOut)
  //   }
  // }, [searchValue])

  useEffect(() => {
    console.log(fetcher.data?.list)
    if (fetcher.data?.list) {
      setSearchList(fetcher.data.list)
    }
  }, [fetcher.data?.list])

  return (
    <div className="layout-py layout-px">
      <div className="max-w-6xl mx-auto grid [grid-template-areas:'header_header''ingredients_sideList'] grid-rows-[auto,1fr] grid-cols-[2fr,1fr] gap-6">
        {/* <ContentCard className="[grid-area:header] text-black font-semibold"> */}
        <h2>Basket</h2>
        {/* </ContentCard> */}
        <div className="[grid-area:ingredients] ">
          {/* --- table --- */}
          <ContentCard>
            <BasketTable data={data?.ingredients} />
          </ContentCard>
          {/* --- /table --- */}
        </div>
        <ContentCard className="[grid-area:sideList] flex flex-col gap-8 h-full ">
          <SearchBar
            placeholder="Basket Search"
            border
            fetch={onSearch}
            list={searchList}
          />
          <div>
            <h4 className="mb-4 font-bold text-black">Recipes in basket</h4>

            {data?.basket.recipes &&
              data?.basket.recipes.map(({ title, id }, idx) => {
                return (
                  <CardListItem
                    key={`${title}_${idx}`}
                    title={title}
                    recipeId={id}
                    onDelete={(e: React.FormEvent) => {
                      fetcher.submit(e.currentTarget as HTMLFormElement)
                    }}
                  />
                )
              })}
          </div>
        </ContentCard>
      </div>
    </div>
  )
}
