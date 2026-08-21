import { useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import { useHistoria } from '../lib/content'
import styles from './SobrePage.module.css'

export default function Historia() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const h = useHistoria()

  return (
    <div className="page-animate">
      <Seo
        title="História"
        description="A trajetória da Memória do Cavaquinho Brasileiro e a história do cavaquinho como instrumento central da música popular brasileira."
        path="/historia"
      />
      <PageHeader
        title={(h && h.titulo) || 'História'}
        subtitle={(h && h.subtitulo) || 'Conheça Nossa Trajetória'}
      />
      <div className={styles.content}>
        <div className={styles.inner}>
          {h === null ? (
            <p className={styles.longText}>Carregando…</p>
          ) : (
            (h.paragrafos || []).map((p, i) => (
              <p className={styles.longText} key={i}>{p}</p>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
