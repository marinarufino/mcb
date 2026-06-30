export default {
  name: 'membroEquipe',
  title: 'Membro da Equipe',
  type: 'document',
  fields: [
    {
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    { name: 'funcao', title: 'Função', type: 'string', description: 'Ex.: Idealização e Coordenação Geral' },
    { name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Biografia', type: 'text', rows: 8 },
    { name: 'ordem', title: 'Ordem', type: 'number', description: 'Menor aparece primeiro' },
  ],
  orderings: [
    { title: 'Ordem', name: 'ordemAsc', by: [{ field: 'ordem', direction: 'asc' }] },
  ],
  preview: { select: { title: 'nome', subtitle: 'funcao', media: 'foto' } },
}
