import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Seo from '../components/Seo'
import Lightbox from '../components/Lightbox'
import { useOficinas } from '../lib/content'
import styles from './OficinaPerfil.module.css'

function formatData(data) {
  if (!data) return ''
  try {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${data}T00:00:00`))
  } catch {
    return data
  }
}

export default function OficinaPerfil() {
  const { id } = useParams()
  const navigate = useNavigate()
  const oficinas = useOficinas()
  const f = oficinas ? oficinas.find(x => x.id === id) : null
  const galeria = f && f.galeria ? f.galeria : []
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  const navigateLightbox = (delta) => {
    setLightboxIndex(i => (i === null ? null : (i + delta + galeria.length) % galeria.length))
  }

  if (oficinas === null) {
    return <div className={styles.notFound}><p>Carregando…</p></div>
  }

  if (!f) {
    return (
      <div className={styles.notFound}>
        <p>Oficina não encontrada.</p>
        <button onClick={() => navigate('/realizacoes/oficinas')}>← Voltar</button>
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
    <div className="page-animate" key={f.id}>
      <Seo
        title={titulo}
        description={f.descricaoCurta || `${titulo} — ${f.local}. Programação e fotos desta oficina do Memória do Cavaquinho Brasileiro.`}
        path={`/realizacoes/oficinas/${f.id}`}
        image={f.capa}
      />
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <h1 className={styles.pageTitle}>Oficinas</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>

          <nav className={styles.breadcrumb} aria-label="Caminho">
            <span className={styles.breadcrumbIcon} aria-hidden="true">&#9632;</span>
            <Link to="/" className={styles.breadcrumbLink}>Início</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <Link to="/realizacoes/oficinas" className={styles.breadcrumbLink}>Oficinas</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <span className={styles.breadcrumbCurrent}>{titulo.toUpperCase()}</span>
          </nav>

          <div className={styles.header}>
            <span className={`${styles.badge} ${emBreve ? styles.badgeUpcoming : styles.badgePast}`}>
              {emBreve ? 'Em breve' : 'Realizada'}
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

          {galeria.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Fotos</h3>
              <div className={styles.galeria}>
                {galeria.map((foto, i) => (
                  <button
                    key={i}
                    type="button"
                    className={styles.galeriaItem}
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img src={foto.url} alt={foto.legenda || `${titulo} — foto ${i + 1}`} loading="lazy" />
                    {foto.legenda && <span className={styles.galeriaCaption}>{foto.legenda}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {lightboxIndex !== null && (
            <Lightbox
              fotos={galeria}
              index={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onNavigate={navigateLightbox}
            />
          )}

          <Link to="/realizacoes/oficinas" className={styles.backLink}>
            ← Voltar para Oficinas
          </Link>

        </div>
      </div>
    </div>
  )
}
