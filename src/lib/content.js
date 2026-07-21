import { useEffect, useState } from 'react'
import { sanityClient } from './sanity'
import { compositores as compositoresFallback } from '../data/compositores'
import { partituras as partiturasFallback } from '../data/partituras'
import { equipe as equipeFallback } from '../data/equipe'
import { historia as historiaFallback } from '../data/historia'
import { pesquisadores as pesquisadoresFallback } from '../data/pesquisadores'
import { paginaFestival as paginaFestivalFallback } from '../data/paginaFestival'
import { festivais as festivaisFallback } from '../data/festivais'

const TIMEOUT = 5000

// Cache em nível de módulo: guarda o último resultado BOM (validado) de cada
// query do Sanity. Assim, ao navegar de volta para uma página já visitada, o
// conteúdo aparece na hora — sem "Carregando…" e sem esperar a rede. O Sanity
// continua sendo consultado em segundo plano (stale-while-revalidate), então o
// conteúdo permanece atualizado exatamente como antes; só deixa de bloquear.
// Guardamos SEMPRE o dado real do Sanity aqui — nunca o fallback — para que as
// páginas de perfil não confundam "ainda não carregou" com "não existe".
const cache = new Map()

function fetchWithTimeout(query) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), TIMEOUT)
  )
  return Promise.race([sanityClient.fetch(query), timeout])
}

// Hook genérico com cache. `accept(res)` decide se a resposta do Sanity é
// válida (não-vazia); se não for, mantém o que já havia ou cai no fallback.
// Nunca lança para a UI. Retorna null apenas na primeiríssima carga da query
// (antes de qualquer resposta), preservando o estado "Carregando…" atual.
function useCachedSanity(query, fallback, accept) {
  // Estado inicial: cache (navegação de volta) > null (1ª carga, mostra
  // "Carregando…") — ou já o fallback quando não há client configurado.
  const [data, setData] = useState(() => cache.get(query) ?? (sanityClient ? null : fallback))
  useEffect(() => {
    if (!sanityClient) return
    let alive = true
    fetchWithTimeout(query)
      .then(res => {
        if (!alive) return
        if (accept(res)) {
          cache.set(query, res)
          setData(res)
        } else {
          setData(prev => prev ?? fallback)
        }
      })
      .catch(() => {
        if (!alive) return
        setData(prev => prev ?? fallback)
      })
    return () => {
      alive = false
    }
  }, [query, fallback, accept])
  return data
}

const isNonEmptyList = res => Array.isArray(res) && res.length > 0
const hasParagrafos = res => !!(res && res.paragrafos && res.paragrafos.length)

// Resolve slug -> id, URLs de imagem/arquivos, e o compositor vinculado.
// As obras são derivadas automaticamente das partituras que referenciam este
// cavaquinista (campo "compositor" da partitura) — sem cadastro manual duplicado.
const CAVAQ_QUERY = `*[_type=="cavaquinista"]{
  "id": slug.current, nome, nomeCompleto, nascimento, falecimento, localNascimento,
  afinacao, "foto": foto.asset->url, bio,
  "obras": *[_type=="partitura" && references(^._id)]{
    "title": title, "partituraId": slug.current
  } | order(title asc)
} | order(nome asc)`

export function useCavaquinistas() {
  return useCachedSanity(CAVAQ_QUERY, compositoresFallback, isNonEmptyList)
}

const PART_QUERY = `*[_type=="partitura"]{
  "id": slug.current, title, genero, afinacao, fontes, editoracao,
  "composer": compositor->nome, "composerId": compositor->slug.current,
  "imagem": imagem.asset->url,
  "arquivoUrl": arquivo.asset->url,
  "audioUrl": audio.asset->url
}`

export function usePartituras() {
  return useCachedSanity(PART_QUERY, partiturasFallback, isNonEmptyList)
}

const EQUIPE_QUERY = `*[_type=="membroEquipe"]{
  "id": _id, nome, funcao, "foto": foto.asset->url, ordem
} | order(ordem asc)`

export function useEquipe() {
  return useCachedSanity(EQUIPE_QUERY, equipeFallback, isNonEmptyList)
}

const PESQUISADORES_QUERY = `*[_type=="pesquisador"]{
  "id": _id, nome, "foto": foto.asset->url, ordem,
  "pesquisas": pesquisas[]{ titulo, descricao, "arquivoUrl": arquivo.asset->url }
} | order(ordem asc, nome asc)`

export function usePesquisadores() {
  return useCachedSanity(PESQUISADORES_QUERY, pesquisadoresFallback, isNonEmptyList)
}

// Página Festivais é singleton: busca o documento e cai no fallback se vazio.
const PAGINA_FESTIVAL_QUERY = `*[_type=="paginaFestival"][0]{ titulo, subtitulo, paragrafos }`

export function usePaginaFestival() {
  return useCachedSanity(PAGINA_FESTIVAL_QUERY, paginaFestivalFallback, hasParagrafos)
}

const FESTIVAIS_QUERY = `*[_type=="festival"]{
  "id": slug.current, titulo, local, data, dataFim,
  "capa": capa.asset->url,
  descricaoCurta, descricao,
  "galeria": galeria[]{ "url": coalesce(imagem.asset->url, asset->url), legenda },
  programacao
} | order(data asc)`

export function useFestivais() {
  return useCachedSanity(FESTIVAIS_QUERY, festivaisFallback, isNonEmptyList)
}

// História é singleton: busca o documento e cai no fallback se vazio.
const HISTORIA_QUERY = `*[_type=="paginaHistoria"][0]{ titulo, subtitulo, paragrafos }`

export function useHistoria() {
  return useCachedSanity(HISTORIA_QUERY, historiaFallback, hasParagrafos)
}
