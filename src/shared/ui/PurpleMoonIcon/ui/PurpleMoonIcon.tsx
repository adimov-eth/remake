import PurpleMoon from '@shared/assets/purple-moon.png'
import PurpleMoonWebp from '@shared/assets/purple-moon.webp'

export const PurpleMoonIcon = () => {
  return (
    <picture>
      <source
        srcSet={PurpleMoonWebp}
        type="image/webp"
        width={129}
        height={129}
      />
      <source srcSet={PurpleMoon} type="image/png" width={129} height={129} />
      <img src={PurpleMoonWebp} alt="chest" width={129} height={129} />
    </picture>
  )
}
