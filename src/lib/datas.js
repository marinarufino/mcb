// Formatação de datas do site, em português.
//
// As datas vêm do Sanity como string `YYYY-MM-DD` (tipo `date`, sem hora).
// O `T00:00:00` no construtor é essencial: sem ele o JS interpreta a string
// como UTC e, em fusos negativos como o do Brasil, a data volta um dia —
// "2025-09-17" viraria 16 de setembro.
export function formatData(data) {
  if (!data) return ''
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(`${data}T00:00:00`))
  } catch {
    return data
  }
}
