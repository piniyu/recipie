import { useMatches, useSubmit } from '@remix-run/react'
import { useAppSelector } from '../../store/configure-store'
import RecipeServingsForm from '../../pages/basket/recipe-servings-form'
import CardListItem from './card/card-list-item'
import ContentCard from './card/content-card'
import Modal from './modal'

export default function BasketModal({
  open,
  onClose,
  basketData,
}: {
  open: boolean
  onClose: () => void
  basketData:
    | { id: string; title: string; thumbnailSrc: string }[]
    | null
    | undefined
}) {
  const recipes = useAppSelector(state => state.recipeServings)
  const submit = useSubmit()

  return (
    <Modal
      dialogClassName="mt-20  "
      className="max-h-[70vh] w-[90vw] max-w-3xl overflow-auto  overscroll-contain md:w-[60vw] "
      open={open}
      onClose={() => onClose()}
    >
      <ContentCard>
        <h2 className="mb-8">Basket</h2>
        {basketData && basketData?.length === 0 ? (
          <div className="text-gray-400">Basket is empty</div>
        ) : (
          basketData?.map(({ id, title, thumbnailSrc }) => (
            <CardListItem
              key={id}
              title={title}
              recipeId={id}
              imgSrc={thumbnailSrc}
              onDelete={e =>
                submit(e.currentTarget as HTMLFormElement, {
                  replace: true,
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
      </ContentCard>
    </Modal>
  )
}
