import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

const CavaquinhoIcon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
    <path d="M19 3C19 3 10 8 10 18c0 5.5 4 9 9 9s9-3.5 9-9c0-10-9-15-9-15z" fill="#1e3a8a"/>
    <rect x="17" y="26" width="4" height="9" rx="2" fill="#1e3a8a"/>
    <rect x="15" y="34" width="8" height="2" rx="1" fill="#1e3a8a"/>
    <line x1="14" y1="14" x2="24" y2="14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="17" x2="24" y2="17" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="20" x2="24" y2="20" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="23" x2="24" y2="23" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
)

const dropdowns = {
  biblioteca: [
    { label: 'Acervo Digital', to: '/biblioteca' },
    { label: 'Métodos e Tutoriais', to: '/biblioteca' },
    { label: 'Gravações Raras', to: '/biblioteca' },
  ],
  realizacoes: [
    { label: 'Festival MCB', to: '/realizacoes' },
    { label: 'Publicações', to: '/realizacoes' },
    { label: 'Palestras e Eventos', to: '/realizacoes' },
  ],
  sobre: [
    { label: 'Missão', to: '/missao' },
    { label: 'História', to: '/historia' },
    { label: 'Equipe', to: '/equipe' },
  ],
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fecha mobile ao navegar
  const handleMobileNav = (to) => {
    setMobileOpen(false)
    navigate(to)
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className={styles.mobileNav} role="navigation" aria-label="Navegação mobile">
          <div className={styles.mobileHeader}>
            <Link to="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
              <CavaquinhoIcon />
              <div className={styles.logoText}>
                Memória do<strong>Cavaquinho</strong>Brasileiro
              </div>
            </Link>
            <button className={styles.closeBtn} onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div className={styles.mobileLinks}>
            {[['/', 'Início'], ['/partituras', 'Banco de Partituras'], ['/compositores', 'Compositores']].map(([to, label]) => (
              <button key={to} className={styles.mobileLink} onClick={() => handleMobileNav(to)}>{label}</button>
            ))}
            <span className={styles.mobileLinkGroup}>Biblioteca</span>
            {dropdowns.biblioteca.map(item => (
              <button key={item.label} className={styles.mobileLinkSub} onClick={() => handleMobileNav(item.to)}>{item.label}</button>
            ))}
            <span className={styles.mobileLinkGroup}>Realizações</span>
            {dropdowns.realizacoes.map(item => (
              <button key={item.label} className={styles.mobileLinkSub} onClick={() => handleMobileNav(item.to)}>{item.label}</button>
            ))}
            <span className={styles.mobileLinkGroup}>Sobre Nós</span>
            {dropdowns.sobre.map(item => (
              <button key={item.label} className={styles.mobileLinkSub} onClick={() => handleMobileNav(item.to)}>{item.label}</button>
            ))}
            <button className={styles.mobileLink} onClick={() => handleMobileNav('/contato')}>Contato</button>
            <div className={styles.mobileCta}>
              <button className="btn btn-primary" onClick={() => handleMobileNav('/contato')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                Colabore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop header */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <CavaquinhoIcon />
            <div className={styles.logoText}>
              Memória do<strong>Cavaquinho</strong>Brasileiro
            </div>
          </Link>

          <nav className={styles.nav} role="navigation" aria-label="Navegação principal">
            <NavLink to="/" end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>Início</NavLink>
            <NavLink to="/partituras" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>Banco de Partituras</NavLink>
            <NavLink to="/compositores" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>Compositores</NavLink>

            {/* Dropdown: Biblioteca */}
            <div className={styles.dropdownWrap}>
              <span className={styles.navLink}>Biblioteca <ChevronDown /></span>
              <div className={styles.dropdown}>
                {dropdowns.biblioteca.map(item => (
                  <Link key={item.label} to={item.to} className={styles.dropdownLink}>{item.label}</Link>
                ))}
              </div>
            </div>

            {/* Dropdown: Realizações */}
            <div className={styles.dropdownWrap}>
              <span className={styles.navLink}>Realizações <ChevronDown /></span>
              <div className={styles.dropdown}>
                {dropdowns.realizacoes.map(item => (
                  <Link key={item.label} to={item.to} className={styles.dropdownLink}>{item.label}</Link>
                ))}
              </div>
            </div>

            {/* Dropdown: Sobre Nós */}
            <div className={styles.dropdownWrap}>
              <span className={styles.navLink}>Sobre Nós <ChevronDown /></span>
              <div className={styles.dropdown}>
                {dropdowns.sobre.map(item => (
                  <Link key={item.label} to={item.to} className={styles.dropdownLink}>{item.label}</Link>
                ))}
              </div>
            </div>

            <NavLink to="/contato" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>Contato</NavLink>
          </nav>

          <Link to="/contato" className={styles.colaboreBtn}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14" aria-hidden="true">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            Colabore
          </Link>

          <button className={styles.hamburger} onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <span /><span /><span />
          </button>
        </div>
      </header>
    </>
  )
}
