import React, { useEffect, useRef, useState } from 'react'
import useTimeout from './use-timeout'

export default function useThrottle(
  callback: () => void,
  value: any,
  delay: number,
  deps: React.DependencyList,
) {
  const callbackRef = useRef(callback)
  const { reset, clear, set } = useTimeout(callback, delay)
  const [shouldWait, setShouldWait] = useState(false)
  const waitingValueRef = useRef(value)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (shouldWait) return

    callbackRef.current()
    reset()
    setShouldWait(true)
  }, [...deps, shouldWait])

  useEffect(() => {
    waitingValueRef.current = value
  }, [value])
}
