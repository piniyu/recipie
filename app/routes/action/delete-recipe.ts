import type { ActionFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { db } from '~/service/db.server'

export const deleteRecipe: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const recipeId = formData.get('deleteId')
  const redirectTo = formData.get('redirectTo')

  if (typeof redirectTo !== 'string' || typeof recipeId !== 'string') {
    return json({ formError: `Form not submitted` }, { status: 400 })
  }

  await db.basket.update({
    where: { userId: 'testuser0' },
    data: { recipes: { disconnect: { id: recipeId } } },
  })

  return redirect(redirectTo)
}
