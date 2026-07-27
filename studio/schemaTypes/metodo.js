export default {
  name: 'metodo',
  title: 'Método',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título do método',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (endereço na URL)',
      type: 'slug',
      description: 'Clique em "Generate" para gerar a partir do título.',
      options: { source: 'titulo', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'capa',
      title: 'Capa',
      type: 'image',
      description: 'Foto da capa do método. Aparece na grade e no topo da página.',
      options: { hotspot: true },
    },
    {
      name: 'ordem',
      title: 'Ordem',
      type: 'number',
      description: 'Menor aparece primeiro na grade.',
    },

    // Ficha técnica. Todos em texto (e não número) para aceitar "68p.",
    // "21cm x 28cm" ou "1988 (2ª ed.)" sem briga com validação.
    { name: 'autor', title: 'Autor', type: 'string' },
    { name: 'edicao', title: 'Edição', type: 'string', description: 'Ex.: Lumiar Editora' },
    { name: 'paginas', title: 'Páginas', type: 'string', description: 'Ex.: 68p.' },
    { name: 'dimensoes', title: 'Dimensões', type: 'string', description: 'Ex.: 21cm x 28cm' },
    { name: 'local', title: 'Local', type: 'string', description: 'Ex.: Rio de Janeiro' },
    { name: 'ano', title: 'Ano', type: 'string', description: 'Ex.: 1988' },

    {
      name: 'texto',
      title: 'Sobre o método',
      type: 'array',
      description: 'Um item por parágrafo.',
      of: [{ type: 'text', rows: 4 }],
    },
    {
      name: 'videoUrl',
      title: 'Vídeo do YouTube',
      type: 'url',
      description:
        'Opcional. Cole o link do YouTube (aceita youtu.be, /watch, Shorts ou embed). Se ficar vazio, a seção de vídeo não aparece na página. Atenção: alguns vídeos têm a incorporação bloqueada pelo próprio dono e só tocam no YouTube — nesse caso o visitante usa o link "Assistir no YouTube".',
    },
  ],
  orderings: [
    { title: 'Ordem', name: 'ordemAsc', by: [{ field: 'ordem', direction: 'asc' }] },
    { title: 'Título', name: 'tituloAsc', by: [{ field: 'titulo', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'autor', media: 'capa' },
  },
}
