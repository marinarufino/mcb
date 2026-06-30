export default {
  name: 'newsletterPost',
  title: 'Post da Newsletter',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required().max(120),
    },
    {
      name: 'image',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagem de destaque do post (opcional, mas recomendada).',
    },
    {
      name: 'excerpt',
      title: 'Texto curto',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.max(300),
      description: 'Resumo exibido no card da página inicial.',
    },
    {
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    {
      name: 'link',
      title: 'Link (opcional)',
      type: 'url',
      description: 'Se preenchido, o card vira um link clicável ("Saiba mais").',
    },
  ],
  orderings: [
    {
      title: 'Mais recentes primeiro',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'image' },
  },
}
