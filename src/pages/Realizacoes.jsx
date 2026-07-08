import { useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import Seo from '../components/Seo'
import styles from './SobrePage.module.css'

export default function Realizacoes() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="page-animate">
      <Seo
        title="Realizações"
        description="Festival Memória do Cavaquinho Brasileiro, publicações, palestras e eventos que celebram o cavaquinho e seus intérpretes."
        path="/realizacoes"
      />
      <PageBanner title="Realizações" subtitle="Festival, Publicações e Eventos" />
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.placeholder}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <h4>Festival Memória do Cavaquinho Brasileiro</h4>
            <p>Três edições realizadas: Rio de Janeiro (2022), Rio de Janeiro (2023) e São João del-Rei, MG (2023). Informações sobre as próximas edições serão publicadas em breve.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
