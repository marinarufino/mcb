import { useEffect, useMemo, useState } from 'react'
import PageBanner from '../components/PageBanner'
import { usePesquisadores } from '../lib/content'
import Seo from '../components/Seo'
import styles from './Pesquisas.module.css'

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="30" height="30">
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
const ChevronIcon = ({ open }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"
    style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }}>
    <polyline points="6,9 12,15 18,9" />
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
  const [aberto, setAberto] = useState(null)

  // Achata: uma entrada por pesquisa (foto do autor + título da pesquisa).
  const itens = useMemo(() => {
    if (!pesquisadores) return null
    return pesquisadores.flatMap(p =>
      (p.pesquisas || []).map((pesq, i) => ({
        key: `${p.id}-${i}`,
        nome: p.nome,
        foto: p.foto,
        titulo: pesq.titulo,
        descricao: pesq.descricao,
        arquivoUrl: pesq.arquivoUrl,
      }))
    )
  }, [pesquisadores])

  return (
    <div className="page-animate">
      <Seo
        title="Pesquisas e Textos Acadêmicos"
        description="Pesquisas e textos acadêmicos sobre o cavaquinho brasileiro, reunidos na biblioteca do acervo Memória do Cavaquinho Brasileiro."
        path="/biblioteca/pesquisas"
      />
      <PageBanner title="Pesquisas" subtitle="Biblioteca · Pesquisas e Textos Acadêmicos" />
      <div className={styles.content}>
        <div className={styles.inner}>
          {itens === null ? (
            <p className={styles.msg}>Carregando…</p>
          ) : itens.length === 0 ? (
            <p className={styles.msg}>Em breve, novas pesquisas nesta seção.</p>
          ) : (
            <div className={styles.list}>
              {itens.map(item => {
                const open = aberto === item.key
                return (
                  <div className={styles.item} key={item.key}>
                    <button
                      type="button"
                      className={styles.row}
                      onClick={() => setAberto(open ? null : item.key)}
                      aria-expanded={open}
                    >
                      <span className={styles.photo} aria-hidden="true">
                        {item.foto ? <img src={item.foto} alt="" /> : <PersonIcon />}
                      </span>
                      <span className={styles.rowText}>
                        <span className={styles.titulo}>{item.titulo}</span>
                        {item.nome && <span className={styles.autor}>{item.nome}</span>}
                      </span>
                      <span className={styles.verMais}>
                        {open ? 'ver menos' : 'ver mais'} <ChevronIcon open={open} />
                      </span>
                    </button>

                    {open && (
                      <div className={styles.detalhe}>
                        {item.descricao && <p className={styles.resumo}>{item.descricao}</p>}
                        <div className={styles.actions}>
                          {item.arquivoUrl ? (
                            <>
                              <a
                                className="btn btn-primary"
                                href={item.arquivoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <EyeIcon /> Ver pesquisa
                              </a>
                              <a
                                className="btn btn-outline"
                                href={downloadUrl(item.arquivoUrl, item.titulo)}
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
                              <EyeIcon /> Ver pesquisa
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
