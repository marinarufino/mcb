import { useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import styles from './SobrePage.module.css'

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="54" height="54">
    <circle cx="12" cy="8" r="5"/><path d="M3 21c0-5 4-9 9-9s9 4 9 9"/>
  </svg>
)

export default function Equipe() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="page-animate">
      <PageBanner title="Equipe" subtitle="Saiba Quem Faz Acontecer" />
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.audioWrap}>
            <audio controls preload="none" style={{ width: '100%' }} aria-label="Apresentação da equipe">
              <source src="#" type="audio/mpeg" />
            </audio>
          </div>
          <div className={styles.teamMember} id="equipe-pedro-cantalice">
            <div className={styles.teamPhotoWrap}>
              <div className={styles.teamPhoto} aria-label="Foto de Pedro Cantalice">
                <PersonIcon />
              </div>
            </div>
            <div className={styles.teamInfo}>
              <h3>Pedro Cantalice — Idealização e Coordenação Geral</h3>
              <p>
                Músico e pesquisador, é Bacharel em cavaquinho pela UFRJ, e Mestre pelo Programa de Pós-Graduação Profissional em Música da UFRJ. Foi coprodutor dos CDs "Siqueira Entre Nós" (2013) e "Siqueira 80 anos" (2017). A partir destas realizações viajou pelo Brasil e países da Europa (Portugal e França) se apresentando em shows e palestras. É idealizador e coordenador da pesquisa "Memória do Cavaquinho Brasileiro", que resgata a história do instrumento, seus intérpretes, e divulga novas obras para o cavaquinho. Já apresentou palestras no Arquivo Nacional do Rio de Janeiro (2019), I Festival do Cavaquinho FICAV (2021), Choro – Patrimônio Cultural do Brasil (IPHAN) – (2021). Foi contemplado pelo edital SESC Pulsar 2021-2022 com o projeto Pedro Cantalice EntreCordas. No ano de 2022 foi convidado pela Associação Xarabanda e Conservatório – Escola Profissional das Artes da Madeira para a realização de workshops e apresentações artísticas na cidade do Funchal (Ilha da Madeira, Portugal).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
