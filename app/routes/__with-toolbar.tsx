import { Outlet, useLoaderData } from '@remix-run/react'
import { json, LoaderArgs } from '@remix-run/server-runtime'
import { ReactNode } from 'react'
import { getThumbnails } from '~/service/loaders/query-card-list'
import { db } from '~/service/db.server'
import { getUserId } from '~/service/session.server'
import Toolbar from '~/components/ui/toolbar'
import { useAppSelector } from '~/store/configure-store'

const LayoutChildren = ({ children }: { children: ReactNode }) => {
  const siderState = useAppSelector(s => s.sider)
  return (
    <div
      className={`min-h-screen w-screen flex-1 ${
        !siderState.open || siderState.hidden ? '' : 'lg:pl-[255px] '
      } ${siderState.hidden ? '' : 'pt-16'} `}
    >
      {children}
    </div>
  )
}

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request)
  if (!userId) return json({ basket: null })
  const basket = await db.basket.findFirst({
    where: { userId },
    select: { recipes: { select: { id: true, title: true, thumbnail: true } } },
  })

  const thumbnails = await getThumbnails(
    basket?.recipes.map(e => ({
      recipeId: e.id,
      thumbnails3Key: e.thumbnail?.s3Key ?? '',
    })),
  )
  const mappedBasket = basket?.recipes.map(e => ({
    ...e,
    thumbnail: thumbnails?.find(e => e.thumbnail)?.thumbnail,
  }))

  return json({ basket: mappedBasket })
}

export default function ToolbarRoute() {
  const data = useLoaderData<typeof loader>()
  return (
    <>
      <Toolbar
        basketData={data.basket?.map(e => ({
          id: e.id,
          title: e.title,
          thumbnailSrc: e.thumbnail?.url ?? '',
        }))}
      />
      <LayoutChildren>
        <Outlet />
      </LayoutChildren>
    </>
  )
}
