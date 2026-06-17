import styles from './PageBanner.module.css'

export default function PageBanner({ title, subtitle }) {
  return (
    <div className={styles.banner} role="banner">
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  )
}
