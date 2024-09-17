import React, { useState, useRef, useCallback, useEffect } from 'react'

import CoinPNG from '@shared/assets/main-page-coin.png'
import CoinWebP from '@shared/assets/main-page-coin.webp'

import Canvas from './SimplifiedCanvas'

interface CoinProps {
  touchAreaRef: React.RefObject<HTMLDivElement>
}

const ClickerCoin: React.FC<CoinProps> = ({ touchAreaRef }) => {
  const [loaded, setLoaded] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  const map = (
    val: number,
    minA: number,
    maxA: number,
    minB: number,
    maxB: number
  ) => {
    return minB + ((val - minA) * (maxB - minB)) / (maxA - minA)
  }

  const applyCard3DEffect = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current
    const image = imageRef.current
    if (!canvas || !image) return

    const rect = canvas.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = x - rect.left
    const mouseY = y - rect.top
    const rotateY = map(mouseX, 0, width, -30, 30)
    const rotateX = map(mouseY, 0, height, 30, -30)
    const brightness = map(mouseY, 0, height, 1.5, 0.5)

    canvas.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    canvas.style.filter = `brightness(${brightness})`
  }, [])

  const resetCardEffect = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.style.transform = 'rotateX(0deg) rotateY(0deg)'
    canvas.style.filter = 'brightness(1)'
  }, [])

  const toggleCardEffect = useCallback(
    (event: Touch) => {
      setIsActive((prev) => !prev)
      if (!isActive) {
        applyCard3DEffect(event.clientX, event.clientY)
      } else {
        resetCardEffect()
      }
    },
    [isActive, applyCard3DEffect, resetCardEffect]
  )

  const handleMouseDown = useCallback(
    (event: Touch) => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.style.transform = 'scale(1.03)'
      toggleCardEffect(event)
    },
    [toggleCardEffect]
  )

  const handleMouseUp = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.style.transform = 'scale(1)'
  }, [])

  const handleCanvasInited = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas
    const image = new Image()

    // Try loading WebP first
    image.src = CoinWebP

    image.onload = () => {
      imageRef.current = image
      setLoaded(true)
    }

    image.onerror = () => {
      // If WebP fails, fallback to PNG
      image.src = CoinPNG
      image.onload = () => {
        imageRef.current = image
        setLoaded(true)
      }
    }
  }, [])

  const renderCoin = useCallback(() => {
    const canvas = canvasRef.current
    const image = imageRef.current
    if (!canvas || !image) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    const size = Math.min(width, height) * 0.8

    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(image, (width - size) / 2, (height - size) / 2, size, size)
  }, [])

  useEffect(() => {
    if (loaded) {
      renderCoin()
    }
  }, [loaded, renderCoin])

  return (
    <Canvas
      touchAreaRef={touchAreaRef}
      onCanvasInited={handleCanvasInited}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ transition: 'all 200ms ease-in-out' }}
    />
  )
}

export default ClickerCoin
