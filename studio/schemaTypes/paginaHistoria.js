export default {
  name: 'paginaHistoria',
  title: 'Página: História',
  type: 'document',
  fields: [
    { name: 'titulo', title: 'Título', type: 'string' },
    { name: 'subtitulo', title: 'Subtítulo', type: 'string' },
    {
      name: 'paragrafos',
      title: 'Parágrafos',
      type: 'array',
      of: [{ type: 'text', rows: 5 }],
      description: 'Cada item é um parágrafo do texto.',
    },
  ],
  preview: {
    select: { title: 'titulo' },
    prepare: ({ title }) => ({ title: title || 'História' }),
  },
}
