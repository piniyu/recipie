import { Difficulty } from '@prisma/client'
import { useEffect, useState } from 'react'
import StarIcon from '~/components/icons/StarFill0Wght400Grad25Opsz48'
import StarIconFill from '~/components/icons/StarFill1Wght400Grad25Opsz48'

type GetDifficultyReturnType<T> = T extends Difficulty ? number : Difficulty

export function getDifficulty(
  difficulty: Difficulty | number,
): GetDifficultyReturnType<typeof difficulty> {
  const difficulties: Record<Difficulty, number> = {
    EASY1: 1,
    EASY2: 2,
    MODERATE3: 3,
    DIFFICULT4: 4,
    DIFFICULT5: 5,
    NOSCALE: 0,
  }
  if (typeof difficulty === 'number') {
    const keys = Object.keys(difficulties) as Difficulty[]
    const findDifficulty = keys.find(e => difficulties[e] === difficulty)

    if (typeof findDifficulty !== 'string') return 'NOSCALE'

    return findDifficulty
  }
  return difficulties[difficulty]
}

export default function DifficultyBtn({
  difficulty,
  isInput,
  onChange,
}: {
  difficulty: Difficulty
  isInput?: boolean
  onChange?: (value: number) => void
}): JSX.Element {
  const [starValue, setStarValue] = useState(
    getDifficulty(difficulty) as number,
  )
  const [clicked, setClicked] = useState(getDifficulty(difficulty) as number)

  useEffect(() => {
    if (onChange) {
      onChange(clicked)
    }
  }, [clicked])

  return (
    <div className="flex">
      {Array(5)
        .fill('')
        .map((_, idx) => (
          <span
            key={idx}
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
            {starValue > idx ? (
              <StarIconFill
                className={`svg-sm fill-primary ${
                  isInput ? 'cursor-pointer' : ''
                }`}
              />
            ) : (
              <StarIcon
                className={`svg-sm fill-primary ${
                  isInput ? 'cursor-pointer' : ''
                }`}
              />
            )}
          </span>
        ))}

      <span
        className={` ${
          isInput ? 'text-inherit' : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        {starValue.toFixed(1)}
      </span>
    </div>
  )
}
