import { atom } from 'nanostores'

interface SwapState {
  quarkValue: string
  starValue: string
  isSellingQuark: boolean
}

export const $swapState = atom<SwapState>({
  quarkValue: '',
  starValue: '',
  isSellingQuark: true,
})

export const handleSwapValueChange = (value: string, isQuark: boolean, max: number) => {
  const number = parseFloat(value)
  const currentState = $swapState.get()

  if (value === '' || (!isNaN(number) && number >= 0 && number <= max)) {
    const quarkValue = isQuark ? value : (number * 1000).toFixed(2)
    const starValue = isQuark ? (number / 1000).toFixed(2) : value
    $swapState.set({ ...currentState, quarkValue, starValue })
  }
}

export const swapCurrencies = () => {
  const currentState = $swapState.get()
  const { quarkValue, starValue, isSellingQuark } = currentState

  $swapState.set({
    isSellingQuark: !isSellingQuark,
    quarkValue: starValue ? (parseFloat(starValue) * 1000).toFixed(2) : '',
    starValue: quarkValue ? (parseFloat(quarkValue) / 1000).toFixed(2) : '',
  })
}

export const setMaxQuarks = (syncedQuarks: number) => {
  const maxQuarks = syncedQuarks.toFixed(2)
  $swapState.set({
    ...$swapState.get(),
    quarkValue: maxQuarks,
    starValue: (syncedQuarks / 1000).toFixed(2),
  })
}