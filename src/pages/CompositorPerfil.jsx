import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useCavaquinistas } from '../lib/content'
import styles from './CompositorPerfil.module.css'

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="80" height="80">
    <circle cx="12" cy="8" r="5"/><path d="M3 21c0-5 4-9 9-9s9 4 9 9"/>
  </svg>
)

export default function CompositorPerfil() {
  const { id } = useParams()
  const navigate = useNavigate()
  const compositores = useCavaquinistas()
  const c = compositores ? compositores.find(x => x.id === id) : null

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (compositores === null) {
    return <div className={styles.notFound}><p>Carregando…</p></div>
  }

  if (!c) {
    return (
      <div className={styles.notFound}>
        <p>Cavaquinista não encontrado.</p>
        <button onClick={() => navigate('/compositores')}>← Voltar</button>
      </div>
    )
  }

  return (
    <div className="page-animate">
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <h1 className={styles.pageTitle}>Cavaquinistas</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Caminho">
            <span className={styles.breadcrumbIcon} aria-hidden="true">&#9632;</span>
            <Link to="/" className={styles.breadcrumbLink}>Início</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <Link to="/compositores" className={styles.breadcrumbLink}>Cavaquinistas</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <span className={styles.breadcrumbCurrent}>{c.nome.toUpperCase()}</span>
          </nav>

          {/* Perfil */}
          <div className={styles.profile}>
            {/* Coluna esquerda: foto + ficha */}
            <div className={styles.left}>
              <div className={styles.photoWrap}>
                {c.foto
                  ? <img src={c.foto} alt={c.nome} className={styles.photo} />
                  : <div className={styles.photoPlaceholder}><PersonIcon /></div>
                }
              </div>
              <dl className={styles.facts}>
                {c.localNascimento && (
                  <div className={styles.factRow}>
                    <dt>Naturalidade</dt><dd>{c.localNascimento}</dd>
                  </div>
                )}
                {c.nascimento && (
                  <div className={styles.factRow}>
                    <dt>Nascimento</dt><dd>{c.nascimento}</dd>
                  </div>
                )}
                {c.falecimento && (
                  <div className={styles.factRow}>
                    <dt>Falecimento</dt><dd>{c.falecimento}</dd>
                  </div>
                )}
                {c.afinacao && (
                  <div className={styles.factRow}>
                    <dt>Afinação</dt><dd>{c.afinacao}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Coluna direita: verbete */}
            <div className={styles.right}>
              <span className={styles.verbeteLabel}>VERBETE</span>
              <h2 className={styles.nome}>{c.nome}</h2>
              {c.nomeCompleto && (
                <p className={styles.nomeCompleto}><em>{c.nomeCompleto}</em></p>
              )}

              <hr className={styles.divider} />

              <div className={styles.bio}>
                {(c.bio || '').split('\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {c.obras && c.obras.length > 0 && (
                <div className={styles.obras}>
                  <h3 className={styles.obrasTitle}>Obras</h3>
                  <ul className={styles.obrasList}>
                    {c.obras.map(o => (
                      <li key={o.title}>
                        <span>{o.title}</span>
                        <span className={styles.obraYear}>{o.year}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <Link to="/compositores" className={styles.backLink}>
            ← Voltar para Cavaquinistas
          </Link>

        </div>
      </div>
    </div>
  )
}
