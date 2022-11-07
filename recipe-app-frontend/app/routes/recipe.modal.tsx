// import { CloseOutlined } from '@mui/icons-material'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useFetcher, useLoaderData, useParams } from '@remix-run/react'
import React, { useCallback, useContext, useEffect } from 'react'
import { useRef, useState } from 'react'

import { useIntersect } from '../lib/useIntersect'
import img1 from '../../public/assets/img1.jpeg'
import { SiderContext } from '~/components/sider/sider-context'

type MockData = {
  id: string
  title: string
  steps: { id: string; timeStemp: null | string; text: string }[]
}

const mockData: MockData[] = [
  {
    id: '1',
    title: 'Preparation',
    steps: [
      {
        id: '1',
        timeStemp: null,
        text: 'Preheated 400 degrees F (200 degrees C) oven for 5 to 8 minutes',
      },
      {
        id: '2',
        timeStemp: null,
        text: 'Preheated 400 degrees F (200 degrees C) oven for 5 to 8 minutes',
      },
      {
        id: '3',
        timeStemp: null,
        text: 'Preheated 400 degrees F (200 degrees C) oven for 5 to 8 minutes',
      },
      {
        id: '4',
        timeStemp: null,
        text: 'Preheated 400 degrees F (200 degrees C) oven for 5 to 8 minutes',
      },
    ],
  },
  {
    id: '2',
    title: 'Preparation',
    steps: [
      {
        id: '1',
        timeStemp: null,
        text: 'Preheated 400 degrees F (200 degrees C) oven for 5 to 8 minutes',
      },
    ],
  },
  {
    id: '3',
    title: 'Preparation',
    steps: [
      {
        id: '1',
        timeStemp: null,
        text: 'Preheated 400 degrees F (200 degrees C) oven for 5 to 8 minutes',
      },
    ],
  },
  {
    id: '4',
    title: 'Preparation',
    steps: [
      {
        id: '1',
        timeStemp: null,
        text: 'Preheated 400 degrees F (200 degrees C) oven for 5 to 8 minutes',
      },
    ],
  },
  {
    id: '5',
    title: 'Preparation',
    steps: [
      {
        id: '1',
        timeStemp: null,
        text: 'Preheated 400 degrees F (200 degrees C) oven for 5 to 8 minutes',
      },
    ],
  },
]

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const checkStep = (step: number) => {
    return step > 0 ? step - 1 : 0
  }
  const step = checkStep(Number(new URL(request.url).searchParams.get('step')))

  return json([mockData[step], mockData[step + 1]])
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
  return (
    <div
      className="h-screen bg-gray-50 overflow-auto [scroll-snap-type:y_mandatory]"
      // ref={rootRef}
    >
      {children}
      <button
        onClick={onPrevious}
        className={`fixed w-24 btn-ghost btn-sm top-2 left-1/2 -translate-x-1/2 flex-col bg-gray-50/70 backdrop-blur-md text-gray-500 select-none ${
          showPrevious ? '' : 'pointer-events-none invisible'
        }`}
      >
        <span className="material-symbols-rounded block">arrow_upward</span>
        Previous
      </button>
      <button
        onClick={onNext}
        id="next_btn"
        className={`fixed w-24 btn-ghost btn-md flex-col bottom-2 left-1/2 -translate-x-1/2 bg-gray-50/70 backdrop-blur-md text-orange-600 select-none ${
          showNext ? '' : 'pointer-events-none invisible'
        }`}
      >
        Next
        <span className="material-symbols-rounded block">arrow_downward</span>
      </button>
      <Link
        to="/recipe"
        className="fixed w-fit top-0 right-[10px] btn-ghost btn-md justify-end text-gray-500 "
      >
        <span className="material-symbols-rounded">close</span>
      </Link>
    </div>
  )
}

export default function RecipeModal(): JSX.Element {
  const { setHidden } = useContext(SiderContext)
  const data: MockData[] = useLoaderData()
  const [stepData, setStepData] = useState(data)
  const [stepInView, setStepInView] = useState(1)
  const [maxStep, setMaxStep] = useState(Infinity)

  const fetcher = useFetcher()

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

  //infinite scrolling intersect

  // useEffect(() => {
  //   console.log(stepInView, maxStep)
  // }, [maxStep, stepInView])
  useEffect(() => {
    const options = {
      threshold: 1,
    }
    const onIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const key = entry.target.getAttribute('data-key')
          // console.log(key)
          if (
            key &&
            +key === targets.length - 2 &&
            +key % 2 === 0 &&
            +key !== maxStep - 1 &&
            maxStep === Infinity
          ) {
            console.log('fetch', nextStep)
            setShouldFetch(true)
            setNextStep(parseInt(key) + 3)
            // console.log(idx + 2)
          }
          if (key) {
            // step.current = idx + 1
            // entry.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
            // console.log(entry.target)
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
    // console.log(startStepRef.current)
    // console.log(nextStep, targets.length)
    if (!shouldFetch || !hasData) {
      return
    }
    fetcher.load(`/recipe/modal?step=${nextStep}`)
    setShouldFetch(false)
  }, [fetcher, hasData, nextStep, shouldFetch])

  // console.log('render')

  // fetcher data change
  useEffect(() => {
    if (fetcher.data && fetcher.data[0] === null) {
      setHasData(false)
      setShouldFetch(false)
      // setMaxStep(nextStep - 1)
      return
    }
    if (fetcher.data && fetcher.data[1] === null) {
      setStepData(prev => [...prev, fetcher.data[0]])
      setHasData(false)
      setShouldFetch(false)
      return
    }
    if (fetcher.data) {
      setStepData(prev => [...prev, ...fetcher.data])
      // setNextStep(prev => prev + 1)
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
          block: 'center',
          behavior: 'smooth',
        })
        setStepInView(prev => prev - 1)
      }}
      onNext={() => {
        targets[stepInView].scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        })
        setStepInView(prev => prev + 1)
      }}
    >
      {stepData?.map(({ id, title, steps }, idx) => {
        return (
          <div
            key={id}
            data-key={idx}
            className="max-w-7xl h-screen flex justify-center mx-auto space-x-6 scroll-m-0 py-20 px-8 [scroll-snap-align:center] "
            ref={targetRef}
          >
            <div className="w-full  flex items-center">
              <div
                className={`flex-1 w-full h-full max-h-[70vh] p-5 rounded-2xl bg-white shadow-2xl `}
                // style={{ backgroundImage: `url(${img1})` }}
              >
                <img
                  src={img1}
                  alt="step-img"
                  className="w-full h-full object-cover object-center rounded-2xl"
                />
              </div>
            </div>
            <div className=" w-2/5 flex-shrink-0 flex flex-col">
              <div className="overflow-y-auto flex-1">
                <div className="mt-2 mb-14 text-center">
                  <h4 className="text-orange-600 font-medium">STEP {id}</h4>
                  <h2 className="text-black">{title}</h2>
                </div>
                <ul className=" pl-14 pr-14 list-disc text-black marker:text-gray-300 marker:text-xl marker:leading-none">
                  {steps.map(({ text, id }) => (
                    <li key={id} className="mb-8">
                      <span className="relative left-1 ">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </ModalContainer>
  )
}
