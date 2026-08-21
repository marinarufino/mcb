import styles from './PageHeader.module.css'

export default function PageHeader({ title, subtitle }) {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.pageHeaderInner}>
        <h1 className={styles.pageTitle}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  )
}
