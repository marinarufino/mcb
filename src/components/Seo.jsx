// SEO por página usando o hoisting nativo de <head> do React 19:
// <title>, <meta> e <link> renderizados aqui sobem automaticamente para o <head>.
// Basta cada página renderizar <Seo title=... description=... path=... />.

const SITE = 'Memória do Cavaquinho Brasileiro'
const BASE_URL = 'https://www.memoriadocavaquinho.com.br'
const DEFAULT_DESC =
  'Acervo, centro de pesquisas e estudos do cavaquinho no Brasil: partituras, compositores, cavaquinistas e história do instrumento.'

// Corta a descrição em ~160 caracteres sem quebrar palavra e sem tags.
function clip(text, max = 160) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(' ')).trim() + '…'
}

export default function Seo({ title, description, path, image }) {
  const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Acervo e Pesquisa`
  const desc = clip(description || DEFAULT_DESC)
  const url = path ? `${BASE_URL}${path}` : BASE_URL

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph — usado por WhatsApp, Facebook, LinkedIn nas prévias de link */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter/X */}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image} />}
    </>
  )
}
