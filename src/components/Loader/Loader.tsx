import { FC } from 'react'

import cn from 'classnames'

import styles from './loader.module.css'

interface LoaderProps {
  speed: 'fast' | 'slow'
  style?: React.CSSProperties
}

export const Loader: FC<LoaderProps> = ({ speed = 'fast', style }) => (
  <div className={cn(styles.root, speed === 'slow' && styles.comingSoon)}>
    <div style={style} className={`${styles.loader} ${styles[speed]}`}></div>
  </div>
)
