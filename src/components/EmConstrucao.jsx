import { useEffect } from 'react'
import PageBanner from './PageBanner'
import styles from '../pages/SobrePage.module.css'

const GearIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

export default function EmConstrucao({ titulo, subtitulo }) {
  useEffect(() => { window.scrollTo(0, 0) }, [titulo])
  return (
    <div className="page-animate">
      <PageBanner title={titulo} subtitle={subtitulo} />
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.placeholder}>
            <GearIcon />
            <h4>Página em construção</h4>
            <p>
              Esta seção está sendo preparada e em breve trará novos conteúdos.
              Agradecemos a visita — volte logo!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
