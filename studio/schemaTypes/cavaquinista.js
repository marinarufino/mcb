export default {
  name: 'cavaquinista',
  title: 'Cavaquinista',
  type: 'document',
  fields: [
    {
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (endereço na URL)',
      type: 'slug',
      options: { source: 'nome', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'nomeCompleto', title: 'Nome completo', type: 'string' },
    { name: 'nascimento', title: 'Nascimento', type: 'string', description: 'Ex.: 10/04/1982' },
    { name: 'falecimento', title: 'Falecimento', type: 'string', description: 'Deixe em branco se vivo' },
    { name: 'localNascimento', title: 'Naturalidade', type: 'string', description: 'Ex.: Rio de Janeiro (RJ)' },
    { name: 'afinacao', title: 'Afinação', type: 'string', description: 'Ex.: ré-sol-si-ré' },
    { name: 'bio', title: 'Biografia', type: 'text', rows: 8 },
    {
      name: 'obras',
      title: 'Obras',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'year', title: 'Ano', type: 'number' },
            {
              name: 'partitura',
              title: 'Partitura correspondente',
              type: 'reference',
              to: [{ type: 'partitura' }],
              description: 'Vincule esta obra à partitura correspondente no Banco de Partituras (opcional).',
            },
          ],
          preview: { select: { title: 'title', subtitle: 'year' } },
        },
      ],
    },
  ],
  preview: { select: { title: 'nome', media: 'foto' } },
}
