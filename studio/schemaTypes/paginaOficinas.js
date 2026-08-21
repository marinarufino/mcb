export default {
  name: 'paginaOficinas',
  title: 'Página: Oficinas',
  type: 'document',
  fields: [
    { name: 'titulo', title: 'Título', type: 'string' },
    { name: 'subtitulo', title: 'Subtítulo', type: 'string' },
    {
      name: 'paragrafos',
      title: 'Parágrafos',
      type: 'array',
      of: [{ type: 'text', rows: 5 }],
      description: 'Texto de abertura exibido no topo da página de Oficinas.',
    },
  ],
  preview: {
    select: { title: 'titulo' },
    prepare: ({ title }) => ({ title: title || 'Oficinas' }),
  },
}
