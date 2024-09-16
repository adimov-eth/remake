import { useEffect } from 'react'

const useLockScroll = () => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < window.outerHeight) {
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
      }
    }

    const handleScroll = () => {
      window.scrollTo(0, 0)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}

export default useLockScroll
