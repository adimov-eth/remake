import { styled } from '@/core/stitches.config';
import { star, quark } from '@/assets';
import { SwapCurrencyIcon } from '@/assets/icons';

export const Root = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2000,
  backgroundColor: 'rgba(11, 12, 20, 1)',

  '& > div': {
    backgroundColor: 'transparent',
  },

  '& video': {
    height: '100% !important',
  },
  '& video + div': {
    display: 'none',
  },
});

export const CTA = styled('div', {
  fontFamily: 'Tektur',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '25px',
  lineHeight: '30px',
  whiteSpace: 'pre-line',
  textShadow: '0px 0px 6.6px rgba(255, 255, 255, 0.3), 0px 0px 25px rgba(11, 12, 20, 0.3)',
});

/* Rectangle 115 */

export const BottomDescription = styled('p', {
  fontFamily: 'SF Pro Display, sans-serif',
  fontSize: '1rem',
  lineHeight: 1.5,
  marginTop: 'auto',
  marginBottom: '120px',
  color: '#fff',
  whiteSpace: 'pre-line',
  textShadow: '0px 0px 25px rgba(11, 12, 20, 0.3)',
});

export const BottomDescriptionBackdrop = styled('div', {
  position: 'absolute',
  width: '100%',
  height: '400px',
  bottom: '0',
  background: 'rgba(41, 17, 129, 0.6)',
  filter: 'blur(20px)',
  zIndex: -1,
});

export const StarIconWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  height: '200px',
  marginTop: '2rem',

  '& > *': {
    position: 'absolute',
    width: '27px',
    height: '27px',
    borderRadius: '4px',
  },

  '& > :nth-child(1)': {
    left: '15%',
    top: '40%',
  },

  '& > :nth-child(2)': {
    right: '10%',
    top: '10%',
  },

  '& > :nth-child(3)': {
    left: '50%',
    bottom: '30%',
  },
});

export const Swap = () => (
  <SwapInterface>
    <Frame>
      <FrameTitle>Sell</FrameTitle>
      <AmountFrame>
        <Amount>29840,56</Amount>
        <CurrencyFrame>
          <MaxButton>Max</MaxButton>
          <Currency>
            <QuarkIcon></QuarkIcon>
            <CurrencyName>QRK</CurrencyName>
          </Currency>
        </CurrencyFrame>
      </AmountFrame>
    </Frame>
    <SwapIcon />
    <Frame>
      <FrameTitle>Buy</FrameTitle>
      <AmountFrame>
        <Amount>42,3</Amount>
        <CurrencyFrame>
          <MaxButton>Max</MaxButton>
          <Currency>
            <StarIcon></StarIcon>
            <CurrencyName>STR</CurrencyName>
          </Currency>
        </CurrencyFrame>
      </AmountFrame>
    </Frame>
  </SwapInterface>
);

const SwapInterface = styled('div', {
  position: 'absolute',
  bottom: '25%',
  width: '100%',
  padding: '0 16px',
  height: '202px',
});

const Frame = styled('div', {
  width: '100%',
  height: '96px',
  backgroundColor: 'rgba(13, 15, 32, 0.9)',
  borderRadius: '10px',
  marginBottom: '10px',
  padding: '20px 16px',
});

export const FrameTitle = styled('div', {
  fontFamily: 'SF Pro, sans-serif',
  fontWeight: 400,
  fontSize: '16px',
  color: 'rgba(255, 255, 255, 1)',
  textAlign: 'left',
});

export const AmountFrame = styled('div', {
  display: 'flex',
  fontFamily: 'SF Pro, sans-serif',
  fontWeight: 400,
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '10px',
});

export const Amount = styled('span', {
  fontFamily: 'SF Pro, sans-serif',
  fontSize: '24px',
  color: 'rgba(255, 255, 255, 1)',
});

export const CurrencyFrame = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const MaxButton = styled('button', {
  width: '42px',
  height: '22px',
  backgroundColor: 'rgba(46, 85, 251, 1)',
  borderRadius: '5px',
  fontFamily: 'SF Pro Display, sans-serif',
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 1)',
  border: 'none',
  cursor: 'pointer',
  marginRight: '6px',
});

export const Currency = styled('div', {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(28, 31, 48, 1)',
  borderRadius: '12px',
  padding: '5px 10px',
});

const Icon = styled('div', {
  width: '18px',
  height: '18px',
  marginRight: '4px',
});

export const QuarkIcon = styled(Icon, {
  background: `url(${quark}) no-repeat center center`,
  borderRadius: '50%',
});

export const StarIcon = styled(Icon, {
  background: `url(${star}) no-repeat center center`,
  backgroundSize: 'contain',
});

export const CurrencyName = styled('span', {
  fontFamily: 'SF Pro Display, sans-serif',
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 1)',
});

const SwapIcon = styled(SwapCurrencyIcon, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40px !important',
  height: '40px !important',
  fill: 'rgba(255, 255, 255, 1)',
});
