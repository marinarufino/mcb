export default {
  name: 'paginaMetodos',
  title: 'Página Métodos (texto de abertura)',
  type: 'document',
  description: 'Texto que aparece no topo da página Métodos, antes da grade de capas.',
  fields: [
    {
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'subtitulo',
      title: 'Subtítulo',
      type: 'string',
      description: 'Aparece abaixo do título, no banner da página.',
    },
    {
      name: 'paragrafos',
      title: 'Parágrafos',
      type: 'array',
      description: 'Um item por parágrafo do texto de abertura.',
      of: [{ type: 'text', rows: 4 }],
    },
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'subtitulo' },
  },
}
