import Chest from '@/assets/chest.png'
import ChestWebp from '@/assets/chest.webp'
import ChestShine from '@/assets/chest-shine.png'
import styles from './Chest.module.css'

export const ChestIcon = () => {
  return (
    <>
      <div className={styles.container}>
        <picture>
          <source
            srcSet={ChestWebp}
            type="image/webp"
            width={124}
            height={129}
            className={styles.image}
          />
          <source srcSet={Chest} type="image/png" width={124} height={129} />
          <img src={Chest} alt="chest" width={124} height={129} />
        </picture>
        <img src={ChestShine} className={styles.shine} />
      </div>
    </>
  )
}
export default ChestIcon
