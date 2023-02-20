import { PutObjectCommand } from '@aws-sdk/client-s3'
import {
  ActionFunction,
  ErrorBoundaryComponent,
  json,
  LoaderFunction,
  redirect,
} from '@remix-run/node'
import {
  Link,
  NavLink,
  Outlet,
  useFetcher,
  useNavigate,
  useParams,
} from '@remix-run/react'
import cuid from 'cuid'
import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContentCard from '~/components/card/content-card'
import { StepFormProps } from '~/components/step-form'
import { useAppDispatch, useAppSelector } from '~/store/configure-store'
import { resetDetails } from '~/store/upload-temp/details-form-slice'
import {
  IngredientsProps,
  resetIngredients,
} from '~/store/upload-temp/ingredients-form-slice'
import { resetPublish } from '~/store/upload-temp/publish-slice'
// import { IngredientsFormProps } from '~/store/upload-temp/ingredients-form-slice'
import {
  addStep,
  deleteStep,
  resetStep,
  StepFormState,
} from '~/store/upload-temp/step-form-slice'
import { db } from '~/utils/db.server'
import { s3 } from '~/utils/s3.server'
import { requireUserId } from '~/utils/session.server'
import { DetailsFormProps } from './upload/details'

type RecursiveNonNullable<T> = {
  [K in keyof T]: T[K] extends Object
    ? RecursiveNonNullable<T[K]>
    : NonNullable<T[K]>
}

const defaultSideList = [
  { value: 'Details', route: './details' },
  { value: 'Ingredients', route: './ingredients' },
]
const defaultStepList = [{ stepId: '1', value: `title`, route: `./1` }]

const SideList = ({
  route,
  value,
  idx,
  stepId,
  onDelete,
  disabledDelete,
}: {
  stepId?: string | undefined
  route?: string
  value: string
  idx: number
  onDelete?: (id: string) => void
  disabledDelete?: boolean
}) => {
  if (!route) {
    return (
      <li
        key={`${value}_${route}`}
        className="sider-item px-0 text-sm uppercase tracking-wider text-gray-400"
      >
        {value}
      </li>
    )
  }
  return (
    <li key={`${value}_${idx}`} className="relative flex">
      <NavLink
        to={route}
        className={({ isActive }) => `
                        sider-item 
                        sider-item-gray 
                      ${
                        isActive
                          ? 'bg-primary/10 dark:bg-primary-dark/40'
                          : 'text-inherit'
                      }
                      `}
      >
        {stepId ? idx + 1 + ' . ' : null}
        {value}
      </NavLink>
      {onDelete && stepId ? (
        <button
          className={`icon-btn-ui absolute right-8 top-2 z-50 flex h-fit rounded-full p-1 text-red-400 hover:bg-red-500 hover:text-white disabled:text-gray-200 hover:disabled:bg-transparent hover:disabled:text-gray-200 dark:hover:bg-red-400 dark:hover:text-gray-200
          dark:disabled:text-gray-600 dark:disabled:hover:bg-transparent
          `}
          onClick={() => {
            // e.stopPropagation()
            onDelete(stepId)
          }}
          disabled={disabledDelete}
        >
          <span
            className="material-symbols-outlined leading-none "
            style={{ fontVariationSettings: '"GRAD" -25' }}
          >
            delete
          </span>
        </button>
      ) : null}
    </li>
  )
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  return json({ userId })
}

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const formdata = await request.formData()
  const detailsData = JSON.parse(
    (formdata.get('detailData') as string) ?? '',
  ) as DetailsFormProps
  const ingredientsData = JSON.parse(
    (formdata.get('ingredientsData') as string) ?? '',
  ) as IngredientsProps
  const stepsData = JSON.parse(
    formdata.get('stepsData') as string,
  ) as RecursiveNonNullable<StepFormState>[]

  try {
    if (
      !ingredientsData.ingredients.every(e => e.name && e.qty > 0 && e.unit)
    ) {
      throw new Error('ingredients field is lack of name, qty or unit')
    }
    if (!detailsData.thumbnail || !detailsData.thumbnail.src) {
      throw new Error('thumbnail is null')
    }
    if (!stepsData.some(e => e.photo?.src || e.photo === null)) {
      throw new Error('some step photos are missing')
    }

    const createRecipe = async () => {
      const recipeData = await db.recipe.create({
        data: {
          title: detailsData.title,
          authorId: userId,
          difficulty: detailsData.difficulty,
          serving: ingredientsData.servings,
          tags: { create: detailsData.tags?.map(e => ({ tagId: e.value })) },
          ingredientsNum: {
            create: ingredientsData.ingredients.map(ingredient => ({
              ingredientId: ingredient.name?.value ?? cuid(),

              unit: ingredient.unit?.value ?? '',
              value: ingredient.qty.toString(),
            })),
          },
        },
      })

      // await db.ingredient.deleteMany({
      //   where: {
      //     onRecipes: { none: {} },
      //   },
      // })
      return recipeData
    }

    const thumbnailBuf = Buffer.from(
      detailsData.thumbnail.src.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    )
    const stepPhotoBufs = stepsData.map(e => {
      return Buffer.from(e.photo.src.replace(/^data:image\/\w+;base64,/, ''))
    })

    const uploadThumbnail = async () => {
      const temperaryKey = cuid()
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: detailsData.thumbnail?.name ?? temperaryKey,
          Body: thumbnailBuf,
          ContentType: 'image/jpeg',
          ContentEncoding: 'base64',
        }),
      )
      return detailsData.thumbnail?.name ?? temperaryKey
    }

    const uploadStepImgs = stepPhotoBufs.map(async (e, i) => {
      const temperaryKey = cuid()
      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: stepsData[i].photo.name ?? temperaryKey,
          Body: e,
          ContentEncoding: 'base64',
          ContentType: 'image/jpeg',
        }),
      )
      return stepsData[i].photo.name ?? temperaryKey
    })

    const [recipeData, thumbnailKey, ...stepKeys] = await Promise.all([
      createRecipe(),
      uploadThumbnail(),
      ...uploadStepImgs,
    ])

    await db.thumbnail.upsert({
      where: { recipeId: recipeData.id },
      create: { recipeId: recipeData.id, s3Key: thumbnailKey },
      update: {},
    })

    await db.instruction.createMany({
      data: stepKeys.map((e, i) => ({
        recipeId: recipeData.id,
        step: i + 1,
        photo: e,
        methods: stepsData[i].methods.map(item => item.content),
        title: stepsData[i].title,
      })),
    })

    /** TODO:update ingredients and basketnum favnum */

    return redirect(`/recipe/${recipeData.id}`)
  } catch (err) {
    console.log(err)
    throw err
  }

  // console.log(detailsData)
}

