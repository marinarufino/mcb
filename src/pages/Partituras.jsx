import { useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import styles from './Partituras.module.css'

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
)
const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
)

const partituras = [
  {
    id: 'carinhosa',
    title: 'Carinhosa',
    composer: 'Abel Luiz',
    afinacao: 'ré-sol-si-ré',
    genero: 'Valsa',
    fontes: 'Partitura do autor',
    editoracao: 'Abel Luiz',
  },
  {
    id: 'choro-pro-oga',
    title: 'Choro pro Oga',
    composer: 'Carlos Chaves',
    afinacao: 'ré-sol-si-ré',
    genero: 'Choro',
    fontes: 'O autor',
    editoracao: 'Carlos Chaves',
  },
  {
    id: 'quase-choro',
    title: 'Quase Choro',
    composer: 'Abel Luiz',
    afinacao: 'ré-sol-si-ré',
    genero: 'Choro',
    fontes: 'Partitura do autor',
    editoracao: 'Abel Luiz',
  },
]

function PartituraItem({ p }) {
  return (
    <article className={styles.item} id={`partitura-${p.id}`}>
      <div className={styles.thumb} aria-label={`Miniatura da partitura ${p.title}`}>
        <FileIcon />
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{p.title}</h2>
        <p className={styles.composer}>{p.composer}</p>
        <dl className={styles.meta}>
          {[['Afinação', p.afinacao], ['Gênero', p.genero], ['Fontes', p.fontes], ['Editoração', p.editoracao]].map(([k, v]) => (
            <div key={k} className={styles.metaRow}>
              <dt>{k}:</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.audioWrap}>
          <audio controls preload="none" aria-label={`Áudio de ${p.title}`}>
            <source src="#" type="audio/mpeg" />
          </audio>
        </div>
        <div className={styles.actions}>
          <button className="btn btn-outline" onClick={() => alert('Disponível em breve.')}>
            <EyeIcon /> Ver Partitura
          </button>
          <button className="btn btn-primary" onClick={() => alert('Download disponível em breve.')}>
            <DownloadIcon /> Baixar Partitura
          </button>
          <button className="btn btn-primary" onClick={() => alert('Download disponível em breve.')}>
            <DownloadIcon /> Baixar Áudio
          </button>
          <button className="btn btn-outline" onClick={() => alert('Perfil disponível em breve.')}>
            <UserIcon /> Ver Compositor
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Partituras() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="page-animate">
      <PageBanner title="Banco de Partituras" subtitle="A Música Feita para Cavaquinho" />
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.list}>
            {partituras.map(p => <PartituraItem key={p.id} p={p} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
