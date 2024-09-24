import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@shared/ui/Button'
import { DailyRewardsModal } from '../DailyRewardsModal/DailyRewardsModal'

export const DailyRewards = () => {
    const [dailyOpen, setDailyOpen] = useState(false)
    const { t } = useTranslation('pages')

    return (
        <>
            <Button variant="purpleGradient" onClick={() => setDailyOpen(true)}>
                {t('profile.daily_rewards')}
            </Button>
            <DailyRewardsModal open={dailyOpen} onClose={() => setDailyOpen(false)} />
        </>
    )
}