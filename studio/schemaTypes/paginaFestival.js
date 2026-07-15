export default {
  name: 'paginaFestival',
  title: 'Página: Festivais',
  type: 'document',
  fields: [
    { name: 'titulo', title: 'Título', type: 'string' },
    { name: 'subtitulo', title: 'Subtítulo', type: 'string' },
    {
      name: 'paragrafos',
      title: 'Parágrafos',
      type: 'array',
      of: [{ type: 'text', rows: 5 }],
      description: 'Texto de apresentação exibido no topo da página de Festivais.',
    },
  ],
  preview: {
    select: { title: 'titulo' },
    prepare: ({ title }) => ({ title: title || 'Festivais' }),
  },
}
