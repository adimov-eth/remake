import { styled } from "@app/stitches.config"
import { fadeInAnimation, fadeOutAnimation, modalOpenAnimation, modalCloseAnimation } from "@app/stitches.config"

export const ModalOverlay = styled('div', {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    opacity: 0,
    animation: `${fadeInAnimation} 0.3s forwards`,
    borderRadius: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.02)',
    background: 'rgba(5, 6, 10, 0.7)',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(0.75rem)',
  
    variants: {
      fadeOut: {
        true: {
          animation: `${fadeOutAnimation} 0.3s forwards`,
        }
      }
    }
})
  
export const ModalContent = styled('div', {
    background: 'rgba(43, 46, 69, 0.3)',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.02)',
    padding: '1rem',
    borderRadius: '1rem',
    width: '300px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 9999,
    opacity: 0,
    animation: `${modalOpenAnimation} 0.3s forwards`,
    variants: {
      fadeOut: {
        true: {
          animation: `${modalCloseAnimation} 0.3s forwards`,
        }
      },
      confirm: {
        true: {
          padding: '1.875rem',
          width: '18.75rem',
          fontFamily: 'var(--font-pro-display)',
        }
      }
    }
})