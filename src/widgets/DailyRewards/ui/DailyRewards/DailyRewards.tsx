import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@shared/ui/Button';
import { DailyRewardsModal } from '@features/DailyRewardsModal/DailyRewardsModal';

export const DailyRewards = () => {
  const { t } = useTranslation('pages');
  const [dailyOpen, setDailyOpen] = useState(false);

  return (
    <>
      <Button variant="primary" size='medium' onClick={() => setDailyOpen(true)}>
        {t('profile.daily_rewards')}
      </Button>
      <DailyRewardsModal open={dailyOpen} onClose={() => setDailyOpen(false)} />
    </>
  );
};