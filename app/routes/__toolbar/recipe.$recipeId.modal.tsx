// import { CloseOutlined } from '@mui/icons-material'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useFetcher, useLoaderData, useParams } from '@remix-run/react'
import React, { useCallback, useContext, useEffect } from 'react'
import { useState } from 'react'
import { SiderContext } from '~/components/sider/sider-context'
import { db } from '~/utils/db.server'
import { badRequest } from '~/utils/request.server'
import { s3 } from '~/utils/s3.server'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

type MockData = {
  id: string
  title: string
  steps: { id: string; timeStemp: null | string; text: string }[]
}

export const loader = async ({ request, params, context }: LoaderArgs) => {
  const recipeId = params.recipeId
  if (!recipeId) {
    throw badRequest({ message: 'recipeId is undefined' })
  }
  const checkStep = (step: number) => {
    return step > 0 ? step - 1 : 0
  }
  const step = checkStep(Number(new URL(request.url).searchParams.get('step')))
  const step1 = async () =>
    db.instruction.findFirst({
      where: { recipeId, step: step + 1 },
    })
  const step2 = async () =>
    db.instruction.findFirst({
      where: { recipeId, step: step + 2 },
    })

  const step11 = await db.instruction.findFirst({
    where: { recipeId, step: step + 1 },
  })

  const steps = await Promise.allSettled([step1(), step2()])

  const getPhotos = steps.map(async e => {
    if (e.status === 'fulfilled') {
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: e.value?.photo,
      })
      const url = await getSignedUrl(s3, command)
      return { ...e.value, photo: url }
    }
    throw new Error(e.reason)
  })

  const stepsWithPhotos = await Promise.allSettled(getPhotos)
  const response = stepsWithPhotos.map(e => {
    if (e.status === 'fulfilled') {
      return e.value
    }
    return null
  })
  return json(response)
}

const ModalContainer = ({
  children,
  onPrevious,
  onNext,
  showNext,
  showPrevious,
}: {
  children: React.ReactNode
  onPrevious: () => void
  onNext: () => void
  showNext: boolean
  showPrevious: boolean
}) => {
  const { recipeId } = useParams()
  return (
    <div className="overflow-auto bg-inherit [scroll-snap-type:y_mandatory] lg:h-screen">
      {children}
      <button
        onClick={onPrevious}
        className={`
        btn-ghost 
        btn-sm 
        fixed top-2 
        left-[calc(50vw_-_48px)] w-24 
        select-none 
        flex-col bg-gray-200/70 text-inherit
        backdrop-blur-md 
        hover:animate-bounce-y-down
        dark:bg-gray-700/70
        ${showPrevious ? '' : 'pointer-events-none invisible'}`}
      >
        <span className="material-symbols-rounded block">arrow_upward</span>
        Previous
      </button>
      <button
        onClick={onNext}
        id="next_btn"
        className={`
        btn-ghost 
        btn-md 
        fixed bottom-2 
        left-[calc(50vw_-_48px)] 
        w-24 select-none
        flex-col bg-gray-200/70 text-inherit
        backdrop-blur-md
        hover:animate-bounce-y-up 
        dark:bg-gray-700/70
        ${showNext ? '' : 'pointer-events-none invisible'}`}
      >
        Next
        <span className="material-symbols-rounded block">arrow_downward</span>
      </button>
      <Link
        to={`/recipe/${recipeId}`}
        className="btn-ghost btn-md fixed top-0 right-[10px] w-fit justify-end text-gray-500 "
      >
        <span className="material-symbols-rounded">close</span>
      </Link>
    </div>
  )
}

