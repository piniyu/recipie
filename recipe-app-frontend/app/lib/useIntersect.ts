import { useCallback, useEffect, useState } from 'react'

export function useIntersect(option?: IntersectionObserverInit | undefined) {
  const [observer, setObserver] = useState<IntersectionObserver>()
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const callback = (
    func: (entryValue: IntersectionObserverEntry | undefined) => void,
  ) => {
    if (isIntersecting && entry) {
      func(entry)
    }
  }

  const measureRef = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        const onIntersect: IntersectionObserverCallback = entries => {
          entries.forEach(entry => {
            setIsIntersecting(entry.isIntersecting)
            setEntry(entry)
          })
        }

        const obs = new IntersectionObserver(onIntersect, option)
        obs.observe(node)
        setObserver(obs)
        console.log(node)
      }
    },
    [option?.root, option?.rootMargin, option?.threshold],
  )

  return { observer, isIntersecting, measureRef, callback }
}
