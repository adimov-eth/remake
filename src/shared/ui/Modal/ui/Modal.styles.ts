import { styled } from '@app/stitches.config'
import { slideUp, slideDown } from '@app/stitches.config'

export const ModalRoot = styled('div', {
  zIndex: 105,
  display: 'none',
  justifyContent: 'center',
  alignItems: 'flex-end',
  bottom: 0,
  left: 0,
  minWidth: '320px',
  position: 'fixed',
  right: 0,
  top: 0,
  transition: 'display 0.3s',

  variants: {
    open: {
      true: {
        display: 'flex',
      },
    },
  },
})

export const Overlay = styled('div', {
  background: '#06070bb2',
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  position: 'absolute',
  zIndex: 105,
})

export const Inner = styled('div', {
  background: 'rgba(37, 41, 60, 0.84)',
  boxShadow: '0px 4px 24px 0px #00000040',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  borderImageSource: 'linear-gradient(181.98deg, rgba(255, 255, 255, 0.02) 1.46%, rgba(21, 24, 32, 0.1) 98.13%)',
  borderRadius: '16px 16px 0 0',
  margin: '0 auto',
  maxWidth: '768px',
  position: 'relative',
  width: '100%',
  zIndex: 106,
  animation: `${slideUp} 0.3s forwards`,
  WebkitOverflowScrolling: 'touch',

  variants: {
    slideDown: {
      true: {
        animation: `${slideDown} 0.3s forwards`,
      },
    },
  },
})

export const Scroll = styled('div', {
  maxHeight: 'calc(100vh - 64px)',
  overflowY: 'auto',
  position: 'relative',
  width: '100%',
  msOverflowStyle: 'none',
  padding: '40px 16px 20px',
  scrollbarWidth: 'none',
})

export const Close = styled('div', {
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 4,
  WebkitTapHighlightColor: 'transparent',
  MozUserSelect: 'none',
  userSelect: 'none',
  padding: '16px',

  '& svg path': {
    fill: 'white',
  },
})