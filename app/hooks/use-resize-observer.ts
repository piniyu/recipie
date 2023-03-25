import useResizeObserver from '@react-hook/resize-observer'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'

export const useSize = (target: HTMLElement) => {
  const [size, setSize] = useState<DOMRectReadOnly>()

  useLayoutEffect(() => {
    target && setSize(target.getBoundingClientRect())
  }, [target])

  // Where the magic happens
  useResizeObserver(target, entry => setSize(entry.contentRect))
  return size
}
