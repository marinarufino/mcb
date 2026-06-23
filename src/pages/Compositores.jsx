import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { compositores } from '../data/compositores'
import styles from './Compositores.module.css'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
    <circle cx="12" cy="8" r="5"/><path d="M3 21c0-5 4-9 9-9s9 4 9 9"/>
  </svg>
)

function anoNasc(nascimento) {
  if (!nascimento) return null
  return nascimento.split('/')[2] || nascimento
}

export default function Compositores() {
  const [activeLetter, setActiveLetter] = useState(null)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const letrasComCompositores = new Set(
    compositores.map(c => c.nome[0].toUpperCase())
  )

  const filtered = compositores
    .filter(c => !activeLetter || c.nome.toUpperCase().startsWith(activeLetter))
    .filter(c => !search || c.nome.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))

  return (
    <div className="page-animate">
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <h1 className={styles.pageTitle}>Compositores</h1>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Buscar compositor..."
            value={search}
            onChange={e => { setSearch(e.target.value); setActiveLetter(null) }}
            aria-label="Buscar compositor"
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.inner}>

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Caminho">
            <span className={styles.breadcrumbIcon} aria-hidden="true">&#9632;</span>
            <Link to="/" className={styles.breadcrumbLink}>Início</Link>
            <span className={styles.breadcrumbSep}>&gt;</span>
            <span className={styles.breadcrumbCurrent}>Compositores</span>
          </nav>

          {/* Alfabeto */}
          <div className={styles.alphaBar} role="navigation" aria-label="Filtro alfabético">
            {ALPHABET.map(letter => (
              <button
                key={letter}
                className={`${styles.alphaBtn} ${activeLetter === letter ? styles.alphaBtnActive : ''} ${!letrasComCompositores.has(letter) ? styles.alphaBtnDisabled : ''}`}
                onClick={() => {
                  if (!letrasComCompositores.has(letter)) return
                  setActiveLetter(prev => prev === letter ? null : letter)
                  setSearch('')
                }}
                aria-pressed={activeLetter === letter}
                aria-label={`Filtrar pela letra ${letter}`}
                disabled={!letrasComCompositores.has(letter)}
              >
                {letter}
              </button>
            ))}
            <button
              className={`${styles.alphaBtn} ${styles.alphaBtnAll} ${!activeLetter ? styles.alphaBtnActive : ''}`}
              onClick={() => { setActiveLetter(null); setSearch('') }}
            >
              Ver Todos
            </button>
          </div>

          {/* Lista */}
          <div className={styles.list} role="list">
            {filtered.length === 0 ? (
              <p className={styles.empty}>Nenhum compositor encontrado.</p>
            ) : filtered.map(c => (
              <Link
                key={c.id}
                to={`/compositores/${c.id}`}
                className={styles.listItem}
                role="listitem"
                aria-label={`Ver perfil de ${c.nome}`}
              >
                <div className={styles.listPhoto}>
                  {c.foto
                    ? <img src={c.foto} alt={c.nome} />
                    : <PersonIcon />
                  }
                </div>
                <div className={styles.listName}>{c.nome}</div>
                <div className={styles.listDates}>
                  {anoNasc(c.nascimento) && <span>N. <strong>{anoNasc(c.nascimento)}</strong></span>}
                  {c.falecimento && <span>F. <strong>{anoNasc(c.falecimento)}</strong></span>}
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
