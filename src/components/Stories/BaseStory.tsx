import { styled } from '@/core/stitches.config';


export const StoryContainer = styled('div', {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '2rem 1.2rem',
    backgroundColor: 'rgba(11, 12, 20, 0.25)',
    color: '#fff',
    zIndex: 1,
  });
  
export const Content = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'center',
    height: '100%',
  });
  
export const Title = styled('h1', {
    fontFamily: 'Tektur, sans-serif',
    fontWeight: 'bold',
    fontSize: '2.5rem',
    marginTop: '1.2rem',
    marginBottom: '1.5rem',
    whiteSpace: 'pre-line',
    textShadow: '0px 0px 25px rgba(11, 12, 20, 0.3)',
  });
  
export const Description = styled('p', {
    fontFamily: 'SF Pro Display, sans-serif',
    fontSize: '1rem',
    lineHeight: 1.5,
    marginBottom: '1.5rem',
    whiteSpace: 'pre-line',
    textShadow: '0px 0px 25px rgba(11, 12, 20, 0.3)',
  });
  
export const Button = styled('div', {
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
    margin: 'auto 16px',
    fontFamily: 'SF Pro Display, sans-serif',
    fontWeight: 400,
    fontSize: '1.2rem',
    color: '#fff',
  });



export const BaseStory: React.FC<{
  title?: string;
  description?: string;
  additionalDescription?: string;
  cta?: string;
  children?: React.ReactNode;
}> = ({ title, description, children }: {
  title?: string;
  description?: string;
  additionalDescription?: string;
  cta?: string;
  children?: React.ReactNode;
}) => {

  return (
    <StoryContainer>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>  
        {children}
      </Content>
    </StoryContainer>
  );
};

export const createStory = ({
  url,
  type,
  duration = 5000,
  title,
  description,
  actionText,
  next,
  children,
}: {
  url: string;
  type: string;
  duration?: number;
  title?: string;
  description?: string;
  additionalDescription?: string;
  actionText?: string;
  cta?: string;
  next: () => void;
  children?: React.ReactNode;
  }) => {
  return {
    url,
    type,
    duration,
    header: (
      <BaseStory
        title={title}
        description={description}>
          {children}
      </BaseStory>
    ),
    seeMore: <Button>{actionText}</Button>,
    onSeeMoreClick: next,
  };
}; 