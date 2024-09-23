import { styled } from '@app/stitches.config';

export const Title = styled('div', {
    fontFamily: '$proDisplay',
    fontSize: '16px',
    lineHeight: 1,
    fontWeight: 600,
    textAlign: 'center',
    color: 'white',
});

export const Tier = styled('div', {
    fontFamily: '$proDisplay',
    fontSize: '12px',
    lineHeight: 1,
    minHeight: '12px',
    fontWeight: 400,
    color: '#67718C',
    textAlign: 'center',
    margin: '4px auto 12px auto',
});

export const Description = styled('div', {
    fontFamily: '$proDisplay',
    fontSize: '14px',
    fontWeight: 400,
    minHeight: '48px',
    color: '#67718C',
    textAlign: 'center',
});

export const Divider = styled('div', {
    width: '100%',
    height: '1px',
    backgroundColor: '$grey200',
    margin: '16px 0',
});

export const Icon = styled('div', {
    background: '#1C1F30',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '16px',
    marginBottom: '10px',
});
  
export const Value = styled('div', {
    fontFamily: '$mono',
    fontSize: '14px',
    fontWeight: '500',
    color: '$textActive',
});


//Todo move modals to portal

export const Card = styled('div', {
    backgroundColor: '#14151E',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 16px 16px 16px',
  
    //   background: 'rgba(43, 46, 69, 0.3)',
    //   boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
    //   backdropFilter: 'blur(24px)',
  
    variants: {
      disabled: {
        true: {
          opacity: 0.5,
          pointerEvents: 'none',
        },
      },
    },
});
  
export const CurrencyIcon = styled('div', {
    width: '16px',
    height: '16px',
    backgroundColor: '$gray-200',
});