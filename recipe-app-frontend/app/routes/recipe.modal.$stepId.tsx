import { Link, useParams } from '@remix-run/react'
import { useEffect } from 'react'
import img1 from '../../public/assets/img1.jpeg'

export default function RecipeModal(): JSX.Element {
  const steps = 3
  const param = useParams()
  const stepId =
    param.stepId &&
    parseInt(param.stepId) > 0 &&
    parseInt(param.stepId) <= steps
      ? parseInt(param.stepId)
      : 0
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0  bg-white">
      <div className="h-full grid grid-cols-[1fr_32vw]">
        <div className=" aspect-w-1 ">
          <img
            src={img1}
            alt="step-img"
            className="w-full h-full object-cover object-center "
          />
        </div>
        <div className="h-screen flex flex-col">
          <div className="flex justify-end px-4 py-2 ">
            <Link
              to="/recipe"
              className="w-fit btn-ghost btn-sm justify-end text-gray-500 "
            >
              Close
            </Link>
          </div>
          <div className="overflow-y-auto flex-1">
            <div className="mt-2 mb-14 text-center">
              <h4 className="text-orange-600 font-medium">STEP {stepId}</h4>
              <h2 className="text-black">Preparation</h2>
            </div>
            <ul className=" pl-14 pr-12 list-disc text-black marker:text-gray-300 marker:text-xl marker:leading-none">
              {[
                'Turn on the oven for the salmon and burger buns.',
                'Preheated 400 degrees F (200 degrees C) oven for 5 to 8 minutes',
                'Cut a thick slice of tomato and red onion for each bun.',
                'Cut a thick slice of tomato and red onion for each bun.',
                'Cut a thick slice of tomato and red onion for each bun.',
                'Cut a thick slice of tomato and red onion for each bun.',
                'Cut a thick slice of tomato and red onion for each bun.',
                'Cut a thick slice of tomato and red onion for each bun.',
                'Cut a thick slice of tomato and red onion for each bun.',
                'Cut a thick slice of tomato and red onion for each bun.',
              ].map((v, idx) => (
                <li key={`${v}_${idx}`} className="mb-8">
                  <span className="relative left-1 -z-10">{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between px-4 py-2  ">
            <Link
              to={
                stepId > 0 && stepId - 1 > 0
                  ? `/recipe/modal/${stepId - 1}`
                  : '/error'
              }
              className={`btn-ghost btn-sm justify-end text-gray-500 select-none ${
                stepId - 1 === 0 ? 'pointer-events-none invisible' : ''
              }`}
            >
              Previous
            </Link>
            <Link
              to={
                stepId > 0 && stepId + 1 <= steps
                  ? `/recipe/modal/${stepId + 1}`
                  : '/error'
              }
              className={`btn-ghost btn-sm justify-end text-base text-orange-500 select-none ${
                stepId + 1 > steps ? 'pointer-events-none invisible' : ''
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
