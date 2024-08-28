import { styled } from '@/core/stitches.config';

export const StoryContainer = styled('div', {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '2rem',
    backgroundColor: 'rgba(11, 12, 20, 0.1)',
    color: '#fff',
    zIndex: 1,
  });
  
export const Content = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%',
  });
  
export const Title = styled('h1', {
    fontFamily: 'Tektur, sans-serif',
    fontWeight: 'bold',
    fontSize: '2.5rem',
    marginBottom: '1rem',
  });
  
export const Description = styled('p', {
    fontFamily: 'SF Pro Display, sans-serif',
    fontSize: '1.1rem',
    lineHeight: 1.5,
    marginBottom: '1rem',
  });
  
export const CTA = styled('div', {
    fontFamily: 'Tektur',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '25px',
    lineHeight: '30px',
    textShadow: '0px 0px 6.6px rgba(255, 255, 255, 0.49)',
  });
  
  
export const Button = styled('button', {
    width: '100%',
    height: '54px',
    background: 'linear-gradient(0deg, rgba(28, 231, 253, 1) 0%, rgba(54, 90, 229, 1) 100%)',
    borderRadius: '14px',
    boxShadow: '0px 0px 5px rgba(42, 158, 241, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    marginTop: 'auto',
    fontFamily: 'SF Pro Display, sans-serif',
    fontWeight: 400,
    fontSize: '1.2rem',
    color: '#fff',
  });


export const AdditionalDescription = styled('p', {
  fontFamily: 'SF Pro Display, sans-serif',
  fontSize: '1rem',
  lineHeight: 1.5,
  marginTop: '1rem',
  color: '#fff',
});