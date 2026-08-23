// Molde compartilhado das páginas de realização (Homenagens e Palestras).
// Cada chamada gera um documento ÚNICO e independente: texto de introdução
// mais a lista de fotos com legenda exibida na página. As fotos não levam a
// lugar nenhum — não há página por item.
//
// Cada item tem exatamente três campos: foto, descrição e a data em que
// aconteceu.
export default function paginaRealizacaoBase({ name, title, tituloPadrao, itensLabel, itemTitle, descricaoLabel, descricaoAjuda }) {
  return {
    name,
    title,
    type: 'document',
    fields: [
      { name: 'titulo', title: 'Título', type: 'string' },
      { name: 'subtitulo', title: 'Subtítulo', type: 'string' },
      {
        name: 'paragrafos',
        title: 'Texto de introdução',
        type: 'array',
        of: [{ type: 'text', rows: 5 }],
        description: `Cada item é um parágrafo, exibido no topo da página antes das fotos.`,
      },
      {
        name: 'itens',
        title: itensLabel,
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'item',
            title: itemTitle,
            fields: [
              {
                name: 'imagem',
                title: 'Foto',
                type: 'image',
                options: { hotspot: true },
                description: 'Use o hotspot para escolher o enquadramento que aparece no cartão.',
                validation: Rule => Rule.required(),
              },
              {
                name: 'descricao',
                title: descricaoLabel,
                type: 'text',
                rows: 3,
                description: descricaoAjuda,
                validation: Rule => Rule.required(),
              },
              {
                name: 'data',
                title: 'Data',
                type: 'date',
                description: 'Data em que aconteceu. Exibida abaixo da descrição, no cartão.',
                validation: Rule => Rule.required(),
              },
            ],
            preview: {
              select: { media: 'imagem', title: 'descricao', subtitle: 'data' },
            },
          },
        ],
        description: 'A ordem da lista é a ordem exibida na página. Arraste para reordenar.',
      },
    ],
    preview: {
      select: { title: 'titulo' },
      prepare: ({ title }) => ({ title: title || tituloPadrao }),
    },
  }
}
