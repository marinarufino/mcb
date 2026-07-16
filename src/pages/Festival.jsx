import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import Seo from '../components/Seo'
import { usePaginaFestival, useFestivais } from '../lib/content'
import styles from './Festival.module.css'
import sobreStyles from './SobrePage.module.css'

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
    <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>
  </svg>
)

function anoDe(data) {
  if (!data) return ''
  return data.slice(0, 4)
}

function formatData(data) {
  if (!data) return ''
  try {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${data}T00:00:00`))
  } catch {
    return data
  }
}

export default function Festival() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const pagina = usePaginaFestival()
  const festivais = useFestivais()

  const hoje = new Date().toISOString().slice(0, 10)

  return (
    <div className="page-animate">
      <Seo
        title="Festivais"
        description="Edições do Festival Memória do Cavaquinho Brasileiro — apresentações, oficinas e programação de cada edição."
        path="/festival"
      />
      <PageBanner
        title={(pagina && pagina.titulo) || 'Festivais'}
        subtitle={(pagina && pagina.subtitulo) || 'Encontros que Celebram o Cavaquinho'}
      />

      <div className={sobreStyles.content}>
        <div className={sobreStyles.inner}>
          {pagina === null ? (
            <p className={sobreStyles.longText}>Carregando…</p>
          ) : (
            (pagina.paragrafos || []).map((p, i) => (
              <p className={sobreStyles.longText} key={i}>{p}</p>
            ))
          )}

          {festivais === null ? (
            <p className={styles.empty}>Carregando…</p>
          ) : festivais.length === 0 ? (
            <p className={styles.empty}>Nenhum festival cadastrado.</p>
          ) : (
            <div className={styles.grid}>
              {festivais.map(f => {
                const emBreve = f.data > hoje
                const titulo = f.titulo || `${f.local} — ${anoDe(f.data)}`
                return (
                  <Link key={f.id} to={`/festival/${f.id}`} className={styles.card}>
                    <div className={styles.media}>
                      {f.capa
                        ? <img src={f.capa} alt={titulo} loading="lazy" />
                        : <CalendarIcon />
                      }
                      <span className={`${styles.badge} ${emBreve ? styles.badgeUpcoming : styles.badgePast}`}>
                        {emBreve ? 'Em breve' : 'Realizado'}
                      </span>
                    </div>
                    <div className={styles.body}>
                      <span className={styles.year}>
                        {anoDe(f.data)}
                        {f.local && <span className={styles.yearLocal}>— {f.local}</span>}
                      </span>
                      <h3 className={styles.cardTitle}>{f.titulo || f.local}</h3>
                      <span className={styles.date}>{formatData(f.data)}</span>
                      {f.descricaoCurta && <p className={styles.desc}>{f.descricaoCurta}</p>}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
