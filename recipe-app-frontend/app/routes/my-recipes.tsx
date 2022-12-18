import React, { useEffect, useState } from 'react'
import { json, LoaderFunction } from '@remix-run/node'
import { db } from '../utils/db.server'
import { requireUserId } from '../utils/session.server'
import CardGrid from '../components/card/card-grid'
import DropdownMenu from '../components/drop-down-menu'
import SearchBar from '../components/search-bar'
import { Prisma } from '@prisma/client'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { searchUserRecipes } from '~/lib/loaders/search-recipes.server'
import { recipesListData } from '~/lib/loaders/query-card-list'

type LoaderData = {
  myRecipes: (Prisma.RecipeGetPayload<typeof recipesListData> & {
    isLiked: boolean
  })[]
  searchRes: Awaited<ReturnType<typeof searchUserRecipes>>
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const searchRes = await searchUserRecipes(request, userId)
  const myRecipes = await db.recipe.findMany({
    where: { authorId: userId },
    ...recipesListData,
  })
  const mappedMyRecipes = myRecipes.map(recipe => ({
    ...recipe,
    isLiked: !!recipe.favorite.find(item => item.userId === userId),
  }))
  return json({ myRecipes, searchRes })
}

export default function MyRecipes() {
  const data = useLoaderData() as LoaderData
  const fetcher = useFetcher<LoaderData>()
  const [searchList, setSearchList] = useState<LoaderData['searchRes']>([])

  useEffect(() => {
    if (fetcher.data?.searchRes) {
      console.log(fetcher.data.searchRes)
      setSearchList(fetcher.data.searchRes)
    }
  }, [fetcher.data?.searchRes])

  return (
    <div className="layout-pt layout-px flex flex-col gap-9">
      <div className="flex justify-center gap-6">
        <SearchBar
          placeholder="My Recipes Search"
          list={searchList.map(item => ({ value: item.title, id: item.id }))}
          fetch={inputValue => {
            fetcher.load(`/my-recipes?search=${inputValue}`)
          }}
        />
        {/* </div> */}
        {/* <div className="flex space-x-6"> */}
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
      {/* <h1 className="[font-family:var(--font-ui)] font-bold text-black">Hi {userName}
        <br /> Share your amazing recipes with everyone now!</h1> */}
      {/* <div className='flex items-center'>
        <Icon className='flex-1 text-9xl' icon='emojione:pot-of-food' />
        <Icon className='flex-1 text-9xl' icon='emojione-v1:pot-of-food' />
        <Icon className='flex-1 text-9xl' icon='emojione:curry-rice' />
        <Icon className='flex-1 text-9xl' icon='noto-v1:curry-rice' />
        <Icon className='flex-1 text-9xl' icon='emojione-v1:hamburger' />
      </div> */}
      <CardGrid data={data.myRecipes} />
    </div>
  )
}
