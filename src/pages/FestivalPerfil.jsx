import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Seo from '../components/Seo'
import { useFestivais } from '../lib/content'
import styles from './FestivalPerfil.module.css'

function formatData(data) {
  if (!data) return ''
  try {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${data}T00:00:00`))
  } catch {
    return data
  }
}

export default function FestivalPerfil() {
  const { id } = useParams()
  const navigate = useNavigate()
  const festivais = useFestivais()
  const f = festivais ? festivais.find(x => x.id === id) : null

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (festivais === null) {
    return <div className={styles.notFound}><p>Carregando…</p></div>
  }

  if (!f) {
    return (
      <div className={styles.notFound}>
        <p>Festival não encontrado.</p>
        <button onClick={() => navigate('/festival')}>← Voltar</button>
      </div>
    )
  }

  const titulo = f.titulo || f.local
  const hoje = new Date().toISOString().slice(0, 10)
  const emBreve = f.data > hoje
  const periodo = f.dataFim && f.dataFim !== f.data
    ? `${formatData(f.data)} a ${formatData(f.dataFim)}`
    : formatData(f.data)

  return (
    <div className="page-animate">
      <Seo
        title={titulo}
        description={f.descricaoCurta || `${titulo} — ${f.local}. Programação e fotos desta edição do Festival Memória do Cavaquinho Brasileiro.`}
        path={`/festival/${f.id}`}
        image={f.capa}
      />
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <h1 className={styles.pageTitle}>Festivais</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>

          <nav className={styles.breadcrumb} aria-label="Caminho">
            <span className={styles.breadcrumbIcon} aria-hidden="true">&#9632;</span>
            <Link to="/" className={styles.breadcrumbLink}>Início</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <Link to="/festival" className={styles.breadcrumbLink}>Festivais</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <span className={styles.breadcrumbCurrent}>{titulo.toUpperCase()}</span>
          </nav>

          {f.capa && (
            <div className={styles.hero}>
              <img src={f.capa} alt={titulo} />
            </div>
          )}

          <div className={styles.header}>
            <span className={`${styles.badge} ${emBreve ? styles.badgeUpcoming : styles.badgePast}`}>
              {emBreve ? 'Em breve' : 'Realizado'}
            </span>
            <h2 className={styles.titulo}>{titulo}</h2>
            <p className={styles.meta}>{f.local} · {periodo}</p>
          </div>

          {f.descricao && f.descricao.length > 0 ? (
            f.descricao.map((p, i) => <p className={styles.descricao} key={i}>{p}</p>)
          ) : (
            f.descricaoCurta && <p className={styles.descricao}>{f.descricaoCurta}</p>
          )}

          {f.programacao && f.programacao.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Programação</h3>
              <ul className={styles.programacao}>
                {f.programacao.map((item, i) => (
                  <li key={i} className={styles.programItem}>
                    {item.horario && <span className={styles.programHorario}>{item.horario}</span>}
                    <div>
                      <p className={styles.programAtividade}>{item.atividade}</p>
                      {item.descricao && <p className={styles.programDescricao}>{item.descricao}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {f.galeria && f.galeria.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Fotos</h3>
              <div className={styles.galeria}>
                {f.galeria.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className={styles.galeriaItem}>
                    <img src={url} alt={`${titulo} — foto ${i + 1}`} loading="lazy" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <Link to="/festival" className={styles.backLink}>
            ← Voltar para Festivais
          </Link>

        </div>
      </div>
    </div>
  )
}
