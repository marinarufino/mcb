import { useEffect, useState } from 'react'
import { sanityClient } from './sanity'
import { compositores as compositoresFallback } from '../data/compositores'
import { partituras as partiturasFallback } from '../data/partituras'
import { equipe as equipeFallback } from '../data/equipe'
import { historia as historiaFallback } from '../data/historia'

const TIMEOUT = 5000

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

const PART_QUERY = `*[_type=="partitura"]{
  "id": slug.current, title, genero, afinacao, fontes, editoracao,
  "composer": compositor->nome, "composerId": compositor->slug.current,
  "imagem": imagem.asset->url,
  "arquivoUrl": arquivo.asset->url,
  "audioUrl": audio.asset->url
}`

// Busca uma lista do Sanity; cai no fallback local enquanto vazio/offline.
// Retorna null enquanto carrega.
function useSanityList(query, fallback) {
  const [data, setData] = useState(null)
  useEffect(() => {
    let alive = true
    if (!sanityClient) {
      setData(fallback)
      return
    }
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), TIMEOUT)
    )
    Promise.race([sanityClient.fetch(query), timeout])
      .then(res => {
        if (!alive) return
        setData(Array.isArray(res) && res.length > 0 ? res : fallback)
      })
      .catch(() => {
        if (!alive) return
        setData(fallback)
      })
    return () => {
      alive = false
    }
  }, [])
  return data
}

export function useCavaquinistas() {
  return useSanityList(CAVAQ_QUERY, compositoresFallback)
}

export function usePartituras() {
  return useSanityList(PART_QUERY, partiturasFallback)
}

const EQUIPE_QUERY = `*[_type=="membroEquipe"]{
  "id": _id, nome, funcao, "foto": foto.asset->url, bio, ordem
} | order(ordem asc)`

export function useEquipe() {
  return useSanityList(EQUIPE_QUERY, equipeFallback)
}

// História é singleton: busca o documento e cai no fallback se vazio.
const HISTORIA_QUERY = `*[_type=="paginaHistoria"][0]{ titulo, subtitulo, paragrafos }`

export function useHistoria() {
  const [data, setData] = useState(null)
  useEffect(() => {
    let alive = true
    if (!sanityClient) {
      setData(historiaFallback)
      return
    }
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), TIMEOUT)
    )
    Promise.race([sanityClient.fetch(HISTORIA_QUERY), timeout])
      .then(res => {
        if (!alive) return
        setData(res && res.paragrafos && res.paragrafos.length ? res : historiaFallback)
      })
      .catch(() => {
        if (!alive) return
        setData(historiaFallback)
      })
    return () => {
      alive = false
    }
  }, [])
  return data
}
