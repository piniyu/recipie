import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useFetcher, useLoaderData, useParams } from '@remix-run/react'
import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { useState } from 'react'
import { db } from '~/service/db.server'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { CloseFill0Wght400Grad25Opsz48 as CloseIcon } from '~/components/icons'
import { ArrowDownwardFill0Wght400Grad25Opsz48 as ArrowDownIcon } from '~/components/icons'
import { ArrowUpwardFill0Wght400Grad25Opsz48 as ArrowUpIcon } from '~/components/icons'
import _ from 'lodash'
import { badRequest } from '~/service/request.server'
import { s3 } from '~/service/s3/s3.server'
import { useAppDispatch } from '~/store/configure-store'
import { setSiderHidden } from '~/store/sider-slice'

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
  return json(response, { headers: { 'Cache-Control': 'max-age=3600' } })
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
  const [showButton, setShowButton] = useState(false)
  const mouseEnter = useRef(false)

  const onHideBtn = useCallback(
    _.debounce(() => {
      if (!mouseEnter.current) {
        setShowButton(false)
      }
    }, 2000),
    [],
  )

  const onMouseEnter = () => {
    mouseEnter.current = true
  }
  const onMouseLeave = () => {
    mouseEnter.current = false
    onHideBtn()
  }

  return (
    <div
      className="h-screen overflow-auto bg-inherit [scroll-snap-type:y_mandatory]"
      onScrollCapture={() => {}}
      onScroll={() => {
        setShowButton(true)
        onHideBtn()
      }}
    >
      {children}
      {showButton ? (
        <>
          <button
            onClick={onPrevious}
            className={`
              btn-ghost 
              btn-md 
              fixed top-2 
              left-1/2
              -translate-x-1/2
              select-none 
              flex-col 
              bg-gray-200/70 fill-inherit text-sm
              text-inherit 
              backdrop-blur-md
              dark:bg-gray-700/70
              ${showPrevious ? '' : 'pointer-events-none invisible'}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <ArrowUpIcon className="svg-sm" />
            {/* Previous */}
          </button>
          <button
            onClick={onNext}
            id="next_btn"
            className={`
              btn-ghost 
              btn-md 
              fixed bottom-2 
              left-1/2
              -translate-x-1/2
              select-none
              flex-col bg-gray-200/70 fill-inherit text-inherit
              backdrop-blur-md
              
              dark:bg-gray-700/70
              ${showNext ? '' : 'pointer-events-none invisible'}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {/* Next */}
            <ArrowDownIcon className="svg-sm" />
          </button>
        </>
      ) : null}
      <Link
        to={`/recipe/${recipeId}`}
        className="btn-ghost btn-md fixed top-0 right-[10px] w-fit justify-end text-gray-500 "
      >
        <CloseIcon className="svg-md svg-gray" />
      </Link>
    </div>
  )
}

export default function RecipeModal(): JSX.Element {
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
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setSiderHidden(true))
    return () => {
      dispatch(setSiderHidden(false))
    }
  }, [])

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
      threshold: 0.5,
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
            className={`
              mx-auto
              flex
              min-h-screen
              max-w-7xl
              scroll-m-0
              flex-col-reverse
              justify-end
              gap-6
              py-10 px-2
              [scroll-snap-align:start]
              md:px-8 lg:h-screen
              lg:flex-row lg:justify-center lg:py-20 lg:[scroll-snap-align:center]
              `}
            ref={targetRef}
          >
            <div className="flex  w-full items-center justify-center">
              <div
                className={`flex-1 rounded-2xl bg-white p-2 shadow-2xl dark:bg-dark-gray dark:shadow-gray-900 md:max-w-[60vw]  lg:w-full lg:p-3 xl:p-5`}
              >
                <img
                  src={step.photo}
                  alt="step-img"
                  className="h-full w-full rounded-2xl object-cover object-center"
                />
              </div>
            </div>
            <div className=" flex w-full lg:mt-[10%]">
              <div className="flex-1 overflow-y-auto">
                <div className="mt-2 mb-8 text-center  xl:mb-14">
                  <h4 className="font-medium text-primary">STEP {step.step}</h4>
                  {step.title ? (
                    <h2 className="text-inherit">{step.title}</h2>
                  ) : null}
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
