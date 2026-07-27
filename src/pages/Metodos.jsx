import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import { usePaginaMetodos, useMetodos } from '../lib/content'
import { blurUrl, fitUrl } from '../lib/sanity'
import Seo from '../components/Seo'
import styles from './Metodos.module.css'
import sobreStyles from './SobrePage.module.css'

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" width="40" height="40">
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22z" />
    <line x1="8" y1="7" x2="16" y2="7" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
)

export default function Metodos() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const pagina = usePaginaMetodos()
  const metodos = useMetodos()

  return (
    <div className="page-animate">
      <Seo
        title="Métodos de Cavaquinho"
        description="Métodos e obras didáticas para cavaquinho publicados no Brasil, reunidos na biblioteca do acervo Memória do Cavaquinho Brasileiro."
        path="/biblioteca/metodos"
      />
      <PageBanner
        title={(pagina && pagina.titulo) || 'Métodos'}
        subtitle={(pagina && pagina.subtitulo) || 'Biblioteca · Métodos de Cavaquinho'}
      />

      <div className={sobreStyles.content}>
        <div className={sobreStyles.inner}>

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Caminho">
            <span className={styles.breadcrumbIcon} aria-hidden="true">&#9632;</span>
            <Link to="/" className={styles.breadcrumbLink}>Início</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <Link to="/biblioteca" className={styles.breadcrumbLink}>Biblioteca</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <span className={styles.breadcrumbCurrent}>Métodos</span>
          </nav>

          {/* Texto de abertura */}
          {pagina === null ? (
            <p className={sobreStyles.longText}>Carregando…</p>
          ) : (
            (pagina.paragrafos || []).map((p, i) => (
              <p className={sobreStyles.longText} key={i}>{p}</p>
            ))
          )}

          {/* Grade de capas */}
          {metodos === null ? (
            <p className={styles.empty}>Carregando…</p>
          ) : metodos.length === 0 ? (
            <p className={styles.empty}>Em breve, novos métodos nesta seção.</p>
          ) : (
            <div className={styles.grid}>
              {metodos.map(m => (
                <Link
                  key={m.id}
                  to={`/biblioteca/metodos/${m.id}`}
                  className={styles.card}
                  aria-label={`Ver ${m.titulo}`}
                >
                  <div className={styles.media}>
                    {m.capa ? (
                      <>
                        <img
                          className={styles.mediaBg}
                          src={blurUrl(m.capaImg, m.capa)}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                        />
                        <img
                          className={styles.mediaFg}
                          src={fitUrl(m.capaImg, m.capa, 560)}
                          alt={m.titulo}
                          loading="lazy"
                        />
                      </>
                    ) : (
                      <BookIcon />
                    )}
                  </div>
                  <div className={styles.body}>
                    {(m.ano || m.edicao) && (
                      <span className={styles.year}>
                        {m.ano}
                        {m.edicao && <span className={styles.yearLocal}>— {m.edicao}</span>}
                      </span>
                    )}
                    <h3 className={styles.cardTitle}>{m.titulo}</h3>
                    {m.autor && <span className={styles.autor}>{m.autor}</span>}
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
