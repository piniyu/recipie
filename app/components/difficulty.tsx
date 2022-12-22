import { Difficulty } from '@prisma/client'
import { useState } from 'react'

const getDifficulty = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.DIFFICULT5:
      return 5
    case Difficulty.DIFFICULT4:
      return 4
    case Difficulty.MODERATE3:
      return 3
    case Difficulty.EASY2:
      return 2
    case Difficulty.EASY1:
      return 1
    default:
      return 1
  }
}

export default function DifficultyBtn({
  difficulty,
  isInput,
}: {
  difficulty: Difficulty
  isInput?: boolean
}): JSX.Element {
  const [starValue, setStarValue] = useState(getDifficulty(difficulty))
  const [clicked, setClicked] = useState(0)
  return (
    <>
      {Array(5)
        .fill('')
        .map((_, idx) => (
          <span
            key={idx}
            className={`material-symbols-rounded leading-none text-primary ${
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
