import { Loader } from '@/components/Loader/Loader'

import styles from './coming-soon.module.css'

export const ComingSoon = () => (
  <div className={styles.root}>
    <div className={styles.title}>Coming Soon</div>
    <Loader speed="slow" />
  </div>
)
