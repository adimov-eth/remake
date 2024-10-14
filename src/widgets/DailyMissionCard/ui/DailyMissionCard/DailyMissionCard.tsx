import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ResolvedMission } from '@app/stores/missions';

import { Avatar } from '@/shared/ui/Avatar';
import { Label } from '@shared/ui/Label';
import { DailyRewardsModal } from '@features/DailyRewardsModal/DailyRewardsModal';

import * as S from './DailyMissionCard.styles';

interface IDailyMissionCardProps extends Pick<ResolvedMission, 'icon_url' | 'start_date' | 'end_date' | 'resolved_status'> {}

export const DailyMissionCard: FC<IDailyMissionCardProps> = ({
  icon_url,
  start_date,
  end_date,
  resolved_status,
}) => {
  const { t } = useTranslation('global');
  const [dailyOpen, setDailyOpen] = useState(false);

  return (
    <>
      <S.Card status={resolved_status} onClick={() => setDailyOpen(true)}>
        <S.Info>
          <Avatar 
            src={icon_url || ''} 
            size={48} 
            start_date={start_date} 
            end_date={end_date} 
          />
          <S.Content>
            <S.Title>{t('daily_rewards')}</S.Title>
            <S.Description>{t('daily_rewards_short_description')}</S.Description>
          </S.Content>
        </S.Info>
        <Label variant="primary">{t('check_in')}</Label>
      </S.Card>
      <DailyRewardsModal open={dailyOpen} onClose={() => setDailyOpen(false)}/>
    </>
  );
};