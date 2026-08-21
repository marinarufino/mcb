export default {
  name: 'oficina',
  title: 'Oficina',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título',
      type: 'string',
      description: 'Opcional. Se vazio, o site mostra o local automaticamente.',
    },
    {
      name: 'local',
      title: 'Local',
      type: 'string',
      description: 'Ex.: São João del-Rei, MG',
      validation: Rule => Rule.required(),
    },
    {
      name: 'data',
      title: 'Data',
      type: 'date',
      description: 'Define a ordem cronológica e se a oficina aparece como "Realizada" ou "Em breve".',
      validation: Rule => Rule.required(),
    },
    { name: 'dataFim', title: 'Data final', type: 'date', description: 'Preencha só se a oficina durar mais de um dia.' },
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
      description: 'Aparece no cartão da lista de oficinas.',
    },
    {
      name: 'descricaoCurta',
      title: 'Descrição curta (cartão da lista)',
      type: 'text',
      rows: 3,
      description: 'Texto breve exibido no cartão da lista de oficinas (opcional).',
    },
    {
      name: 'descricao',
      title: 'Texto da oficina (página da oficina)',
      type: 'array',
      of: [{ type: 'text', rows: 5 }],
      description: 'Cada item é um parágrafo. Exibido na página específica desta oficina.',
    },
    {
      name: 'galeria',
      title: 'Galeria de fotos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'fotoGaleria',
          title: 'Foto (com legenda)',
          fields: [
            {
              name: 'imagem',
              title: 'Imagem',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required(),
            },
            {
              name: 'legenda',
              title: 'Legenda',
              type: 'string',
              description: 'Texto exibido sobre a foto ao passar o mouse (desktop) ou ao tocar (mobile). Opcional.',
            },
          ],
          preview: {
            select: { media: 'imagem', title: 'legenda' },
            prepare: ({ media, title }) => ({ title: title || '(sem legenda)', media }),
          },
        },
      ],
      description: 'Fotos exibidas na página da oficina.',
    },
    {
      name: 'programacao',
      title: 'Programação',
      type: 'array',
      description: 'O que aconteceu (ou vai acontecer) na oficina. Opcional.',
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
      title: title || `${local || 'Oficina'}${data ? ' — ' + data.slice(0, 4) : ''}`,
      subtitle: local,
      media,
    }),
  },
}
