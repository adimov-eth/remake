import { useEffect, useState } from 'react'

export function useTickTack(interval: number): number {
  const [tick, setTick] = useState(Date.now())

  useEffect(() => {
    const ticker = setInterval(() => {
      setTick(Date.now())
    }, interval * 1000)

    return () => clearInterval(ticker)
  }, [interval])

  return tick
}

export default useTickTack
