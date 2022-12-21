import { useEffect, useState } from 'react'
import { db } from '~/utils/db.server'

const getBasketCount = async () => {
  const basket = await db.basket.findUnique({
    where: { userId: 'testuser0' },
    include: {
      recipes: { include: { _count: { select: { ingredientsNum: true } } } },
    },
  })
}

const useBasketCount = () => {
  const [count, setCount] = useState()
  useEffect(() => {
    getBasketCount()
  }, [])
}
