import { useState } from 'react'

export default function Difficulty({
  stars = 1,
  isInput,
}: {
  stars: number
  isInput?: boolean
}): JSX.Element {
  const [starValue, setStarValue] = useState(stars)
  const [clicked, setClicked] = useState(0)
  return (
    <>
      {Array(5)
        .fill('')
        .map((_, idx) => (
          <span
            key={idx}
            className={`material-symbols-rounded leading-none text-primary-400 ${
              isInput ? 'cursor-pointer' : ''
            }`}
            style={
              starValue > idx
                ? { fontVariationSettings: '"FILL" 1' }
                : undefined
            }
            onMouseEnter={() => {
              if (isInput) {
                setStarValue(idx + 1)
              }
            }}
            onMouseLeave={() => {
              if (isInput && !clicked) {
                setStarValue(1)
              } else if (isInput && clicked) {
                setStarValue(clicked)
              }
            }}
            onClick={() => {
              setClicked(idx + 1)
            }}
          >
            star
          </span>
        ))}

      <span className={` ${isInput ? 'text-black' : 'text-gray-500'}`}>
        {starValue.toFixed(1)}
      </span>
    </>
  )
}
