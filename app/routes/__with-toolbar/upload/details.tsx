import { Link } from '@remix-run/react'
import { ActionFunction } from '@remix-run/server-runtime'
import _ from 'lodash'
import { db } from '~/service/db.server'
import { DetailsForm } from '~/pages/upload/details/details-form'

export type ImgFormProp = {
  name: string
  src: string | null
  type: string
}

export const action: ActionFunction = async ({ request }) => {
  const formdata = await request.formData()
  const tagId = formdata.get('id')
  const tagName = formdata.get('name')

  if (typeof tagId !== 'string' || typeof tagName !== 'string') {
    throw new Error('type of tagId or tagName is not string')
  }

  await db.tag.upsert({
    where: { name: tagName },
    create: { id: tagId, name: tagName },
    update: {},
  })

  return null
}

export default function Details(): JSX.Element {
  return (
    <div className="space-y-12 ">
      <h3 className="font-medium ">Details</h3>
      <DetailsForm />
      <Link to="../ingredients" className="btn-sm btn-primary w-fit">
        Next
      </Link>
    </div>
  )
}
