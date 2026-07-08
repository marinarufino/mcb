import { useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import Seo from '../components/Seo'
import { useEquipe } from '../lib/content'
import styles from './SobrePage.module.css'

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="54" height="54">
    <circle cx="12" cy="8" r="5"/><path d="M3 21c0-5 4-9 9-9s9 4 9 9"/>
  </svg>
)

export default function Equipe() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const equipe = useEquipe()

  return (
    <div className="page-animate">
      <Seo
        title="Equipe"
        description="Conheça quem faz a Memória do Cavaquinho Brasileiro acontecer — pesquisadores e colaboradores do acervo."
        path="/equipe"
      />
      <PageBanner title="Equipe" subtitle="Saiba Quem Faz Acontecer" />
      <div className={styles.content}>
        <div className={styles.inner}>
          {equipe === null ? (
            <p className={styles.longText}>Carregando…</p>
          ) : (
            equipe.map(m => (
              <div className={styles.teamMember} key={m.id} id={`equipe-${m.id}`}>
                <div className={styles.teamPhotoWrap}>
                  <div className={styles.teamPhoto} aria-label={`Foto de ${m.nome}`}>
                    {m.foto ? <img src={m.foto} alt={m.nome} /> : <PersonIcon />}
                  </div>
                </div>
                <div className={styles.teamInfo}>
                  <h3>{m.funcao ? `${m.nome} — ${m.funcao}` : m.nome}</h3>
                  {m.bio && <p>{m.bio}</p>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
