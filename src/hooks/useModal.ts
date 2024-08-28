import { useCallback, useState } from 'react'

export const useModal = (): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openModal = useCallback((): void => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback((): void => {
    setIsOpen(false)
  }, [])

  return [isOpen, openModal, closeModal]
}
