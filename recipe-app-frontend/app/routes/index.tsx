import { Prisma, Recipe } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import CardGrid from '~/components/card/card-grid'
import DropdownMenu from '~/components/drop-down-menu'
import SearchBar from '~/components/search-bar'
import {
  getAllRecipes,
  getLiked,
  recipesListData,
} from '~/lib/loaders/query-card-list'
import { db } from '~/utils/db.server'
import { getUserId } from '~/utils/session.server'
import { searchAllRecipes } from '../lib/loaders/search-recipes.server'

type LoaderData = {
  searcheRes: Awaited<ReturnType<typeof searchAllRecipes>>
  allRecipe: (Prisma.RecipeGetPayload<typeof recipesListData> & {
    isLiked: boolean
  })[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const searchRes = await searchAllRecipes(request)
  const userId = await getUserId(request)
  const allRecipe = await getAllRecipes()
  if (!userId) {
    return json({ searchRes, allRecipe })
  }

  const allRecipeWithLiked = await getLiked(userId, allRecipe)

  return json({ searchRes, allRecipe: allRecipeWithLiked })
}

export default function Index() {
  const data = useLoaderData() as LoaderData
  const fetcher = useFetcher<LoaderData>()
  const [resList, setResList] = useState<LoaderData['searcheRes']>([])
  useEffect(() => {
    if (fetcher.data?.searcheRes) {
      setResList(fetcher.data.searcheRes)
    }
  }, [fetcher.data?.searcheRes])
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
          summary="New"
          details={<span>Popular</span>}
          hasDownArrow
        />
        <DropdownMenu
          summary="Filter"
          details={<div>filter checkbox</div>}
          icon={<span className="material-symbols-rounded">tune</span>}
        />
      </div>

      <CardGrid data={data.allRecipe} />
    </div>
  )
}
