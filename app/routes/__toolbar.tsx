import { Outlet, useLoaderData } from '@remix-run/react'
import { json, LoaderArgs } from '@remix-run/server-runtime'
import { ReactNode, useContext } from 'react'
import Toolbar from '~/components/layout/toolbar'
import { SiderContext } from '~/components/sider/sider-context'
import { db } from '~/utils/db.server'
import { getUserId } from '~/utils/session.server'

const LayoutChildren = ({ children }: { children: ReactNode }) => {
  const { close, hidden } = useContext(SiderContext)
  return (
    <div
      className={`min-h-screen flex-1   ${
        close || hidden ? '' : 'pl-[255px]'
      } ${hidden ? '' : 'pt-16'} `}
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
    select: { recipes: { select: { id: true, title: true } } },
  })

  return json({ basket })
}

export default function ToolbarRoute() {
  const data = useLoaderData<typeof loader>()
  return (
    <>
      <Toolbar basketData={data.basket?.recipes} />
      <LayoutChildren>
        <Outlet />
      </LayoutChildren>
    </>
  )
}
