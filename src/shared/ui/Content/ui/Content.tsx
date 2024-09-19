import React, { ReactNode } from 'react'
import * as S from './Content.styles'

interface ContentProps {
  children: ReactNode
}

export const Content: React.FC<ContentProps> = ({ children }) => {
  return <S.Content>{children}</S.Content>
}