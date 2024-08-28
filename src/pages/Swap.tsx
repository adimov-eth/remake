import React, { useCallback, useMemo } from 'react'
import * as S from "./Swap.style"
import { useStore } from '@nanostores/react'
import { initDataRaw } from '@/stores/telegram'
import { queryClient } from '@/services/api/queryClient'
import { useCreateSwap } from '@/services/api/swap/model'
import { useGetUserData } from '@/services/api/user/model'
import { $gameState } from '@/stores/state'
import CurrencyInput from '@/components/CurrencyInput'

import {
  $swapState,
  SwapDirection,
  SWAP_PAIRS,
  updateSwapValues,
  toggleSwapDirection,
  setMaxFromValue,
} from '@/stores/swap'


const Swap: React.FC = () => {
  const rawData = initDataRaw || ''
  const { quarks, stars } = useStore($gameState)
  const { fromValue, toValue, direction } = useStore($swapState)

  const { data: userData, isLoading: isUserDataLoading } = useGetUserData({
    enabled: !!rawData,
    variables: { rawData },
  })

  const { mutateAsync: swapMutation, isPending: isSwapPending } = useCreateSwap()

  const syncedQuarks = userData?.user?.clicker_state?.quarks ?? quarks.get()
  const syncedStars = userData?.user?.clicker_state?.stars ?? stars.get()

  const currentPair = useMemo(() => SWAP_PAIRS[direction], [direction])

  const handleValueChange = useCallback((value: string, input: 'from' | 'to') => {
    const maxValue = direction === SwapDirection.QuarkToStar ? syncedQuarks : syncedStars
    updateSwapValues(value, input, maxValue)
  }, [syncedQuarks, syncedStars, direction])

  const handleSwapDirectionToggle = useCallback(() => {
    toggleSwapDirection()
  }, [])

  const handleSwapClick = useCallback(async () => {
    const amount = parseFloat(fromValue)
    if (!amount) return

    try {
      await swapMutation(
        {
          rawData,
          body: {
            amount: String(amount),
            currency: currentPair.from.symbol,
          },
        },
        {
          onSuccess: () => {
            updateSwapValues('', 'from', 0)
            queryClient.invalidateQueries({ queryKey: ['get/missions'] })
          },
        }
      )
    } catch (error) {
      console.error('Error creating swap:', error)
      // TODO: Implement proper error handling (e.g., show error message to user)
    }
  }, [swapMutation, currentPair.from.symbol, fromValue, rawData])

  const isLoading = isUserDataLoading || isSwapPending

  const INIDICATOR: Record<SwapDirection, string> = {
    QuarkToStar: 'Quark to Star',
    StarToQuark: 'Star to Quark',
  }

  const [ top, bottom ] = useMemo( ()=> 
    direction === SwapDirection.QuarkToStar ? 
      [syncedQuarks, syncedStars] : [syncedStars, syncedQuarks], 
  [direction, syncedQuarks, syncedStars])

  return (
    <>
      <S.Inputs>
        <CurrencyInput
          label="Sell"
          value={fromValue}
          onChange={(value) => handleValueChange(value, 'from')}
          currency={currentPair.from}
          showMaxButton
          onMaxClick={() => setMaxFromValue(top)}
          max={top}
        />
        <S.ToggleButton onClick={handleSwapDirectionToggle} aria-label="Toggle swap direction">
          <S.SwapIcon />
        </S.ToggleButton>
        <CurrencyInput
          label="Buy"
          value={toValue}
          onChange={(value) => handleValueChange(value, 'to')}
          currency={currentPair.to}
          max={bottom}
        />
      </S.Inputs>
      <S.SwapButton
        variant="gradientFilled"
        onClick={handleSwapClick}
        disabled={isLoading || parseFloat(fromValue) === 0}
      >
        {isLoading ? 'Loading...' : 'Swap'}
      </S.SwapButton>
      <S.DirectionIndicator>
        {INIDICATOR[direction]}
      </S.DirectionIndicator>
    </>
  )
}



export default Swap