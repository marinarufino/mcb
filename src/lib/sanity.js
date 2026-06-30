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
      useCdn: true, // leitura pública via CDN (rápido e barato)
    })
  : null

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null

// Gera URL de imagem responsiva a partir de uma referência do Sanity.
export function urlFor(source) {
  return builder ? builder.image(source) : null
}
