import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

  return (
    <div className="page-animate">
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className="container">
          <div className={styles.heroContent}>
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
        <div className={styles.introDots} aria-hidden="true">
          <span /><span /><span />
        </div>
        <p className={styles.introText}>
          Este é um espaço inteiramente dedicado ao estudo, pesquisa e divulgação do cavaquinho brasileiro, seus intérpretes e compositores. Aqui você encontrará partituras, perfis biográficos de cavaquinistas e compositores, trabalhos acadêmicos e muito mais. Nossa proposta é que sejamos um espaço para troca e diálogo, em que estamos abertos para receber críticas e sugestões visando ampliar e melhorar nosso trabalho. Além disso, este é um "portal vivo", que frequentemente será atualizado com novos arquivos e informações. Agradecemos sua visita e contamos com a colaboração e parceria de todas as pessoas para que possamos assim ter uma memória e história do cavaquinho brasileiro mais ampla e diversa do jeito que é a nossa cultura.
        </p>
        <p className={styles.introViva}>Viva o Cavaquinho Brasileiro!</p>
      </section>

      {/* Cards */}
      <section className={styles.highlights} aria-label="Seções do acervo">
        <div className="container">
          <div className={styles.grid}>
            {cards.map(c => (
              <button
                key={c.to}
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
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
