import { useTranslation } from 'react-i18next';
import { StoryHeader, StorySeeMore } from '../Story';

import QuarkIcon from '@shared/assets/quark.svg?react';
import StarIcon from '@shared/assets/star-gradient.svg?react';
import video from '@shared/assets/stories/swap.webm';

import * as S from './SwapStory.styles';

const Header: React.FC = () => {
  const { t } = useTranslation('stories');

  return (
    <StoryHeader title={t('swap.title')} description={t('swap.description')}>
      <S.Root>
        <S.Input>
          <S.InputLabel>Sell</S.InputLabel>
          <S.InputControl>
            <S.InputValue>29840,56</S.InputValue>
            <S.InputPostfix>
              <S.Currency>
                <S.Icon as={QuarkIcon} />
                <S.CurrencyName>QRK</S.CurrencyName>
              </S.Currency>
            </S.InputPostfix>
          </S.InputControl>
        </S.Input>
        <S.SwapIcon />
        <S.Input>
          <S.InputLabel>Buy</S.InputLabel>
          <S.InputControl>
            <S.InputValue>42,3</S.InputValue>
            <S.InputPostfix>
              <S.Currency>
                <S.Icon as={StarIcon} />
                <S.CurrencyName>STR</S.CurrencyName>
              </S.Currency>
            </S.InputPostfix>
          </S.InputControl>
        </S.Input>
      </S.Root>
    </StoryHeader>
  );
};

const SeeMore: React.FC = () => {
  const { t } = useTranslation('stories');

  return (
    <StorySeeMore>{t('button.next')}</StorySeeMore>
  );
};

export const swapStoryConfig = {
  url: video,
  type: 'video',
  header: Header,
  seeMore: SeeMore,
};