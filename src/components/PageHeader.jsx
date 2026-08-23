import styles from './PageHeader.module.css'

export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className={styles.pageHeader}>
      <div className={`${styles.pageHeaderInner} ${action ? styles.hasAction : ''}`}>
        <div className={styles.headerText}>
          <h1 className={styles.pageTitle}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {action && <div className={styles.headerAction}>{action}</div>}
      </div>
    </div>
  )
}
