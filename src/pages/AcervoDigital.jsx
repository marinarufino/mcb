import { useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import styles from './SobrePage.module.css'

const CANAL_YOUTUBE = 'https://www.youtube.com/@Mem%C3%B3riadoCavaquinhoBrasileiro'

export default function AcervoDigital() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="page-animate">
      <Seo
        title="Acervo Digital"
        description="O acervo digital do Memória do Cavaquinho Brasileiro: gravações, homenagens a cavaquinistas e registros em vídeo, reunidos no nosso canal do YouTube."
        path="/biblioteca/acervo-digital"
      />
      <PageHeader title="Acervo Digital" subtitle="Biblioteca · Gravações e Fotografias" />
      <div className={`${styles.content} ${styles.contentTight}`}>
        <div className={styles.inner}>
          <div className={`${styles.placeholder} ${styles.placeholderTight}`}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
              <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02"/>
            </svg>
            <h4>Acesse nosso acervo digital</h4>
            <p>
              Gravações, homenagens a cavaquinistas de várias gerações e registros
              em vídeo estão reunidos no nosso canal do YouTube. Acesse e acompanhe!
            </p>
            <div className={styles.placeholderAcao}>
              <a
                className="btn btn-primary"
                href={CANAL_YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02"/>
                </svg>
                Acessar o canal no YouTube ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
