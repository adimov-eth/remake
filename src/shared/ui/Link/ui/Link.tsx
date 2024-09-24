import { type FC, type MouseEventHandler, useCallback } from 'react'
import { type LinkProps } from 'react-router-dom'
import { useUtils } from '@telegram-apps/sdk-react'

import * as S from './Link.styles'

export const Link: FC<LinkProps> = ({ className, onClick: propsOnClick, to, children, ...rest }) => {
  const utils = useUtils()

  const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      propsOnClick?.(e)

      // Compute if target path is external. In this case we would like to open link using
      // TMA method.
      let path: string
      if (typeof to === 'string') {
        path = to
      } else {
        const { search = '', pathname = '', hash = '' } = to
        path = `${pathname}?${search}#${hash}`
      }

      const targetUrl = new URL(path, window.location.toString())
      const currentUrl = new URL(window.location.toString())
      const isExternal =
        targetUrl.protocol !== currentUrl.protocol ||
        targetUrl.host !== currentUrl.host

      if (isExternal) {
        e.preventDefault()
        return utils.openLink(targetUrl.toString())
      }
    },
    [to, propsOnClick, utils]
  )

  return (
    <S.Link to={to}
        {...rest}
        onClick={onClick}
        className={className}
      >
        {children}
    </S.Link>

  )
}