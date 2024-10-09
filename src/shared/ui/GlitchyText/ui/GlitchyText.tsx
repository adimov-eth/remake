import { useState, useEffect } from 'react';

import * as S from './GlitchyText.styles';

interface IGlitchyTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  delay?: number;
  children: React.ReactNode | string;
  props?: React.HTMLAttributes<HTMLSpanElement>;
}

export const GlitchyText: React.FC<IGlitchyTextProps> = ({
  delay = 15000, 
  children, 
  ...props 
}) => { 
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  const handleAnimationEnd = () => {
    setIsAnimationEnabled(false);
  };

  const switchGlitchAnimation = () => {
    setIsAnimationEnabled(prev => !prev);
  };

  useEffect(() => {
    const interval = setInterval(switchGlitchAnimation, delay);

    return () => clearInterval(interval);
  }, [isAnimationEnabled]);

  return (
    <S.Root 
      {...props} 
      data-text={children} 
      animation-enabled={isAnimationEnabled}
      onAnimationEnd={handleAnimationEnd}
    >
      <S.Content>{children}</S.Content>
    </S.Root>
  );
};