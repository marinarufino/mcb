import RealizacaoLista from '../components/RealizacaoLista'
import { usePaginaHomenagens } from '../lib/content'

export default function Homenagens() {
  return (
    <RealizacaoLista
      pagina={usePaginaHomenagens()}
      basePath="/realizacoes/homenagens"
      tituloPadrao="Homenagens"
      subtituloPadrao="Realizações · Homenagens"
      seoDescription="Homenagens do Memória do Cavaquinho Brasileiro a cavaquinistas de várias gerações que ajudaram a construir a história do instrumento no Brasil."
    />
  )
}
