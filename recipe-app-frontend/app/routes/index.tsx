import type { Recipe } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import CardGrid from '~/components/card/card-grid'
import DropdownMenu from '~/components/drop-down-menu'
import SearchBar from '~/components/search-bar'
import { db } from '~/utils/db.server'

export const mockCardGridData = [
  { title: 'Korean noodles', favCounts: 32, basCounts: 21, user: 'User Name' },
  { title: 'Korean noodles', favCounts: 32, basCounts: 21, user: 'User Name' },
  { title: 'Korean noodles', favCounts: 32, basCounts: 21, user: 'User Name' },
  { title: 'Korean noodles', favCounts: 32, basCounts: 21, user: 'User Name' },
]

type LoaderData = { recipes: Recipe[] | null; list: string[] | null }

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const param = url.searchParams.get('search') ?? ''
  const recipes = await db.recipe.findMany({
    where: {
      title: { contains: param },
    },
    take: 10,
  })
  const list = recipes.map(recipe => recipe.title)
  if (param.length === 0) {
    return json({ list: [], recipes })
  }

  return json({ list, recipes })
}

export default function Index() {
  // const userName = 'user name'
  const data = useLoaderData() as LoaderData
  const fetcher = useFetcher<LoaderData>()
  const [resList, setResList] = useState<LoaderData['list'] | null>([])

  useEffect(() => {
    if (fetcher.data?.list) {
      console.log(fetcher.data.list)
      setResList(fetcher.data.list)
    }
  }, [fetcher.data?.list])
  return (
    <div className="layout-pt layout-px flex flex-col gap-9">
      <div className="flex justify-center gap-6">
        <SearchBar
          list={resList}
          fetch={inputValue => {
            fetcher.load(`/?index&search=${inputValue}`)
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
      <CardGrid data={mockCardGridData} />
    </div>
  )
}
