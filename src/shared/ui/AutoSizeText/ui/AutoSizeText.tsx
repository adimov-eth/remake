import { useEffect, useRef, ReactNode } from 'react'

interface AutoSizeTextProps {
  className?: string
  initialFontSize: number
  children: ReactNode
}
// TODO refactor this shit

export const AutoSizeText = ({
  className,
  initialFontSize,
  children,
}: AutoSizeTextProps) => {
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function adjustFontSize() {
      const textElement = textRef.current
      if (!textElement) return

      const parentElement = textElement.parentElement
      const parentWidth = parentElement ? parentElement.offsetWidth : 0
      let fontSize = initialFontSize

      textElement.style.fontSize = fontSize + 'px'

      while (textElement.scrollWidth > parentWidth && fontSize > 0) {
        fontSize -= 0.5
        textElement.style.fontSize = fontSize + 'px'
      }
    }

    adjustFontSize()
    window.addEventListener('resize', adjustFontSize)

    return () => {
      window.removeEventListener('resize', adjustFontSize)
    }
  }, [children, initialFontSize])

  return (
    <div className={className} ref={textRef}>
      {children}
    </div>
  )
}
