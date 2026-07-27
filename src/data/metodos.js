// Métodos — fallback local (usado enquanto o Sanity estiver vazio/offline).
// Conteúdo genérico de propósito: assim que o primeiro método for publicado no
// painel, esta lista é descartada e o conteúdo real entra no lugar.
export const metodos = [
  {
    id: 'exemplo',
    titulo: 'Título do método',
    capa: null,
    ordem: 1,
    autor: 'Autor do método',
    edicao: null,
    paginas: null,
    dimensoes: null,
    local: null,
    ano: null,
    texto: [
      'Conteúdo de exemplo, substituído automaticamente assim que os métodos forem cadastrados no painel.',
    ],
    videoUrl: null,
  },
]
