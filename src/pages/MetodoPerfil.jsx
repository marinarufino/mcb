import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useMetodos } from '../lib/content'
import { youtubeId } from '../lib/youtube'
import { blurUrl, fitUrl } from '../lib/sanity'
import Seo from '../components/Seo'
import styles from './MetodoPerfil.module.css'

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="72" height="72">
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22z" />
    <line x1="8" y1="7" x2="16" y2="7" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
)

export default function MetodoPerfil() {
  const { id } = useParams()
  const navigate = useNavigate()
  const metodos = useMetodos()
  const m = metodos ? metodos.find(x => x.id === id) : null

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (metodos === null) {
    return <div className={styles.notFound}><p>Carregando…</p></div>
  }

  if (!m) {
    return (
      <div className={styles.notFound}>
        <p>Método não encontrado.</p>
        <button onClick={() => navigate('/biblioteca/metodos')}>← Voltar</button>
      </div>
    )
  }

  const videoId = youtubeId(m.videoUrl)

  // Só as linhas preenchidas entram na ficha.
  const ficha = [
    ['Autor', m.autor],
    ['Edição', m.edicao],
    ['Páginas', m.paginas],
    ['Dimensões', m.dimensoes],
    ['Local', m.local],
    ['Ano', m.ano],
  ].filter(([, valor]) => !!valor)

  const seoDesc = m.texto?.[0]
    || `${m.titulo}${m.autor ? `, de ${m.autor}` : ''} — método de cavaquinho no acervo Memória do Cavaquinho Brasileiro.`

  return (
    <div className="page-animate">
      <Seo
        title={m.titulo}
        description={seoDesc}
        path={`/biblioteca/metodos/${m.id}`}
        image={m.capa}
      />
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <h1 className={styles.pageTitle}>Métodos</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Caminho">
            <span className={styles.breadcrumbIcon} aria-hidden="true">&#9632;</span>
            <Link to="/" className={styles.breadcrumbLink}>Início</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <Link to="/biblioteca" className={styles.breadcrumbLink}>Biblioteca</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <Link to="/biblioteca/metodos" className={styles.breadcrumbLink}>Métodos</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <span className={styles.breadcrumbCurrent}>{m.titulo.toUpperCase()}</span>
          </nav>

          <div className={styles.profile}>
            {/* Coluna esquerda: capa + ficha técnica */}
            <div className={styles.left}>
              <div className={styles.capaWrap}>
                {m.capa ? (
                  <>
                    <img
                      className={styles.capaBg}
                      src={blurUrl(m.capaImg, m.capa)}
                      alt=""
                      aria-hidden="true"
                    />
                    <img
                      className={styles.capa}
                      src={fitUrl(m.capaImg, m.capa, 640)}
                      alt={m.titulo}
                    />
                  </>
                ) : (
                  <div className={styles.capaPlaceholder}><BookIcon /></div>
                )}
              </div>
              {ficha.length > 0 && (
                <dl className={styles.facts}>
                  {ficha.map(([rotulo, valor]) => (
                    <div className={styles.factRow} key={rotulo}>
                      <dt>{rotulo}</dt><dd>{valor}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            {/* Coluna direita: título, texto e vídeo */}
            <div className={styles.right}>
              <span className={styles.verbeteLabel}>Método</span>
              <h2 className={styles.titulo}>{m.titulo}</h2>
              {m.autor && <p className={styles.autor}>{m.autor}</p>}

              <hr className={styles.divider} />

              {m.texto?.length > 0 && (
                <div className={styles.texto}>
                  {m.texto.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              )}

              {videoId && (
                <section className={styles.videoSection}>
                  <h3 className={styles.videoTitle}>Vídeo</h3>
                  <div className={styles.videoWrap}>
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                      title={`Vídeo — ${m.titulo}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  {/* Alguns vídeos têm a incorporação bloqueada pelo dono e só
                      tocam no YouTube. Não dá para detectar isso de fora do
                      iframe, então o link fica sempre visível como saída. */}
                  <a
                    className={styles.videoLink}
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Assistir no YouTube ↗
                  </a>
                </section>
              )}
            </div>
          </div>

          <Link to="/biblioteca/metodos" className={styles.backLink}>← Voltar para Métodos</Link>

        </div>
      </div>
    </div>
  )
}
