import { useTranslation } from 'react-i18next'

import { Loader } from '@/shared/ui/Loader/Loader'

import styles from './coming-soon.module.css'

export const ComingSoon = () => {
  const { t } = useTranslation('global')

  return (
    <div className={styles.root}>
      <div className={styles.title}>{t('coming_soon')}</div>
      <Loader speed="slow" />
    </div>
  )
}
