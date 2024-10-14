import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BlurBackdrop } from '@shared/ui/BlurBackdrop';

import * as S from './InviteFriendsCard.styles';
import CasesPng from '@shared/assets/cases.png';
import QuarkIcon from '@shared/assets/quark.svg?react';

const levels = [
  { name: 'protostar', for_friend: '1k', premium: '5k' },
  { name: 'brown_dwarf', for_friend: '5k', premium: '9k' },
  { name: 'red_dwarf', for_friend: '10k', premium: '14k' },
  { name: 'white_dwarf', for_friend: '15k', premium: '19k' },
  { name: 'red_giant', for_friend: '20k', premium: '24k' },
  { name: 'blue_giant', for_friend: '25k', premium: '29k' },
  { name: 'blue_supergiant', for_friend: '30k', premium: '34k' },
  { name: 'neutron_star', for_friend: '35k', premium: '39k' },
  { name: 'supernova', for_friend: '40k', premium: '44k' },
  { name: 'black_hole', for_friend: '45k', premium: '49k' },
];

export const InviteFriendsCard = () => {
  const { t } = useTranslation('global');
  const [isOpen, setIsOpen] = useState(false);
  const btnText = isOpen ? t('hide_all_bonuses') : t('see_more_bonuses');
  
  const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement, Event>) => {
    setIsOpen(event.currentTarget.open);
  };

  const handleClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <S.Details open={isOpen} onToggle={handleToggle}>
        <S.DetailsSummary>
          <BlurBackdrop variant="blue">
            <S.Image src={CasesPng} width={60} height={60} />
          </BlurBackdrop>
          <S.Content>
            <S.Title>{t('invite_friends')}</S.Title>
            <S.Description>
              <S.Reward>
                <S.RewardIcon as={QuarkIcon} />
                5,000+
              </S.Reward>
              {t('quarks_for_you_and_your_friend')}
            </S.Description>
          </S.Content>
        </S.DetailsSummary>
        <S.DetailsContent>
          <S.Title>{t('bonuses_for_raising_the_level')}</S.Title>
          <S.Table>
            <tr>
              <S.TableHeader>{t('level')}</S.TableHeader>
              <S.TableHeader>{t('for_friend')}</S.TableHeader>
              <S.TableHeader>{t('premium')}</S.TableHeader>
            </tr>
            {levels.map((level) => (
              <S.TableRow key={level.name}>
                <S.TableData>{t(`levels.${level.name}`)}</S.TableData>
                <S.TableData>
                  <S.Reward>
                    <S.RewardIcon as={QuarkIcon} />
                    {level.for_friend}
                  </S.Reward>
                </S.TableData>
                <S.TableData>
                  <S.Reward>
                    <S.RewardIcon as={QuarkIcon} />
                    {level.premium}
                  </S.Reward>
                </S.TableData>
              </S.TableRow>
            ))}
          </S.Table>
        </S.DetailsContent>
      </S.Details>
      <S.Button type="button" onClick={handleClick}>{btnText}</S.Button>
    </>
  );
};