export default function RecipeModal(): JSX.Element {
  const { setHidden } = useContext(SiderContext)
  const data = useLoaderData<typeof loader>()
  const { recipeId } = useParams()
  const [stepData, setStepData] = useState(data)
  const [stepInView, setStepInView] = useState(1)
  const [maxStep, setMaxStep] = useState(Infinity)

  const fetcher = useFetcher<typeof loader>()

  const [shouldFetch, setShouldFetch] = useState(true)
  const [hasData, setHasData] = useState(true)
  const [targets, setTergets] = useState<HTMLDivElement[]>([])
  const [nextStep, setNextStep] = useState(3)

  useEffect(() => {
    setHidden(true)
    return () => {
      setHidden(false)
    }
  }, [setHidden])

  const targetRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      const idx = node.getAttribute('data-key')
      if (idx) {
        setTergets(prev => {
          const arr = [...prev]
          arr[+idx] = node
          return arr
        })
      }
    }
  }, [])

  useEffect(() => {
    const options = {
      threshold: 1,
    }
    const onIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const key = entry.target.getAttribute('data-key')
          if (
            key &&
            +key === targets.length - 2 &&
            +key % 2 === 0 &&
            +key !== maxStep - 1 &&
            maxStep === Infinity
          ) {
            setShouldFetch(true)
            setNextStep(parseInt(key) + 3)
          }
          if (key) {
            setStepInView(parseInt(key) + 1)
          }
        }
      })
    }
    const observer = new IntersectionObserver(onIntersect, options)
    if (targets.length > 0) {
      targets.forEach(target => {
        observer.observe(target)
      })
    }
    return () => {
      observer.disconnect()
    }
  }, [maxStep, targets, targets.length])

  // fetch data
  useEffect(() => {
    if (!shouldFetch || !hasData) {
      return
    }
    fetcher.load(`/recipe/${recipeId}/modal?step=${nextStep}`)
    setShouldFetch(false)
  }, [fetcher, hasData, nextStep, shouldFetch])

  // fetcher data change
  useEffect(() => {
    const fetcherData = fetcher.data
    if (
      fetcherData !== undefined &&
      Array.isArray(fetcherData) &&
      fetcherData[0] === null
    ) {
      setHasData(false)
      setShouldFetch(false)
      return
    }
    if (
      fetcherData !== undefined &&
      Array.isArray(fetcherData) &&
      fetcherData[0] !== null &&
      fetcherData[1] === null
    ) {
      setStepData(prev => [...prev, fetcherData![0]])
      setHasData(false)
      setShouldFetch(false)
      return
    }
    if (fetcherData !== undefined && Array.isArray(fetcherData)) {
      setStepData(prev => [...prev, ...fetcherData])
    }
  }, [fetcher.data])

  useEffect(() => {
    if (!hasData) {
      setMaxStep(targets.length)
    }
  }, [hasData, targets.length])

  return (
    <ModalContainer
      showNext={stepInView !== maxStep}
      showPrevious={stepInView !== 1}
      onPrevious={() => {
        targets[stepInView - 2].scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        })
        setStepInView(prev => prev - 1)
      }}
      onNext={() => {
        targets[stepInView].scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        })
        setStepInView(prev => prev + 1)
      }}
    >
      {stepData?.map((step, idx) => {
        if (step === null) return null
        return (
          <div
            key={idx}
            data-key={idx}
            className="mx-auto flex max-w-7xl scroll-m-0 flex-col gap-6 py-20 px-2 [scroll-snap-align:start] md:px-8 lg:h-screen lg:flex-row lg:justify-center lg:[scroll-snap-align:center] "
            ref={targetRef}
          >
            <div className="flex  w-full items-center">
              <div
                className={` max-h-[70vh] w-full flex-1 rounded-2xl bg-white p-3 shadow-2xl dark:bg-dark-gray dark:shadow-gray-900 md:p-5`}
              >
                <img
                  src={step.photo}
                  alt="step-img"
                  className="h-full w-full rounded-2xl object-cover object-center"
                />
              </div>
            </div>
            <div className=" flex w-full flex-shrink-0 lg:w-2/5">
              <div className="flex-1 overflow-y-auto">
                <div className="mt-2 mb-8 text-center lg:mb-14">
                  <h4 className="font-medium text-primary">STEP {step.step}</h4>
                  <h2 className="text-inherit">{step.title}</h2>
                </div>
                <ol className="list-decimal pl-8 pr-3 text-inherit marker:text-xl marker:leading-none marker:text-gray-300 dark:marker:text-gray-500 lg:pl-14 lg:pr-14">
                  {step.methods?.map((method, index) => (
                    <li key={index} className="mb-8">
                      <span className="relative left-1 ">{method}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )
      })}
    </ModalContainer>
  )
}
