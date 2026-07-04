import { useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import { usePesquisadores } from '../lib/content'
import styles from './Pesquisas.module.css'

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="54" height="54">
    <circle cx="12" cy="8" r="5"/><path d="M3 21c0-5 4-9 9-9s9 4 9 9"/>
  </svg>
)
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

// Força o download no Sanity via parâmetro ?dl=<nome> (o atributo HTML `download`
// é ignorado em arquivos de outro domínio, como o CDN do Sanity).
function downloadUrl(url, nome) {
  if (!url) return url
  const ext = url.split('?')[0].split('.').pop()
  const safeExt = ext && ext.length <= 5 ? `.${ext}` : ''
  const nomeArquivo = `${(nome || 'pesquisa').trim()}${safeExt}`
  return `${url}${url.includes('?') ? '&' : '?'}dl=${encodeURIComponent(nomeArquivo)}`
}

export default function Pesquisas() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const pesquisadores = usePesquisadores()

  return (
    <div className="page-animate">
      <PageBanner title="Pesquisas" subtitle="Biblioteca · Pesquisas e Textos Acadêmicos" />
      <div className={styles.content}>
        <div className={styles.inner}>
          {pesquisadores === null ? (
            <p className={styles.msg}>Carregando…</p>
          ) : pesquisadores.length === 0 ? (
            <p className={styles.msg}>Em breve, novas pesquisas nesta seção.</p>
          ) : (
            pesquisadores.map(p => (
              <article className={styles.card} key={p.id}>
                <div className={styles.photoWrap}>
                  <div className={styles.photo} aria-label={`Foto de ${p.nome}`}>
                    {p.foto ? <img src={p.foto} alt={p.nome} /> : <PersonIcon />}
                  </div>
                </div>

                <div className={styles.info}>
                  <h3 className={styles.nome}>{p.nome}</h3>

                  <div className={styles.pesquisas}>
                    {(p.pesquisas || []).map((pesq, i) => (
                      <div className={styles.pesquisa} key={i}>
                        <h4 className={styles.pesquisaTitulo}>{pesq.titulo}</h4>
                        {pesq.descricao && (
                          <p className={styles.pesquisaDesc}>{pesq.descricao}</p>
                        )}
                        <div className={styles.actions}>
                          {pesq.arquivoUrl ? (
                            <>
                              <a
                                className="btn btn-primary"
                                href={pesq.arquivoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <EyeIcon /> Ver pesquisa: {pesq.titulo}
                              </a>
                              <a
                                className="btn btn-outline"
                                href={downloadUrl(pesq.arquivoUrl, pesq.titulo)}
                              >
                                <DownloadIcon /> Baixar
                              </a>
                            </>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-outline"
                              onClick={() => alert('Pesquisa disponível em breve.')}
                            >
                              <EyeIcon /> Ver pesquisa: {pesq.titulo}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
