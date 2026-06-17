import { useEffect, useState } from 'react'
import PageBanner from '../components/PageBanner'
import styles from './Compositores.module.css'

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="60" height="60">
    <circle cx="12" cy="8" r="5"/><path d="M3 21c0-5 4-9 9-9s9 4 9 9"/>
  </svg>
)
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
  </svg>
)

const compositores = [
  {
    id: 'abel-luiz',
    name: 'Abel Luiz',
    fullName: 'Abel Luiz Oliveira da Silva Machado',
    nascimento: '10/04/1982 – RJ',
    afinacao: 'ré-sol-si-ré / sol-ré-lá-mi',
    initials: 'AL',
    bio: 'Criado nas Rodas de Choro, levado por seu avô, Abel Luiz atua no cenário musical como compositor, arranjador, diretor musical e multi-instrumentista. É fundador do Samba do Trabalhador, participando do primeiro CD e DVD do mesmo. Coordena o Bloco Carnavalesco Loucura Suburbana, pioneiro no campo da cultura e saúde mental. Atualmente, integra o Projeto Terreiro de Crioulo, o Trio Choro Novo, e o Duo Onze Cordas – projetos onde som e construção de conhecimento são realizados de forma integrada.',
    obras: [
      { title: 'Quase Choro', year: 1982 },
      { title: 'Carinhosa', year: 1982 },
      { title: 'Valsa da Saudade', year: 1982 },
    ],
  },
  {
    id: 'francisco-macambira',
    name: 'Francisco Macambira',
    fullName: 'Francisco José Macambira (Chiquinho do Cavaquinho)',
    nascimento: '15/12/1937 – PA',
    afinacao: 'ré-sol-si-ré',
    initials: 'FM',
    bio: 'Desde a sua infância se interessou por música, inicialmente tocando pandeiro, e posteriormente aprendendo sozinho instrumentos de cordas dedilhadas, se firmando com o cavaquinho. Chegou no Rio de Janeiro no dia 1º de outubro de 1945, cidade essa onde pôde realizar o sonho de tocar em programas de rádio, e onde reside atualmente. Além de intérprete, Chiquinho também é compositor. Teve duas de suas músicas gravadas por seu ídolo e amigo, o cavaquinista Waldir Azevedo, sendo elas: "Um Cavaquinho sobe o morro" (LP Volta aos chorinhos 1964) e "Só tu não sabes que eu te amo" (LP Tocando para você 1971).',
    obras: [
      { title: 'Ave Maria dos Músicos', year: 1937 },
      { title: 'Um Cavaquinho Sobe o Morro', year: 1937 },
      { title: 'Só Tu Não Sabes', year: 1937 },
    ],
  },
]

function CompositorSection({ c }) {
  const [query, setQuery] = useState('')
  const filtered = c.obras.filter(o => o.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <section className={styles.section} id={`compositor-${c.id}`}>
      <div className={styles.profile}>
        <div className={styles.photoWrap}>
          <div className={styles.photo} aria-label={`Foto de ${c.name}`}>
            <PersonIcon />
          </div>
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>{c.name}</h2>
          <div className={styles.meta}>
            <p><strong>{c.fullName}</strong></p>
            <p><strong>Nascimento:</strong> {c.nascimento}</p>
            <p><strong>Afinação:</strong> {c.afinacao}</p>
          </div>
          <p className={styles.bio}>{c.bio}</p>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchBar} role="search">
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Pesquisar Música"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label={`Pesquisar obras de ${c.name}`}
        />
        <button className={styles.searchBtn} aria-label="Pesquisar">Pesquisar</button>
      </div>

      {/* Table */}
      <table className={styles.table} aria-label={`Obras de ${c.name}`}>
        <thead>
          <tr>
            <th scope="col">Obra</th>
            <th scope="col">Compositor (Nascimento–Morte)</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan={3} style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)' }}>Nenhuma obra encontrada.</td></tr>
          ) : filtered.map(o => (
            <tr key={o.title}>
              <td>{o.title}</td>
              <td>
                <div className={styles.composerCell}>
                  <div className={styles.avatar} aria-hidden="true">{c.initials}</div>
                  {c.name} | {o.year}
                </div>
              </td>
              <td>
                <div className={styles.actions}>
                  <button className={styles.actionBtn} title="Ver partitura" aria-label={`Ver partitura de ${o.title}`}>
                    <EyeIcon />
                  </button>
                  <span aria-hidden="true">|</span>
                  <button className={styles.actionBtn} title="Baixar PDF" aria-label={`Baixar PDF de ${o.title}`}>
                    <FileIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default function Compositores() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="page-animate">
      <PageBanner title="Compositores" subtitle="Cavaquinistas e Compositores" />
      <div className={styles.content}>
        <div className={styles.inner}>
          {compositores.map((c, i) => (
            <div key={c.id}>
              {i > 0 && <hr className={styles.divider} />}
              <CompositorSection c={c} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
