import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { initDataRaw } from '@app/stores/telegram';
import { useAllMissions } from '@shared/services/api/missions/model';
import { useStore } from '@nanostores/react';
import { $lastActiveNavPath } from '@app/stores/state';

import Home from '@shared/assets/home.svg?react';
import Upgrades from '@shared/assets/upgrades.svg?react';
import Swap from '@shared/assets/swap-currency.svg?react';
import Tasks from '@shared/assets/tasks.svg?react';
import Leaders from '@shared/assets/leaderboard.svg?react';
import { Badge } from '@shared/ui/Badge/ui/Badge';

import * as S from './Navigation.styles';


export const Navigation: FC = () => {
  const { t } = useTranslation('navigation');
  const activeNavPath = useStore($lastActiveNavPath);

  const rawData = initDataRaw || '';
  const { data: fetchedMissions = [] } = useAllMissions(rawData);
  const completedDailyMissions = useMemo(() => fetchedMissions.filter(mission => mission.progress_status === 'complete'), [fetchedMissions]);

  const handleClick = (path: string) => {
    $lastActiveNavPath.set(path);
  };

  return (
    <S.Nav>
      <S.NavList>
        <S.NavListItem>
          <S.NavLink to="/" active={activeNavPath === '/'} onClick={() => handleClick('/')}>
            <S.Icon><Home /></S.Icon>
            <S.NavLinkText>{t('home')}</S.NavLinkText>
          </S.NavLink>
        </S.NavListItem>

        <S.NavListItem>
          <S.NavLink to="/accelerators" active={activeNavPath === '/accelerators'} onClick={() => handleClick('/accelerators')}>
            <S.Icon><Upgrades /></S.Icon>
            <S.NavLinkText>{t('boosts')}</S.NavLinkText>
          </S.NavLink>
        </S.NavListItem>

        <S.NavListItem>
          <S.SwapButton to="/swap" onClick={() => handleClick('/swap')}>
            <S.Icon as={Swap} />
          </S.SwapButton>
        </S.NavListItem>

        <S.NavListItem>
          <S.NavLink to="/missions" active={activeNavPath === '/missions'} onClick={() => handleClick('/missions')}>
            <S.Icon><Tasks /></S.Icon>
            <S.NavLinkText>{t('missions')}</S.NavLinkText>
          </S.NavLink>
          {completedDailyMissions.length > 0 && <S.NavListItemBadge as={Badge}>{completedDailyMissions.length}</S.NavListItemBadge>}
        </S.NavListItem>

        <S.NavListItem>
          <S.NavLink to="/friends" active={activeNavPath === '/friends'} onClick={() => handleClick('/friends')}>
            <S.Icon><Leaders /></S.Icon>
            <S.NavLinkText>{t('friends')}</S.NavLinkText>
          </S.NavLink>
        </S.NavListItem>
      </S.NavList>
    </S.Nav>
  );
};