import styles from './progress-bar.module.css'

export const ClickerProgressBar = ({
  levelProgress,
}: {
  levelProgress: number
}) => {
  return (
    <div className={styles.root}>
      <div
        className={styles.progressFill}
        style={{
          width: `${levelProgress}%`,
        }}
      ></div>
    </div>
  )
}
