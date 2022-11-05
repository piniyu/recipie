import { useCallback, useEffect, useState } from 'react'

export const useResizeObserver = (
  ref: React.RefObject<HTMLElement>,
  callback?: (entry: DOMRectReadOnly) => void,
) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const onResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (!Array.isArray(entries)) {
        return
      }

      const entry = entries[0]
      setWidth(entry.contentRect.width)
      setHeight(entry.contentRect.height)
      if (callback) {
        callback(entry.contentRect)
      }
    },
    [callback],
  )
  useEffect(() => {
    if (!ref.current) {
      return
    }

    let resizeObserver = new ResizeObserver(entries => onResize(entries))
    resizeObserver.observe(ref.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [onResize, ref])
  return [width, height]
}
