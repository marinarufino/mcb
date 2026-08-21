import { useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import styles from './SobrePage.module.css'

const CAMPANHA = 'https://benfeitoria.com/projeto/memoriadocavaquinho'

export default function Colabore() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="page-animate">
      <Seo
        title="Colabore"
        description="Colabore com o Memória do Cavaquinho Brasileiro e ajude a manter vivo o acervo de partituras, gravações e pesquisas sobre o cavaquinho no Brasil."
        path="/colabore"
      />
      <PageHeader title="Colabore" subtitle="Ajude a Manter Viva a Memória do Cavaquinho" />
      <div className={`${styles.content} ${styles.contentTight}`}>
        <div className={styles.inner}>
          <div className={`${styles.placeholder} ${styles.placeholderTight}`}>
            <h4>Faça parte deste acervo</h4>
            <p>
              O Memória do Cavaquinho Brasileiro reúne partituras, gravações raras,
              fotografias e pesquisas que só existem porque há quem acredite neste
              trabalho. Sua colaboração ajuda a manter o acervo acessível, gratuito
              e em crescimento — e a levar a história do cavaquinho a novos públicos.
            </p>
            <div className={styles.placeholderAcao}>
              <a
                className="btn btn-primary"
                href={CAMPANHA}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"/>
                </svg>
                Colaborar no Benfeitoria ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
