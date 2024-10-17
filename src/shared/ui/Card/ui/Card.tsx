import { FC } from 'react';

import * as S from './Card.styles';

export type CardVariant = 'default' | 'active' | 'disabled';

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: CardVariant;
  slotStart?: React.ReactNode;
  slotTitle: string;
  slotDescription: string;
  slotEnd?: React.ReactNode;
}


export const Card: FC<ICardProps> = ({
  variant = 'default',
  slotStart,
  slotTitle,
  slotDescription,
  slotEnd,
  ...props
}) => {
  return (
    <S.Card {...props} variant={variant}>
      <S.Info>
        {slotStart}
        <S.Content>
          <S.Title>{slotTitle}</S.Title>
          <S.Description>{slotDescription}</S.Description>
        </S.Content>
      </S.Info>
      {slotEnd}
    </S.Card>
  );
};