import { useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import { missao, visao, valores } from '../data/principios'
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
            <p>{missao}</p>
          </div>
          <div className={styles.section}>
            <h3>Visão</h3>
            <p>{visao}</p>
          </div>
          <div className={styles.section}>
            <h3>Valores</h3>
            <ul>
              {valores.map(v => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
