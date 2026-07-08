// Pré-renderização por snapshot: sobe um servidor estático do dist/, abre cada
// rota num Chromium headless (Puppeteer), espera o conteúdo do Sanity carregar
// e salva o HTML renderizado — com as metatags do React 19 já no <head>.
// Roda DEPOIS do `vite build`. Ver package.json (build:prod).
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join, extname } from 'node:path'
import puppeteer from 'puppeteer'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const PORT = 4599

const PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID || 'h8odpb0f'
const DATASET = process.env.VITE_SANITY_DATASET || 'production'
const API_VERSION = '2024-01-01'

const staticRoutes = [
  '/', '/partituras', '/compositores', '/missao', '/historia',
  '/equipe', '/biblioteca', '/biblioteca/pesquisas', '/realizacoes', '/contato',
]

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml',
  '.txt': 'text/plain', '.ico': 'image/x-icon',
}

async function sanityFetch(query) {
  const url = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sanity ${res.status}`)
  return (await res.json()).result || []
}

// Servidor estático com fallback SPA. IMPORTANTE: o fallback é o index.html CRU
// (capturado em memória antes do crawl). Se servíssemos o arquivo do disco, ele
// já teria sido sobrescrito pelo snapshot da Home, poluindo o <head> das rotas
// seguintes com as metatags da Home.
function startServer(rawIndex) {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(req.url.split('?')[0])
      const filePath = join(DIST, urlPath)
      if (extname(filePath) && existsSync(filePath)) {
        const data = await readFile(filePath)
        res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
        return res.end(data)
      }
      // rota SPA — serve o index.html cru original (o Puppeteer roda o app)
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(rawIndex)
    } catch {
      res.writeHead(404); res.end('not found')
    }
  })
  return new Promise(r => server.listen(PORT, () => r(server)))
}

async function main() {
  const [cavaquinistas, partituras] = await Promise.all([
    sanityFetch('*[_type=="cavaquinista" && defined(slug.current)]{"slug":slug.current}'),
    sanityFetch('*[_type=="partitura" && defined(slug.current)]{"slug":slug.current}'),
  ])
  const routes = [
    ...staticRoutes,
    ...cavaquinistas.map(c => `/compositores/${c.slug}`),
    ...partituras.map(p => `/partituras/${p.slug}`),
  ]

  // Captura o index.html cru ANTES de qualquer sobrescrita pelo snapshot.
  const rawIndex = await readFile(join(DIST, 'index.html'))
  const server = await startServer(rawIndex)
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })

  let ok = 0
  for (const route of routes) {
    const page = await browser.newPage()

    // O app busca conteúdo no Sanity pelo navegador, mas o CORS do Sanity só
    // libera o domínio de produção — não "localhost". Então interceptamos as
    // chamadas ao Sanity e as refazemos pelo Node (sem CORS), devolvendo a
    // resposta com Access-Control-Allow-Origin: * para o navegador aceitar.
    await page.setRequestInterception(true)
    page.on('request', async (req) => {
      const u = req.url()
      if (!u.includes('.sanity.io')) return req.continue()
      if (req.method() === 'OPTIONS') {
        return req.respond({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' } })
      }
      try {
        const r = await fetch(u)
        const body = await r.text()
        req.respond({ status: r.status, headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' }, body })
      } catch {
        req.abort()
      }
    })

    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 25000 })
      // Espera o <Seo> da rota montar: a <link rel=canonical> tem que bater com
      // o caminho atual. Garante que o conteúdo do Sanity já carregou e o
      // <head> específico da página foi aplicado antes do snapshot.
      await page.waitForFunction(
        (p) => {
          const c = document.querySelector('link[rel="canonical"]')
          return c && new URL(c.href).pathname === p
        },
        { timeout: 25000 },
        route
      ).catch(() => {})
      const html = '<!doctype html>\n' + await page.evaluate(() => document.documentElement.outerHTML)

      const outDir = route === '/' ? DIST : join(DIST, route)
      await mkdir(outDir, { recursive: true })
      await writeFile(join(outDir, 'index.html'), html)
      ok++
      process.stdout.write(`  ✓ ${route}\n`)
    } catch (err) {
      process.stdout.write(`  ✗ ${route} — ${err.message}\n`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  server.close()
  console.log(`\nPrerender: ${ok}/${routes.length} rotas geradas em dist/`)
}

main().catch(err => { console.error(err); process.exit(1) })
