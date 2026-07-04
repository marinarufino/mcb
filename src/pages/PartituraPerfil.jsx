import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { usePartituras } from '../lib/content'
import styles from './PartituraPerfil.module.css'

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
)
const SheetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="72" height="72">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
)

// Força o download no Sanity via parâmetro ?dl=<nome>. O atributo HTML `download`
// é ignorado em arquivos de outro domínio (CDN do Sanity), então usamos o ?dl.
function downloadUrl(url, nome) {
  if (!url) return url
  const ext = url.split('?')[0].split('.').pop()
  const safeExt = ext && ext.length <= 5 ? `.${ext}` : ''
  const nomeArquivo = `${(nome || 'arquivo').trim()}${safeExt}`
  return `${url}${url.includes('?') ? '&' : '?'}dl=${encodeURIComponent(nomeArquivo)}`
}

export default function PartituraPerfil() {
  const { id } = useParams()
  const navigate = useNavigate()
  const partituras = usePartituras()
  const p = partituras ? partituras.find(x => x.id === id) : null

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (partituras === null) {
    return <div className={styles.notFound}><p>Carregando…</p></div>
  }

  if (!p) {
    return (
      <div className={styles.notFound}>
        <p>Partitura não encontrada.</p>
        <button onClick={() => navigate('/partituras')}>← Voltar</button>
      </div>
    )
  }

  const meta = [
    ['Gênero', p.genero],
    ['Afinação', p.afinacao],
    ['Fontes', p.fontes],
    ['Editoração', p.editoracao],
  ].filter(([, v]) => v)

  return (
    <div className="page-animate">
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <h1 className={styles.pageTitle}>Banco de Partituras</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Caminho">
            <span className={styles.breadcrumbIcon} aria-hidden="true">&#9632;</span>
            <Link to="/" className={styles.breadcrumbLink}>Início</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <Link to="/partituras" className={styles.breadcrumbLink}>Banco de Partituras</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <span className={styles.breadcrumbCurrent}>{p.title.toUpperCase()}</span>
          </nav>

          <div className={styles.profile}>
            {/* Imagem ilustrativa */}
            <div className={styles.left}>
              <div className={styles.imageWrap}>
                {p.imagem
                  ? <img src={p.imagem} alt={`Partitura de ${p.title}`} className={styles.image} />
                  : <div className={styles.imagePlaceholder} aria-hidden="true"><SheetIcon /></div>
                }
              </div>
            </div>

            {/* Detalhes */}
            <div className={styles.right}>
              <span className={styles.kicker}>Partitura</span>
              <h2 className={styles.title}>{p.title}</h2>
              <p className={styles.composer}>
                {p.composerId ? (
                  <Link to={`/compositores/${p.composerId}`} className={styles.composerLink}>
                    {p.composer}
                  </Link>
                ) : (
                  p.composer
                )}
              </p>

              <dl className={styles.meta}>
                {meta.map(([k, v]) => (
                  <div key={k} className={styles.metaItem}>
                    <dt className={styles.metaLabel}>{k}</dt>
                    <dd className={styles.metaValue}>{v}</dd>
                  </div>
                ))}
              </dl>

              {p.audioUrl && (
                <div className={styles.audioWrap}>
                  <audio controls preload="none" aria-label={`Áudio de ${p.title}`}>
                    <source src={p.audioUrl} />
                  </audio>
                </div>
              )}

              <div className={styles.actions}>
                {p.arquivoUrl ? (
                  <a className="btn btn-primary" href={p.arquivoUrl} target="_blank" rel="noopener noreferrer">
                    <EyeIcon /> Ver Partitura
                  </a>
                ) : (
                  <button className="btn btn-outline" onClick={() => alert('Partitura disponível em breve.')}>
                    <EyeIcon /> Ver Partitura
                  </button>
                )}
                {p.arquivoUrl && (
                  <a className="btn btn-primary" href={downloadUrl(p.arquivoUrl, p.title)}>
                    <DownloadIcon /> Baixar Partitura
                  </a>
                )}
                {p.audioUrl && (
                  <a className="btn btn-primary" href={downloadUrl(p.audioUrl, p.title)}>
                    <DownloadIcon /> Baixar Áudio
                  </a>
                )}
                {p.composerId && (
                  <Link to={`/compositores/${p.composerId}`} className="btn btn-outline">
                    <UserIcon /> Ver Compositor
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Link to="/partituras" className={styles.backLink}>
            ← Voltar para o Banco de Partituras
          </Link>

        </div>
      </div>
    </div>
  )
}
