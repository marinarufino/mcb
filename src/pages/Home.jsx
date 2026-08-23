import { useEffect } from 'react'
import NewsletterSection from '../components/NewsletterSection'
import { missao, visao, valores } from '../data/principios'
import Seo from '../components/Seo'
import styles from './Home.module.css'

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Reveal suave ao entrar na viewport
  useEffect(() => {
    const els = document.querySelectorAll(`.${styles.reveal}`)
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(el => el.classList.add(styles.isVisible))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.isVisible)
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="page-animate">
      <Seo
        description="Acervo, Centro de Pesquisas e Estudos do Cavaquinho no Brasil. Partituras, perfis de cavaquinistas e compositores, trabalhos acadêmicos e história do instrumento."
        path="/"
      />
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroKicker}>Música · História · Memória</span>
            <h1 className={styles.heroTitle}>
              Memória do
              <span>Cavaquinho Brasileiro</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Acervo, Centro de Pesquisas e Estudos do Cavaquinho no Brasil
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className={styles.intro}>
        <div className={`${styles.introDots} ${styles.reveal}`} aria-hidden="true">
          <span /><span /><span />
        </div>
        <p className={`${styles.introText} ${styles.reveal}`}>
          Este é um espaço inteiramente dedicado ao estudo, pesquisa e divulgação do cavaquinho brasileiro, seus intérpretes e compositores. Aqui você encontrará partituras, perfis biográficos de cavaquinistas e compositores, trabalhos acadêmicos e muito mais. Nossa proposta é que sejamos um espaço para troca e diálogo, em que estamos abertos para receber críticas e sugestões visando ampliar e melhorar nosso trabalho. Além disso, este é um "portal vivo", que frequentemente será atualizado com novos arquivos e informações. Agradecemos sua visita e contamos com a colaboração e parceria de todas as pessoas para que possamos assim ter uma memória e história do cavaquinho brasileiro mais ampla e diversa do jeito que é a nossa cultura.
        </p>
        <p className={`${styles.introViva} ${styles.reveal}`}>Viva o Cavaquinho Brasileiro!</p>
      </section>

      {/* Novidades / Newsletter — "O Portal Vivo" */}
      <NewsletterSection />

      {/* Princípios — Missão / Visão / Valores */}
      <section className={styles.principios} aria-label="Nossos princípios">
        <div className="container">
          {/* Missão — declaração central */}
          <p className={`${styles.missaoStatement} ${styles.reveal}`}>
            <span className={styles.principioLabel}>Missão</span>
            {missao}
          </p>

          {/* Visão + Valores em duas colunas */}
          <div className={styles.principiosBody}>
            <div className={`${styles.principioBlock} ${styles.reveal}`}>
              <span className={styles.principioLabel}>Visão</span>
              <p className={styles.visaoText}>{visao}</p>
            </div>
            <div className={`${styles.principioBlock} ${styles.reveal}`} style={{ transitionDelay: '0.08s' }}>
              <span className={styles.principioLabel}>Valores</span>
              <ul className={styles.valoresList}>
                {valores.map(v => (
                  <li key={v}>{v.replace(/;$/, '')}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
