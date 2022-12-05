import { Recipe } from '@prisma/client'
import { json, LoaderFunction, MetaFunction } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import CardGrid from '~/components/card/card-grid'
import DropdownMenu from '~/components/drop-down-menu'
import SearchBar from '~/components/search-bar'
import { metaTitlePostfix } from '~/root'
import { db } from '~/utils/db.server'
import { mockCardGridData } from '.'

type LoaderData = string[] | null

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Favorite' + metaTitlePostfix,
})

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const param = url.searchParams.get('search') ?? ''
  const favorite = await db.recipe.findMany({
    where: {
      AND: [
        { title: { contains: param } },
        { favorite: { some: { userId: 'testuser0' } } },
      ],
    },
    take: 10,
  })
  const list = favorite.map(recipe => recipe.title)
  return json(list)
}

export default function Favorite(): JSX.Element {
  const data = useLoaderData() as LoaderData
  const fetcher = useFetcher()
  return (
    <div className="layout-pt layout-px flex flex-col gap-9">
      <div className="flex justify-center gap-6">
        <SearchBar
          placeholder="Favorite Search"
          list={data}
          fetch={inputValue => {
            fetcher.load(`/favorite?search=${inputValue}`)
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
      <CardGrid data={mockCardGridData} />
    </div>
  )
}
