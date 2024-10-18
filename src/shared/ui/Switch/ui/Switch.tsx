import * as S from './Switch.styles';

export interface ISwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export const Switch: React.FC<ISwitchProps> = ({ 
  id, 
  ...props 
}) => (
  <S.Root>
    <S.Input type="checkbox" {...props} id={id} />
    <S.Label htmlFor={id} />
  </S.Root>
);
