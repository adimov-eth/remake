import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import '@/utils/mockEnv'
import { preloadImageURLs } from '@/core/config'

interface PreloadContextType {
  imagesLoaded: boolean
}

const PreloadContext = createContext<PreloadContextType>({
  imagesLoaded: false,
})

export const usePreload = () => useContext(PreloadContext)

interface PreloadProviderProps {
  children: ReactNode
  shouldPreload: boolean 
}

const PreloadProvider: React.FC<PreloadProviderProps> = ({ children, shouldPreload }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    if (!shouldPreload) {
      setImagesLoaded(true)
      return
    }

    const imageUrls = preloadImageURLs

    const loadImages = () => {
      const promises = imageUrls.map((url) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.src = url
          img.onload = () => resolve('preloaded')
          img.onerror = () => {
            console.error(`Failed to load: ${url}`)
            resolve('failed preload')
          }
        })
      })

      Promise.all(promises)
        .then(() => {
          setImagesLoaded(true)
        })
        .catch((err) => console.error('Failed to load images', err))
    }

    loadImages()
  }, [shouldPreload])

  return (
    <PreloadContext.Provider value={{ imagesLoaded }}>
      {children}
    </PreloadContext.Provider>
  )
}

export default PreloadProvider