export default {
  name: 'festival',
  title: 'Festival',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título',
      type: 'string',
      description: 'Opcional. Se vazio, o site mostra "Local — Ano" automaticamente.',
    },
    {
      name: 'local',
      title: 'Local',
      type: 'string',
      description: 'Ex.: Rio de Janeiro, RJ',
      validation: Rule => Rule.required(),
    },
    {
      name: 'data',
      title: 'Data',
      type: 'date',
      description: 'Data de início. Define a ordem cronológica e se o festival aparece como "Realizado" ou "Em breve".',
      validation: Rule => Rule.required(),
    },
    { name: 'dataFim', title: 'Data final', type: 'date', description: 'Preencha só se o festival durar mais de um dia.' },
    {
      name: 'slug',
      title: 'Slug (endereço na URL)',
      type: 'slug',
      options: { source: doc => `${doc.local || ''}-${doc.data || ''}`, maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'capa',
      title: 'Foto de capa',
      type: 'image',
      options: { hotspot: true },
      description: 'Aparece no quadradinho da lista de festivais.',
    },
    {
      name: 'descricaoCurta',
      title: 'Descrição curta (cartão da lista)',
      type: 'text',
      rows: 3,
      description: 'Texto breve exibido no quadradinho da lista de festivais (opcional).',
    },
    {
      name: 'descricao',
      title: 'Texto do festival (página do festival)',
      type: 'array',
      of: [{ type: 'text', rows: 5 }],
      description: 'Cada item é um parágrafo. Exibido na página específica deste festival, abaixo da capa.',
    },
    {
      name: 'galeria',
      title: 'Galeria de fotos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Fotos exibidas na página do festival.',
    },
    {
      name: 'programacao',
      title: 'Programação',
      type: 'array',
      description: 'O que aconteceu (ou vai acontecer) no festival.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'horario', title: 'Data/Horário', type: 'string', description: 'Ex.: 14/09, 19h' },
            {
              name: 'atividade',
              title: 'Atividade',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            { name: 'descricao', title: 'Descrição', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'atividade', subtitle: 'horario' } },
        },
      ],
    },
  ],
  orderings: [
    { title: 'Data', name: 'dataAsc', by: [{ field: 'data', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'titulo', local: 'local', data: 'data', media: 'capa' },
    prepare: ({ title, local, data, media }) => ({
      title: title || `${local || 'Festival'}${data ? ' — ' + data.slice(0, 4) : ''}`,
      subtitle: local,
      media,
    }),
  },
}
