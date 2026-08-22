export default {
  name: 'paginaOficinas',
  title: 'Texto de abertura da página',
  type: 'document',
  description: 'Documento único: é só o cabeçalho e o texto que abrem a página de Oficinas. Cada oficina é cadastrada em "Oficinas".',
  fields: [
    {
      name: 'titulo',
      title: 'Título da página',
      type: 'string',
      description: 'O nome da SEÇÃO (ex.: "Oficinas"). Não é o nome de uma oficina — para isso, use "Oficinas".',
    },
    {
      name: 'subtitulo',
      title: 'Subtítulo da página',
      type: 'string',
      description: 'Linha pequena acima do título. Ex.: "Realizações · Oficinas".',
    },
    {
      name: 'paragrafos',
      title: 'Parágrafos',
      type: 'array',
      of: [{ type: 'text', rows: 5 }],
      description: 'Texto de abertura exibido no topo da página de Oficinas, antes dos cartões das oficinas.',
    },
  ],
  preview: {
    select: { title: 'titulo' },
    prepare: ({ title }) => ({ title: 'Texto de abertura da página', subtitle: title || 'Oficinas' }),
  },
}
