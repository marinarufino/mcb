import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// projectId é público (vai no bundle do navegador de qualquer forma), então
// usamos um padrão para o site publicado funcionar sem configurar env no Vercel.
export const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'h8odpb0f'
export const sanityDataset = import.meta.env.VITE_SANITY_DATASET || 'production'

// Só cria o client se houver Project ID configurado — assim a Home funciona
// com conteúdo de exemplo enquanto o Sanity não estiver ligado.
export const sanityClient = sanityProjectId
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: '2024-01-01',
      // Produção lê pela CDN (rápido e barato). Em dev, lê direto da API para
      // que alterações feitas no Studio apareçam no refresh, sem cache.
      useCdn: import.meta.env.PROD,
    })
  : null

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null

// Gera URL de imagem responsiva a partir de uma referência do Sanity.
export function urlFor(source) {
  return builder ? builder.image(source) : null
}

// Recorta uma imagem do Sanity nas medidas pedidas RESPEITANDO o hotspot que o
// editor marcou no painel — é o que evita cortar o topo de um cartaz só porque
// ele não tem a mesma proporção do cartão.
// `image` é o objeto de imagem vindo do GROQ (com asset/hotspot/crop);
// `fallbackUrl` cobre o conteúdo de exemplo local, que é só um caminho .jpg.
// Redimensiona SEM cortar: pede só a largura, então o Sanity devolve a imagem
// na proporção original. É o par obrigatório do `object-fit: contain` — com o
// recorte do `cropUrl` a capa já chegaria cortada e o `contain` não teria o que
// mostrar. Usado nos cards de capa (métodos/festivais), onde capas deitadas e
// em pé convivem na mesma grade.
export function fitUrl(image, fallbackUrl, width) {
  if (!image || !builder) return fallbackUrl || null
  try {
    return builder.image(image).width(width).fit('max').auto('format').url()
  } catch {
    return fallbackUrl || null
  }
}

// Versão minúscula da mesma imagem para preencher o fundo desfocado do card.
// Pedir 64px em vez de borrar a capa inteira é o que torna o efeito barato: o
// navegador já recebe poucos pixels e o `blur` do CSS só suaviza a ampliação.
export function blurUrl(image, fallbackUrl) {
  if (!image || !builder) return fallbackUrl || null
  try {
    return builder.image(image).width(64).quality(40).auto('format').url()
  } catch {
    return fallbackUrl || null
  }
}

export function cropUrl(image, fallbackUrl, width, height) {
  if (!image || !builder) return fallbackUrl || null
  try {
    return builder
      .image(image)
      .width(width)
      .height(height)
      .fit('crop')
      .auto('format')
      .url()
  } catch {
    return fallbackUrl || null
  }
}
