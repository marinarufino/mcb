import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import { usePartituras } from '../lib/content'
import styles from './Partituras.module.css'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

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

export default function Partituras() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [activeLetter, setActiveLetter] = useState(null)
  const [search, setSearch] = useState('')

  const partituras = usePartituras()
  const lista = partituras || []

  const ordenadas = useMemo(
    () => [...lista].sort((a, b) => a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' })),
    [lista]
  )

  // Letras que possuem músicas (para habilitar/desabilitar no índice)
  const letrasComMusicas = useMemo(
    () => new Set(ordenadas.map(p => p.title[0].toUpperCase())),
    [ordenadas]
  )

  const filtradas = ordenadas
    .filter(p => !activeLetter || p.title[0].toUpperCase() === activeLetter)
    .filter(p => {
      if (!search) return true
      const q = search.toLowerCase()
      return p.title.toLowerCase().includes(q) || (p.composer || '').toLowerCase().includes(q)
    })

  return (
    <div className="page-animate">
      <PageBanner title="Banco de Partituras" subtitle="A Música Feita para Cavaquinho" />
      <div className={styles.content}>
        <div className={styles.inner}>

          {/* Busca */}
          <div className={styles.searchRow}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Buscar partitura..."
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveLetter(null) }}
              aria-label="Buscar partitura"
            />
          </div>

          {/* Índice alfabético */}
          <div className={styles.alphaBar} role="navigation" aria-label="Filtro alfabético">
            {ALPHABET.map(letter => {
              const disabled = !letrasComMusicas.has(letter)
              return (
                <button
                  key={letter}
                  type="button"
                  className={`${styles.alphaBtn} ${activeLetter === letter ? styles.alphaBtnActive : ''} ${disabled ? styles.alphaBtnDisabled : ''}`}
                  onClick={() => {
                    if (disabled) return
                    setActiveLetter(prev => (prev === letter ? null : letter))
                    setSearch('')
                  }}
                  aria-pressed={activeLetter === letter}
                  aria-label={`Filtrar pela letra ${letter}`}
                  disabled={disabled}
                >
                  {letter}
                </button>
              )
            })}
            <button
              type="button"
              className={`${styles.alphaBtn} ${styles.alphaBtnAll} ${!activeLetter ? styles.alphaBtnActive : ''}`}
              onClick={() => { setActiveLetter(null); setSearch('') }}
            >
              Ver Todos
            </button>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Partitura</th>
                  <th>Compositor</th>
                  <th>Gênero</th>
                  <th>Afinação</th>
                  <th className={styles.colActions}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {partituras === null && (
                  <tr><td colSpan={5} className={styles.tableMsg}>Carregando…</td></tr>
                )}
                {partituras !== null && filtradas.length === 0 && (
                  <tr><td colSpan={5} className={styles.tableMsg}>Nenhuma partitura encontrada.</td></tr>
                )}
                {filtradas.map(p => (
                  <tr key={p.id} id={`partitura-${p.id}`}>
                    <td className={styles.tdTitle}>
                      <Link to={`/partituras/${p.id}`} className={styles.titleLink}>
                        {p.title}
                      </Link>
                    </td>
                    <td>
                      {p.composerId ? (
                        <Link to={`/compositores/${p.composerId}`} className={styles.composerLink}>
                          {p.composer}
                        </Link>
                      ) : (
                        p.composer
                      )}
                    </td>
                    <td>{p.genero}</td>
                    <td className={styles.tdAfinacao}>{p.afinacao}</td>
                    <td className={styles.tdActions}>
                      <Link
                        to={`/partituras/${p.id}`}
                        className={styles.iconBtn}
                        title={`Ver partitura de ${p.title}`}
                        aria-label={`Ver partitura de ${p.title}`}
                      >
                        <EyeIcon />
                      </Link>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        title={`Baixar partitura de ${p.title}`}
                        aria-label={`Baixar partitura de ${p.title}`}
                        onClick={() => alert('Download disponível em breve.')}
                      >
                        <DownloadIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
