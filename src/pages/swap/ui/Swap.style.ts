import { SwapIcon as SwapIconSvg } from '@/shared/assets/icons'
import { styled } from '@/app/stitches.config'
import { Button } from '@/shared/ui/Button'

export const Inputs = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '40px'
})
  
export const ToggleButton = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  cursor: 'pointer',
})
  
export const SwapIcon = styled(SwapIconSvg, {
  fill: '#fff',
  width: '24px',
  height: '24px',
});

export const DirectionIndicator = styled('div', {
  textAlign: 'center',
  margin: '10px 0',
  color: '#9ca3af',
  fontSize: '14px',
});

export const SwapButton = styled(Button, {
  margin: "20px 0"
})