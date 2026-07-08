import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NewsletterSection from '../components/NewsletterSection'
import { missao, visao, valores } from '../data/principios'
import Seo from '../components/Seo'
import styles from './Home.module.css'

const icons = {
  partituras: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  ),
  compositores: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  biblioteca: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  realizacoes: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
}

const cards = [
  { icon: 'partituras', to: '/partituras', title: 'Banco de Partituras', desc: 'A música feita para cavaquinho. Partituras originais e arranjos de compositores brasileiros.' },
  { icon: 'compositores', to: '/compositores', title: 'Compositores', desc: 'Cavaquinistas e compositores que moldaram a história do instrumento no Brasil.' },
  { icon: 'biblioteca', to: '/biblioteca', title: 'Biblioteca', desc: 'Acervo de gravações raras, fotografias, textos acadêmicos e métodos de cavaquinho.' },
  { icon: 'realizacoes', to: '/realizacoes', title: 'Realizações', desc: 'Festival Memória do Cavaquinho Brasileiro, publicações, palestras e eventos.' },
]

export default function Home() {
  const navigate = useNavigate()

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

      {/* Novidades / Newsletter */}
      <NewsletterSection />

      {/* Cards — Acervo */}
      <section className={styles.highlights} aria-label="Seções do acervo">
        <div className="container">
          <div className={`${styles.sectionHead} ${styles.reveal}`}>
            <span className={styles.sectionKicker}>Explore</span>
            <h2 className={styles.sectionTitle}>O Acervo</h2>
          </div>
          <div className={styles.grid}>
            {cards.map((c, i) => (
              <div
                key={c.to}
                className={`${styles.cardWrap} ${styles.reveal}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <button
                  className={styles.card}
                  onClick={() => navigate(c.to)}
                  aria-label={`Ir para ${c.title}`}
                >
                  <div className={styles.cardIcon} aria-hidden="true">
                    {icons[c.icon]}
                  </div>
                  <h3 className={styles.cardTitle}>{c.title}</h3>
                  <p className={styles.cardDesc}>{c.desc}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
