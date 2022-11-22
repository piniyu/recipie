import { useEffect, useState } from 'react'

export const useSearchFetch = ({ fetcher }: { fetcher: () => void }) => {
  const [input, setInput] = useState('')
  const [results, setResults] = useState([''])

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      const res = await fetcher()
      setResults(res)
    }, 200)
    return () => {
      clearTimeout(timeOut)
    }
  }, [fetcher, input])

  return { setInput, results }
}
