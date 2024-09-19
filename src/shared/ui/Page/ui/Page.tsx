import React, { ReactNode } from 'react'
import * as S from './Page.styles'

interface PageProps {
  children: ReactNode
}

export const Page: React.FC<PageProps> = ({ children }) => {
  return <S.Page>{children}</S.Page>
}