export default function Upload(): JSX.Element {
  const { stepIdx } = useParams()
  const stepForms = useAppSelector(state => state.stepForm)
  const detailFormData = useAppSelector(state => state.detailsForm)
  const ingredientsFormData = useAppSelector(state => state.ingredientsForm)
  const stepsFormData = useAppSelector(state => state.stepForm)
  const publishState = useAppSelector(state => state.publishState)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const fetcher = useFetcher()

  return (
    <div className="layout-px mx-auto flex  flex-1 flex-col gap-y-6 pt-8 pb-16">
      <header className="flex items-center justify-between">
        <h2>Upload Recipe</h2>
        <button
          className="btn-secondary btn-sm disabled:cursor-not-allowed"
          type="submit"
          disabled={
            !publishState.details ||
            !publishState.ingredients ||
            !publishState.steps
          }
          onClick={() => {
            fetcher.submit(
              {
                detailData: JSON.stringify(detailFormData),
                ingredientsData: JSON.stringify(ingredientsFormData),
                stepsData: JSON.stringify(stepsFormData),
              },
              { method: 'post' },
            )
            dispatch(resetDetails())
            dispatch(resetIngredients())
            dispatch(resetStep())
            dispatch(resetPublish())
          }}
        >
          Publish
        </button>
      </header>
      <ContentCard className="flex !p-0 !py-0 !px-0">
        <div className="flex w-full flex-1 space-x-8">
          <div className="w-60 border-r border-gray-200 py-6 dark:border-gray-600 ">
            <nav className="flex h-full flex-col">
              <ul className="flex-1  overflow-auto">
                {defaultSideList.map(({ value, route }, idx) => {
                  return (
                    <SideList
                      key={`${value}_${idx}`}
                      route={route}
                      value={value}
                      idx={idx}
                    />
                  )
                })}
                <SideList value="Steps" idx={999} />
                {stepForms.map(({ title, id }, idx) => {
                  return (
                    <SideList
                      key={`${title}_${idx}`}
                      route={`/upload/${idx + 1}`}
                      value={title}
                      stepId={id}
                      idx={idx}
                      onDelete={() => {
                        if (stepIdx && +stepIdx === idx + 1) {
                          if (+stepIdx > 1) {
                            navigate(`/upload/${idx}`)
                          }
                        } else if (stepIdx && +stepIdx > idx + 1) {
                          navigate(`/upload/${+stepIdx - 1}`)
                        }
                        dispatch(deleteStep({ id }))
                      }}
                      disabledDelete={idx === 0 && stepForms.length === 1}
                    />
                  )
                })}
              </ul>
              <div className="flex pt-4">
                <Link
                  to={`/upload/${
                    stepForms.length > 0
                      ? stepForms.length + 1
                      : defaultStepList.length + 1
                  }`}
                  className="btn-sm btn-secondary sider-item flex-1  "
                  onClick={() => {
                    dispatch(
                      addStep({
                        title: '',
                        methods: [{ content: '' }],
                        id: uuidv4(),
                        photo: { name: '', src: '', type: '' },
                      }),
                    )
                  }}
                >
                  Add a step
                </Link>
              </div>
            </nav>
          </div>
          <div className="flex flex-1 py-6 pr-9">
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </ContentCard>
    </div>
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  const navigate = useNavigate()
  console.error(error)
  return (
    <div>
      <h1>Oops! Something went wrong!</h1>
      <button
        onClick={() => {
          navigate(-1)
        }}
      >
        Go back
      </button>
      <Link to="/">Home page</Link>
    </div>
  )
}
