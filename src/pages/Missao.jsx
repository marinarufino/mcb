import { useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import styles from './SobrePage.module.css'

export default function Missao() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="page-animate">
      <PageBanner title="Missão" subtitle="O Que Norteia o Nosso Trabalho" />
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.audioWrap}>
            <audio controls preload="none" style={{ width: '100%' }} aria-label="Áudio sobre a missão">
              <source src="#" type="audio/mpeg" />
            </audio>
          </div>
          <div className={styles.section}>
            <h3>Missão</h3>
            <p>Reunir, organizar e divulgar informações sobre a cultura do Cavaquinho Brasileiro. Promover eventos visando uma maior integração entre músicos e a história do instrumento.</p>
          </div>
          <div className={styles.section}>
            <h3>Visão</h3>
            <p>Ser um centro de referência da pesquisa e estudo do Cavaquinho Brasileiro e sua complexidade em espaço digital e físico.</p>
          </div>
          <div className={styles.section}>
            <h3>Valores</h3>
            <ul>
              {['Propagar conhecimentos;', 'União e colaboração;', 'Abertura e respeito ao diálogo;', 'Paixão pelo Cavaquinho e pela Música Brasileira;', 'Compromisso com a preservação da memória cultural;', 'Rigor na pesquisa e documentação histórica.'].map(v => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
