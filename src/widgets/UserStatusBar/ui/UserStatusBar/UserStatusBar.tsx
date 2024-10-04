import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { $gameState, $pfp, $user } from '@app/stores/state';

import { UserInfo } from '../UserInfo/UserInfo';
import { BalanceDisplay } from '@features/BalanceDisplay';
import { SettingsButtons } from '@features/SettingsButtons';
import { ValueTooltip } from '@shared/ui/ValueTooltip';

import * as S from './UserStatusBar.styles';

export const UserStatusBar: React.FC = () => {
  const gameState = useStore($gameState);

  if (!gameState) return null;

  const location = useLocation();
  const { t } = useTranslation('global');
  const isProfilePage = location.pathname === '/profile';
  const showQuarks = location.pathname !== '/';

  const quarks: number = useStore(gameState.quarks);
  const stars: number = useStore(gameState.stars);

  const currentRank = gameState.levelDef.get();
  const telegramUser = useStore($user);
  const pfp = useStore($pfp);
  const rankName = t(`levels.${currentRank.name}`);

  console.log('UserStatusBar', { quarks, stars, currentRank, telegramUser, pfp, rankName });

  return (
    <S.Root>
      <UserInfo
        user={telegramUser}
        rank={rankName}
        avatar={pfp}
      />
      {isProfilePage
        ? <SettingsButtons />
        : <BalanceDisplay
          quarks={Number(quarks)}
          stars={Number(stars)}
          showQuarks={showQuarks}
          showStars={true}
        />
      }
      <ValueTooltip value={Number(quarks)} type="quarks" />
      <ValueTooltip value={Number(stars)} type="stars" />
    </S.Root>
  );
};