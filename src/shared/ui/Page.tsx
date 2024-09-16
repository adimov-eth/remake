import { styled } from '@/app/stitches.config'

export const Page = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '$headerBackground',
})

export const Content = styled('div', {
  flex: '1',
  width: '100%',
})

export const Banner = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '33px',
  position: 'relative',
})

export const Title = styled('h1', {
  fontFamily: '$proDisplay',
  fontSize: '28px',
  fontWeight: 600,
  color: 'white',
  textAlign: 'center',
  marginBottom: '32px',
})

export const Gradient = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '50%',
  filter: 'blur(60px)',
  variants: {
    color: {
      pink: {
        width: '84px',
        height: '84px',
        background: 'radial-gradient(circle, rgba(193, 61, 157, 1) 0%, rgba(193, 61, 157, 0) 70%)',
      },
      purple: {
        width: '110px',
        height: '110px',
        background: 'radial-gradient(circle, rgba(127, 74, 186, 1) 0%, rgba(127, 74, 186, 0) 70%)',
      },
      blue: {
        width: '84px',
        height: '84px',
        background: 'radial-gradient(circle, rgba(101, 86, 208, 1) 0%, rgba(101, 86, 208, 0) 70%)',
      },
    },
  },
  defaultVariants: {
    color: 'pink',
  },
})
