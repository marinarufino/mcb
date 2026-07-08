// Gera public/sitemap.xml a partir das rotas estáticas + conteúdo do Sanity.
// Roda no build (ver package.json) para o sitemap refletir o conteúdo publicado.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const SITE = 'https://www.memoriadocavaquinho.com.br'
const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || 'h8odpb0f'
const DATASET = process.env.VITE_SANITY_DATASET || 'production'
const API_VERSION = '2024-01-01'

// Rotas estáticas com conteúdo real (placeholders "Em construção" ficam de fora
// de propósito — página fina não deve ser indexada).
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/partituras', priority: '0.9', changefreq: 'weekly' },
  { path: '/compositores', priority: '0.9', changefreq: 'weekly' },
  { path: '/missao', priority: '0.6', changefreq: 'monthly' },
  { path: '/historia', priority: '0.6', changefreq: 'monthly' },
  { path: '/equipe', priority: '0.6', changefreq: 'monthly' },
  { path: '/biblioteca', priority: '0.6', changefreq: 'monthly' },
  { path: '/biblioteca/pesquisas', priority: '0.6', changefreq: 'monthly' },
  { path: '/realizacoes', priority: '0.6', changefreq: 'monthly' },
  { path: '/contato', priority: '0.5', changefreq: 'monthly' },
]

async function sanityFetch(query) {
  const url = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sanity ${res.status}`)
  const json = await res.json()
  return json.result || []
}

function url(loc, priority, changefreq, lastmod) {
  return `  <url>
    <loc>${SITE}${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

async function main() {
  const today = new Date().toISOString().slice(0, 10)
  const entries = []

  for (const r of staticRoutes) {
    entries.push(url(r.path, r.priority, r.changefreq, today))
  }

  try {
    const [cavaquinistas, partituras] = await Promise.all([
      sanityFetch('*[_type=="cavaquinista" && defined(slug.current)]{"slug":slug.current}'),
      sanityFetch('*[_type=="partitura" && defined(slug.current)]{"slug":slug.current}'),
    ])
    for (const c of cavaquinistas) {
      entries.push(url(`/compositores/${c.slug}`, '0.7', 'monthly', today))
    }
    for (const p of partituras) {
      entries.push(url(`/partituras/${p.slug}`, '0.7', 'monthly', today))
    }
    console.log(`Sitemap: ${cavaquinistas.length} compositores + ${partituras.length} partituras`)
  } catch (err) {
    console.warn(`Aviso: falha ao buscar o Sanity (${err.message}). Gerando sitemap só com rotas estáticas.`)
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`

  const out = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml')
  writeFileSync(out, xml)
  console.log(`Escrito ${out} (${entries.length} URLs)`)
}

main()
