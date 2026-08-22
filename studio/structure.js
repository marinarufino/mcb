// Estrutura do menu do Studio.
//
// Mantém a lista padrão de tipos para TODAS as seções e só reorganiza Oficinas:
// os dois itens soltos ("Oficina" e o texto de abertura) viravam duas entradas
// parecidas na lista alfabética, e foi aí que as oficinas acabaram cadastradas
// no documento errado. Agora ficam dentro de um grupo "Oficinas", com o texto
// de abertura como documento único e a lista de oficinas separada.

export const PAGINA_OFICINAS_ID = 'paginaOficinas'
const TIPOS_OFICINAS = ['paginaOficinas', 'oficina']

export const structure = S =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('Oficinas')
        .id('grupoOficinas')
        .child(
          S.list()
            .title('Oficinas')
            .items([
              S.listItem()
                .title('Texto de abertura da página')
                .id('paginaOficinas')
                .child(
                  S.document()
                    .title('Texto de abertura da página')
                    .schemaType('paginaOficinas')
                    // Documento único e com id fixo: não existe "criar outro".
                    .documentId(PAGINA_OFICINAS_ID)
                ),
              S.documentTypeListItem('oficina').title('Oficinas'),
            ])
        ),
      S.divider(),
      // Todo o resto continua exatamente como estava.
      ...S.documentTypeListItems().filter(item => !TIPOS_OFICINAS.includes(item.getId())),
    ])
