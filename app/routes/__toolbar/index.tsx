import { Recipe, User } from '@prisma/client'
import type { LoaderArgs, LoaderFunction, TypedResponse } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import CardGrid from '~/components/card/card-grid'
import DropdownMenu from '~/components/drop-down-menu'
import SearchBar from '~/components/search-bar'
import {
  getAllRecipes,
  getLikedAndBasket,
  getThumbnails,
  getThumbnailAndLikeAndBasket,
} from '~/lib/loaders/query-card-list'
import { badRequest } from '~/utils/request.server'
import { getUserId } from '~/utils/session.server'
import { searchAllRecipes } from '~/lib/loaders/search-recipes.server'

// export interface CardListLoaderData {
//   searcheRes: Awaited<ReturnType<typeof searchAllRecipes>>
//   allRecipes: (Recipe & { isLiked: boolean; isInBasket: boolean; likesNum: number; basketsNum: number; author: User; })[]
// }

export const loader = async ({ request }: LoaderArgs) => {
  const searchRes = await searchAllRecipes(request)
  const userId = await getUserId(request)
  const recipeOrder = new URL(request.url).searchParams.get('orderby') as
    | 'new'
    | 'popular'
    | null
  const allRecipes = await getAllRecipes({ orderBy: recipeOrder })

  const withThumbnail = await getThumbnails(allRecipes)
  const mappedRecipes = withThumbnail.map(recipe => ({
    ...recipe,
    isLiked: !!recipe.favorite.find(e => e.userId === userId),
    isInBasket: !!recipe.baskets.find(e => e.userId === userId),
  }))

  return json({ searchRes, allRecipes: mappedRecipes })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof loader>()
  const [resList, setResList] = useState<typeof data['searchRes']>([])
  const [recipeList, setRecipeList] = useState(data.allRecipes)
  const [listOrder, setListOrder] = useState<'New' | 'Popular'>('New')

  useEffect(() => {
    if (fetcher.data?.searchRes) {
      setResList(fetcher.data.searchRes)
    }
  }, [fetcher.data?.searchRes])

  useEffect(() => {
    if (fetcher.data?.allRecipes) {
      setRecipeList(fetcher.data.allRecipes)
    } else {
      setRecipeList(data.allRecipes)
    }
  }, [fetcher.data?.allRecipes, data.allRecipes])

  return (
    <div className="layout-pt layout-px flex flex-col gap-9">
      <div className="flex justify-center gap-6">
        <SearchBar
          list={resList?.map(item => ({ value: item.title, id: item.id }))}
          fetch={inputValue => {
            fetcher.load(`/?index&search=${inputValue}`)
          }}
        />
        <DropdownMenu
          summary={listOrder}
          details={
            <ul>
              <li
                className={`drop-down-item ${
                  listOrder === 'New'
                    ? 'bg-primary text-black dark:bg-primary-dark dark:text-gray-200'
                    : ''
                }`}
                onClick={() => {
                  setListOrder('New')
                  fetcher.load(`/?index&orderby=new`)
                }}
              >
                New
              </li>
              <li
                className={`drop-down-item ${
                  listOrder === 'Popular'
                    ? 'bg-primary text-black dark:bg-primary-dark dark:text-gray-200'
                    : ''
                }`}
                onClick={() => {
                  setListOrder('Popular')
                  fetcher.load(`/?index&orderby=popular`)
                }}
              >
                Popular
              </li>
            </ul>
          }
          hasDownArrow
        />
        {/* <DropdownMenu
          summary="Filter"
          details={
            <ul>

            <li>filter checkbox</li>
            <li>filter checkbox</li>
            </ul>
          }
          icon={<span className="material-symbols-rounded">tune</span>}
        /> */}
      </div>

      <CardGrid
        data={recipeList.map(recipe => ({
          id: recipe.id,
          thumbnail: recipe.thumbnail.jpgSrc,
          author: recipe.author.name ?? recipe.author.email.split('@')[0],
          title: recipe.title,
          isLiked: recipe.isLiked,
          isInBasket: recipe.isInBasket,
          favCounts: recipe.likesNum,
          basketCounts: recipe.basketsNum,
        }))}
      />
    </div>
  )
}
