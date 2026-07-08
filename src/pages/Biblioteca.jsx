import { useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import Seo from '../components/Seo'
import styles from './SobrePage.module.css'

export default function Biblioteca() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="page-animate">
      <Seo
        title="Biblioteca"
        description="Acervo digital do cavaquinho brasileiro: gravações raras, fotografias históricas, textos acadêmicos e métodos de cavaquinho."
        path="/biblioteca"
      />
      <PageBanner title="Biblioteca" subtitle="Acervo Digital do Cavaquinho Brasileiro" />
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.placeholder}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <h4>Acervo em organização</h4>
            <p>Gravações raras, fotografias históricas, textos acadêmicos e métodos de cavaquinho serão disponibilizados em breve nesta seção.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
