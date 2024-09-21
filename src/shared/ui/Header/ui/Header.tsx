import * as S from './Header.styles'

export const Header = ({children}: {children: React.ReactNode}) => {
  return (
    <S.Header>
        {children}
    </S.Header>
  )
}