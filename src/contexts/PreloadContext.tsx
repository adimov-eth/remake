import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react'
  
import '@/utils/mockEnv'
import { preloadImageURLs } from '@/core/config'
  
  interface PreloadContextType {
    imagesLoaded: boolean
  }
  
  const PreloadContext = createContext<PreloadContextType>({
    imagesLoaded: false,
  })
  
  export const usePreload = () => useContext(PreloadContext)
  
  const PreloadProvider = ({ children }: { children: ReactNode }) => {
    const [imagesLoaded, setImagesLoaded] = useState(false)
  
    useEffect(() => {
      const imageUrls = preloadImageURLs;
  
      const loadImages = () => {
        const promises = imageUrls.map((url) => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = url
            img.onload = () => {
              resolve(null)
            }
            img.onerror = () => {
              console.error(`Failed to load: ${url}`)
              reject(null)
            }
          })
        })
  
        Promise.all(promises)
          .then(() => setImagesLoaded(true))
          .catch((err) => console.error('Failed to load images', err))
      }
  
      loadImages()
    }, [])
  
    return (
      <PreloadContext.Provider value={{ imagesLoaded }}>
        {children}
      </PreloadContext.Provider>
    )
  }
  
  export default PreloadProvider
  