export default {
  name: 'pesquisador',
  title: 'Pesquisador',
  type: 'document',
  fields: [
    {
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    { name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true } },
    { name: 'ordem', title: 'Ordem', type: 'number', description: 'Menor aparece primeiro' },
    {
      name: 'pesquisas',
      title: 'Pesquisas',
      type: 'array',
      description: 'Adicione uma ou mais pesquisas deste pesquisador.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'titulo',
              title: 'Título da pesquisa',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'descricao',
              title: 'Texto sobre a pesquisa',
              type: 'text',
              rows: 4,
            },
            {
              name: 'arquivo',
              title: 'Arquivo da pesquisa (PDF)',
              type: 'file',
              options: { accept: '.pdf' },
            },
          ],
          preview: { select: { title: 'titulo' } },
        },
      ],
    },
  ],
  orderings: [
    { title: 'Ordem', name: 'ordemAsc', by: [{ field: 'ordem', direction: 'asc' }] },
  ],
  preview: { select: { title: 'nome', media: 'foto' } },
}
