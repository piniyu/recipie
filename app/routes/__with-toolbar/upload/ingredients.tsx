import { Link } from '@remix-run/react'
import { ActionFunction } from '@remix-run/server-runtime'
import _ from 'lodash'
import { db } from '~/service/db.server'
import { badRequest } from '~/service/request.server'
import { IngredientsForm } from '~/pages/upload/ingredents/ingredients-form'

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData()
  const name = data.get('label')
  const ingredientId = data.get('value')

  if (
    !name ||
    !ingredientId ||
    typeof name !== 'string' ||
    typeof ingredientId !== 'string'
  )
    return badRequest({ message: 'lack of ingredientId or Name' })

  await db.ingredient.upsert({
    where: {
      name,
    },
    update: {},
    create: { id: ingredientId, name },
  })
  return null
}

export default function IngredientsPage(): JSX.Element {
  return (
    <div className="space-y-12">
      <h3 className="font-medium text-inherit">Ingredients</h3>
      <IngredientsForm />
      <div className="flex gap-4">
        <Link to="./details" className="btn-sm btn-gray">
          Previous
        </Link>
        <Link to="../1" className="btn-sm btn-primary">
          Next
        </Link>
      </div>
    </div>
  )
}
