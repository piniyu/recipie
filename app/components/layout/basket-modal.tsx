import { useFetcher, useMatches, useSubmit } from '@remix-run/react'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/configure-store'
import RecipeServingsForm from '../basket/recipe-servings-form'
import CardListItem from '../card/card-list-item'
import Modal from './modal'

export default function BasketModal({
  open,
  onClose,
  basketData,
}: {
  open: boolean
  onClose: () => void
  basketData: { id: string; title: string }[] | null | undefined
}) {
  const recipes = useAppSelector(state => state.recipeServings)
  const submit = useSubmit()
  const matches = useMatches()
  // const basketData = matches.find(match => match.id === 'root')?.data.basket
  //   .recipes as { id: string; title: string }[] | undefined | null
  // // return null
  // if (basketData === null || basketData === undefined) {
  //   return null
  // }

  return (
    <Modal
      dialogClassName="mt-20  "
      className="max-h-[70vh] w-[60vw] max-w-3xl space-y-6 overflow-auto overscroll-contain rounded-2xl p-8"
      open={open}
      onClose={() => onClose()}
    >
      <h2>Basket</h2>
      {basketData && basketData?.length === 0 ? (
        <div className="text-gray-400">Basket is empty</div>
      ) : (
        basketData?.map(({ id, title }) => (
          <CardListItem
            key={id}
            title={title}
            recipeId={id}
            onDelete={e =>
              submit(e.currentTarget as HTMLFormElement, {
                replace: true,
                // action: '/api/basket/delete-recipe',
              })
            }
            subTitle={
              <RecipeServingsForm
                recipeId={id}
                defaultValue={
                  recipes.find(item => id === item.recipeId)?.servings
                }
              />
            }
          />
        ))
      )}
    </Modal>
  )
}
