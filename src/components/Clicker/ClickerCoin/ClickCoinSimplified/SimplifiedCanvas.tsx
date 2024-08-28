import React, { useRef, useCallback, useEffect } from 'react'

import styles from '@/components/Clicker/Clicker/clicker.module.css'

import { $gameState } from '@/stores/state'

import { useMultiTouch } from '@/hooks'

interface CanvasProps {
  touchAreaRef: React.RefObject<HTMLDivElement>
  onCanvasInited?: (canvas: HTMLCanvasElement) => void
  onResize?: (width: number, height: number) => void
  onMouseDown?: (event: Touch) => void
  onMouseUp?: () => void
  style: object
}

type isTouchInAreaType = (
  touch: Touch,
  touchArea: React.RefObject<HTMLElement>
) => boolean
const isTouchInArea: isTouchInAreaType = (
  touch: Touch,
  touchArea: React.RefObject<HTMLElement>
) => {
  if (!touchArea.current) return false
  const touchAreaRect = touchArea.current.getBoundingClientRect()
  return (
    touch.clientX >= touchAreaRect.left &&
    touch.clientX <= touchAreaRect.right &&
    touch.clientY >= touchAreaRect.top &&
    touch.clientY <= touchAreaRect.bottom
  )
}

const Canvas: React.FC<CanvasProps> = ({
  touchAreaRef,
  onCanvasInited,
  onResize,
  onMouseDown,
  onMouseUp,
  style,
}) => {

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const clickerState = $gameState.get()
  const currentEnergy =  clickerState.energy.get()
  const quarksPerClick =  clickerState.quarksPerClick.get()

  const performCanvasAnimation = useCallback(
    (event: TouchEvent) => {
      const touch = event.touches[0]
      console.log('touch', event.touches[0])
      onMouseDown && onMouseDown(touch)
    },
    [onMouseDown, onMouseUp]
  )

  const performClickAnimation = useCallback(
    (x: number, y: number) => {
      const newAnimation = document.createElement('div')
      newAnimation.className = styles.plusOne
      newAnimation.style.top = `${y}px`
      newAnimation.style.left = `${x}px`
      newAnimation.textContent = `+${quarksPerClick}`

      document.body.appendChild(newAnimation)

      setTimeout(() => {
        newAnimation.remove()
      }, 1000)
    },
    [quarksPerClick]
  )

  const handleTouchStart = useCallback(
    (event: TouchEvent, numberOfTouches: number) => {
      console.log(`Touch start with ${numberOfTouches} fingers`)
      if (currentEnergy < quarksPerClick) {
        return
      }

      if (touchAreaRef.current) {
        const isAnyTouchInArea = Array.from(event.touches).some((touch) =>
          isTouchInArea(touch, touchAreaRef)
        )
        if (!isAnyTouchInArea) return

        performCanvasAnimation(event)
        Array.from(event.touches).forEach((touch) => {
          if (isTouchInArea(touch, touchAreaRef)) {
            performClickAnimation(touch.clientX, touch.clientY)
          }
        })
      }
    },
    [
      currentEnergy,
      quarksPerClick,
      touchAreaRef,
      performCanvasAnimation,
      performClickAnimation,
    ]
  )

  useMultiTouch(canvasRef, handleTouchStart, (e) => e.preventDefault())

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    if (!canvas) return
    const { width, height } = canvas.getBoundingClientRect()
    canvas.width = width
    canvas.height = height
    onCanvasInited && onCanvasInited(canvas)

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      onResize && onResize(width, height)
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [onCanvasInited, onResize])

  return (
    <canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        ...style,
      }}
      ref={canvasRef}
    />
  )
}

export default Canvas
