import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ResolvedMission } from '@app/stores/missions';

import { Card } from '@shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { Label } from '@shared/ui/Label';
import { DailyRewardsModal } from '@features/DailyRewardsModal/DailyRewardsModal';


interface IDailyMissionCardProps extends Pick<ResolvedMission, 'icon_url' | 'start_date' | 'end_date' | 'resolved_status'> {}

export const DailyMissionCard: FC<IDailyMissionCardProps> = ({
  icon_url,
  start_date,
  end_date,
}) => {
  const { t } = useTranslation('global');
  const [dailyOpen, setDailyOpen] = useState(false);

  return (
    <>
      <Card 
        variant={'active'}
        slotStart={<SlotStart {...{ icon_url, start_date, end_date }} />}
        slotEnd={<Label variant="primary">{t('check_in')}</Label>}
        slotTitle={t('daily_rewards')}
        slotDescription={t('daily_rewards_short_description')}
        onClick={() => setDailyOpen(true)}
      />
      <DailyRewardsModal open={dailyOpen} onClose={() => setDailyOpen(false)}/>
    </>
  );
};

const SlotStart = ({
  icon_url,
  start_date,
  end_date,
}: Pick<ResolvedMission, 'icon_url' | 'start_date' | 'end_date'>) => {
  return (
    <Avatar 
      src={icon_url || ''} 
      size={40} 
      start_date={start_date} 
      end_date={end_date} 
    />
  );
};
