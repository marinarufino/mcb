import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import logoCavaquinhoWhite from '../assets/logo-cavaquinho-white.png'

const acervoLinks = [
  { label: 'Banco de Partituras', to: '/partituras' },
  { label: 'Compositores', to: '/compositores' },
  { label: 'Biblioteca Digital', to: '/biblioteca' },
  { label: 'Realizações', to: '/realizacoes' },
]
const projetoLinks = [
  { label: 'Missão', to: '/missao' },
  { label: 'História', to: '/historia' },
  { label: 'Equipe', to: '/equipe' },
  { label: 'Contato', to: '/contato' },
]

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <img src={logoCavaquinhoWhite} alt="Logo Cavaquinho" style={{height: '58px', width: 'auto'}} />
              <div className={styles.logoText}>
                Memória do<strong>Cavaquinho</strong>Brasileiro
              </div>
            </Link>
            <p className={styles.tagline}>
              Acervo, centro de pesquisas e estudos do cavaquinho no Brasil. Um projeto de Pedro Cantalice.
            </p>
            <div className={styles.social} aria-label="Redes sociais">
              {/* YouTube */}
              <a className={styles.socialLink} href="https://www.youtube.com/@Mem%C3%B3riadoCavaquinhoBrasileiro" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02"/>
                </svg>
              </a>
              {/* Instagram */}
              <a className={styles.socialLink} href="https://www.instagram.com/memoriadocavaquinhobrasileiro/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* Facebook */}
              <a className={styles.socialLink} href="https://www.facebook.com/memoriadocavaquinhobrasileiro" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Acervo */}
          <div className={styles.col}>
            <h4>Acervo</h4>
            <ul>
              {acervoLinks.map(l => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Projeto */}
          <div className={styles.col}>
            <h4>Projeto</h4>
            <ul>
              {projetoLinks.map(l => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Memória do Cavaquinho Brasileiro. Todos os direitos reservados.</p>
          <p>Um projeto de <strong>Pedro Cantalice</strong></p>
        </div>
      </div>
    </footer>
  )
}
