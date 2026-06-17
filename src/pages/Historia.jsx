import { useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import styles from './SobrePage.module.css'

export default function Historia() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="page-animate">
      <PageBanner title="História" subtitle="Conheça Nossa Trajetória" />
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.audioWrap}>
            <audio controls preload="none" style={{ width: '100%' }} aria-label="Áudio sobre a história">
              <source src="#" type="audio/mpeg" />
            </audio>
          </div>
          <p className={styles.longText}>
            Fundado pelo músico e pesquisador Pedro Cantalice no ano de 2018, Memória do Cavaquinho Brasileiro visa investigar e compartilhar informações sobre a história e memória do cavaquinho no Brasil e seus intérpretes. Formado por um acervo digital/físico composto por gravações raras, entrevistas, fotografias, textos acadêmicos, métodos de cavaquinho e partituras, o projeto tem sido referência para músicos e pesquisadores de várias partes do mundo, colaborando com dados confiáveis para que novos trabalhos relacionados ao cavaquinho sejam desenvolvidos.
          </p>
          <p className={styles.longText}>
            Nos últimos anos o projeto tem participado de eventos de destaque no âmbito da música popular brasileira, como festivais, palestras e seminários tais como: "Com a Palavra o Usuário" – Arquivo Nacional do Brasil – fevereiro de 2019, I Festival Internacional de Cavaquinho – março de 2021, VI Festival Pixinguinha no Vale – março de 2021, Choro Patrimônio Cultural do Brasil (IPHAN) – maio 2021, Choro Nosso de Cada Dia – julho de 2021, Festival de Choro de Pelotas – novembro de 2021, Exporvisões (Podcast) – Por Uma Memória do Cavaquinho Brasileiro – novembro de 2020.
          </p>
          <p className={styles.longText}>
            Há também as publicações de textos acadêmicos: "Memória do Cavaquinho Brasileiro no Arquivo Nacional" – Revista Acesso Livre n. 11 jan.-jun. 2019 e "Mestre Siqueira, Histórias de um Cavaquinista Brasileiro" Anais do XIII Encontro Regional Sudeste de História Oral. Criou um Banco de Partituras com peças compostas para o cavaquinho brasileiro, fez homenagens à cavaquinistas de várias gerações no canal do Youtube. O Festival Memória do Cavaquinho Brasileiro foi realizado em setembro de 2022 (primeira edição), setembro de 2023 (segunda edição) e novembro de 2023, em São João del-Rei (MG), terceira edição do evento.
          </p>
        </div>
      </div>
    </div>
  )
}
