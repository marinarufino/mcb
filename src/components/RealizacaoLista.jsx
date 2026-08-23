import { useEffect } from 'react'
import PageHeader from './PageHeader'
import Seo from './Seo'
import { cropUrl } from '../lib/sanity'
import { formatData } from '../lib/datas'
import sobreStyles from '../pages/SobrePage.module.css'
import styles from './RealizacaoLista.module.css'

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="40" height="40" aria-hidden="true">
    <circle cx="12" cy="8" r="5"/><path d="M3 21c0-5 4-9 9-9s9 4 9 9"/>
  </svg>
)

// Página de realizações (homenagens, palestras): texto de introdução seguido
// de uma grade de fotos com legenda. As fotos NÃO são clicáveis — é o formato
// pedido para essas seções.
export default function RealizacaoLista({ pagina, basePath, tituloPadrao, subtituloPadrao, seoDescription }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const itens = pagina?.itens ?? []

  return (
    <div className="page-animate">
      <Seo title={tituloPadrao} description={seoDescription} path={basePath} />
      <PageHeader
        title={pagina?.titulo || tituloPadrao}
        subtitle={pagina?.subtitulo || subtituloPadrao}
      />
      <div className={sobreStyles.content}>
        <div className={sobreStyles.inner}>
          {pagina === null ? (
            <p className={sobreStyles.longText}>Carregando…</p>
          ) : (
            <>
              <div className={styles.intro}>
                {pagina.paragrafos?.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {itens.length > 0 && (
                <div className={styles.grid}>
                  {itens.map((item, i) => {
                    const foto = cropUrl(item.imagemImg, item.imagem, 600, 450)
                    return (
                      <figure className={styles.card} key={item._key ?? i}>
                        <div className={styles.foto}>
                          {/* alt vazio de propósito: a descrição logo abaixo, no
                              figcaption, já descreve a foto. Repeti-la no alt
                              faria o leitor de tela anunciar o mesmo texto duas
                              vezes seguidas. */}
                          {foto
                            ? <img src={foto} alt="" loading="lazy" />
                            : <PersonIcon />}
                        </div>
                        <figcaption className={styles.legenda}>
                          <span className={styles.descricao}>{item.descricao}</span>
                          {item.data && (
                            <time className={styles.data} dateTime={item.data}>
                              {formatData(item.data)}
                            </time>
                          )}
                        </figcaption>
                      </figure>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
