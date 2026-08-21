import RealizacaoLista from '../components/RealizacaoLista'
import { usePaginaPalestras } from '../lib/content'

export default function Palestras() {
  return (
    <RealizacaoLista
      pagina={usePaginaPalestras()}
      basePath="/realizacoes/palestras"
      tituloPadrao="Palestras"
      subtituloPadrao="Realizações · Palestras"
      seoDescription="Palestras do Memória do Cavaquinho Brasileiro sobre a história do cavaquinho no Brasil e os intérpretes que a construíram."
    />
  )
}
