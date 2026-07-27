// Extrai o ID do vídeo aceitando os formatos que o cliente pode colar no painel:
// youtu.be/ID, /watch?v=ID, /shorts/ID, /embed/ID e /live/ID.
// Retorna null para qualquer coisa que não seja um link do YouTube — assim a
// seção de vídeo simplesmente não aparece, em vez de renderizar um player quebrado.
export function youtubeId(url) {
  if (!url || typeof url !== 'string') return null
  try {
    const u = new URL(url.trim())
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') return u.pathname.slice(1).split('/')[0] || null
    if (host !== 'youtube.com' && host !== 'm.youtube.com' && host !== 'youtube-nocookie.com') {
      return null
    }
    const v = u.searchParams.get('v')
    if (v) return v
    const m = u.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?]+)/)
    return m ? m[1] : null
  } catch {
    return null
  }
}
