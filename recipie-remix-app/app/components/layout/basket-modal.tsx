import { useFetcher, useSubmit } from '@remix-run/react'
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
  basketData: { id: string; title: string }[] | undefined | null
}) {
  const recipes = useAppSelector(state => state.recipeServings)
  const submit = useSubmit()
  return (
    <Modal
      dialogClassName="mt-20 backdrop:bg-gray-900/30 "
      className="max-w-3xl w-[60vw] max-h-[70vh] p-8 rounded-2xl space-y-6 overflow-auto overscroll-contain"
      open={open}
      onClose={() => onClose()}
    >
      <h2>Basket</h2>
      {basketData?.length === 0 ? (
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
