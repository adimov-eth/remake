import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { $gameState, $pfp, $user, $quarks, $stars } from '@app/stores/state';
import { formatNumberGroup } from '@shared/utils/formatters';

import { UserInfo } from '../UserInfo/UserInfo';
import { BalanceDisplay } from '@features/BalanceDisplay';
import { SettingsButtons } from '@features/SettingsButtons';
import { Tooltip } from '@shared/ui/Tooltip';

import * as S from './UserStatusBar.styles';

export const UserStatusBar: React.FC = () => {
  const gameState = useStore($gameState);
  const location = useLocation();
  const { t } = useTranslation('global');

  const quarks = useStore($quarks);
  const stars = useStore($stars);
  const currentRank = gameState?.levelDef.get() ?? { name: '' };
  const telegramUser = useStore($user);
  const pfp = useStore($pfp);

  if (!gameState) return null;

  const isSettingsPage = location.pathname === '/settings';
  if (isSettingsPage) return null;

  const isProfilePage = location.pathname === '/profile';
  const isShowQuarks = location.pathname !== '/';
  const rankName = t(currentRank.name);

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
          showQuarks={isShowQuarks}
          showStars={true}
        />
      }
      <Tooltip anchorId="quarks">{formatNumberGroup(Number(quarks))}</Tooltip>
      <Tooltip anchorId="stars">{Number(stars).toFixed(2)}</Tooltip>
    </S.Root>
  );
};
