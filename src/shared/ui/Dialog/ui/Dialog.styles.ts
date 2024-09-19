import { styled } from "@app/stitches.config"
import { fadeInAnimation, fadeOutAnimation, modalOpenAnimation, modalCloseAnimation } from "@app/stitches.config"

export const ModalOverlay = styled('div', {
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 228,
    opacity: 0,
    animation: `${fadeInAnimation} 0.3s forwards`,
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.02)',
    background: 'rgba(43, 46, 69, 0.3)',
    boxShadow: '0px 4px 24px 0px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(12px)',
  
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
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.02)',
    padding: '16px',
    borderRadius: '16px',
    width: '300px',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 50,
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
          padding: '30px',
          width: '300px !important',
          fontFamily: 'var(--font-pro-display)',
        }
      }
    }
})