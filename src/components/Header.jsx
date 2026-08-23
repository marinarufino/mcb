import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import logoMcb from '../assets/logo-mcb-oficial.png'

const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.488"/>
  </svg>
)

const dropdowns = {
  biblioteca: [
    { label: 'Métodos', to: '/biblioteca/metodos' },
    { label: 'Pesquisas', to: '/biblioteca/pesquisas' },
    { label: 'Acervo Digital', to: '/biblioteca/acervo-digital' },
  ],
  realizacoes: [
    { label: 'Oficinas', to: '/realizacoes/oficinas' },
    { label: 'Homenagens', to: '/realizacoes/homenagens' },
    { label: 'Palestras', to: '/realizacoes/palestras' },
  ],
  sobre: [
    { label: 'Equipe', to: '/equipe' },
    { label: 'História', to: '/historia' },
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
              <img src={logoMcb} alt="Memória do Cavaquinho Brasileiro" className={styles.logoImg} />
            </Link>
            <button className={styles.closeBtn} onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div className={styles.mobileLinks}>
            {[['/', 'Início'], ['/partituras', 'Banco de Partituras'], ['/compositores', 'Cavaquinistas'], ['/festival', 'Festival']].map(([to, label]) => (
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
              <button className="btn btn-outline" onClick={() => handleMobileNav('/grupo-de-estudos')}>
                <WhatsAppIcon />
                Grupo de Estudos
              </button>
              <button className="btn btn-primary" onClick={() => handleMobileNav('/colabore')}>
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
            <img src={logoMcb} alt="Memória do Cavaquinho Brasileiro" className={styles.logoImg} />
          </Link>

          <nav className={styles.nav} role="navigation" aria-label="Navegação principal">
            <NavLink to="/" end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>Início</NavLink>
            <NavLink to="/partituras" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>Banco de Partituras</NavLink>
            <NavLink to="/compositores" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>Cavaquinistas</NavLink>
            <NavLink to="/festival" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>Festival</NavLink>

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

          {/* Dois CTAs com hierarquia: o Grupo de Estudos em contorno (secundário)
              e o Colabore preenchido (primário). Dois botões preenchidos
              competiriam entre si e nenhum dos dois venceria o olho. */}
          <div className={styles.headerCtas}>
            <Link to="/grupo-de-estudos" className={styles.grupoBtn}>
              <WhatsAppIcon />
              Grupo de Estudos
            </Link>

            <Link to="/colabore" className={styles.colaboreBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14" aria-hidden="true">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              Colabore
            </Link>
          </div>

          <button className={styles.hamburger} onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <span className={styles.hamburgerLabel}>Menu</span>
            <span className={styles.hamburgerBars}><span /><span /><span /></span>
          </button>
        </div>
      </header>
    </>
  )
}
