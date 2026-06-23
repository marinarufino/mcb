import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { compositores } from '../data/compositores'
import styles from './CompositorPerfil.module.css'

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="80" height="80">
    <circle cx="12" cy="8" r="5"/><path d="M3 21c0-5 4-9 9-9s9 4 9 9"/>
  </svg>
)

export default function CompositorPerfil() {
  const { id } = useParams()
  const navigate = useNavigate()
  const c = compositores.find(x => x.id === id)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!c) {
    return (
      <div className={styles.notFound}>
        <p>Compositor não encontrado.</p>
        <button onClick={() => navigate('/compositores')}>← Voltar</button>
      </div>
    )
  }

  const anoNasc = c.nascimento ? c.nascimento.split('/')[2] : null
  const anoFalec = c.falecimento ? c.falecimento.split('/')[2] : null

  return (
    <div className="page-animate">
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <h1 className={styles.pageTitle}>Compositores</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Caminho">
            <span className={styles.breadcrumbIcon} aria-hidden="true">&#9632;</span>
            <Link to="/" className={styles.breadcrumbLink}>Início</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <Link to="/compositores" className={styles.breadcrumbLink}>Compositores</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <span className={styles.breadcrumbCurrent}>{c.nome.toUpperCase()}</span>
          </nav>

          {/* Perfil */}
          <div className={styles.profile}>
            {/* Coluna esquerda: foto + naturalidade */}
            <div className={styles.left}>
              <div className={styles.photoWrap}>
                {c.foto
                  ? <img src={c.foto} alt={c.nome} className={styles.photo} />
                  : <div className={styles.photoPlaceholder}><PersonIcon /></div>
                }
              </div>
              {c.localNascimento && (
                <div className={styles.naturalidade}>
                  <span className={styles.naturalidadeLabel}>Naturalidade</span>
                  <span className={styles.naturalidadeVal}>{c.localNascimento}</span>
                </div>
              )}
            </div>

            {/* Coluna direita: verbete */}
            <div className={styles.right}>
              <span className={styles.verbeteLabel}>VERBETE</span>
              <h2 className={styles.nome}>{c.nome}</h2>

              <div className={styles.datas}>
                {c.nascimento && (
                  <p>N. <strong>{c.nascimento}</strong></p>
                )}
                {c.falecimento && (
                  <p>F. <strong>{c.falecimento}</strong></p>
                )}
              </div>

              {c.afinacao && (
                <p className={styles.afinacao}>
                  <strong>Afinação:</strong> {c.afinacao}
                </p>
              )}

              <hr className={styles.divider} />

              {c.nomeCompleto && (
                <p className={styles.nomeCompleto}><em>{c.nomeCompleto}</em></p>
              )}

              <div className={styles.bio}>
                {c.bio.split('\n').map((p, i) => <p key={i}>{p}</p>)}
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
            ← Voltar para Compositores
          </Link>

        </div>
      </div>
    </div>
  )
}
