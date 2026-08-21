import { useEffect, useRef } from 'react'
import styles from './Lightbox.module.css'

// Visualizador de foto ampliada, compartilhado pelas páginas que têm galeria
// (festivais, homenagens, palestras).
// Usa <dialog> nativo: renderiza na "top layer" do navegador, então fica
// sempre acima de qualquer position:fixed da página (ex.: o header), sem
// depender de disputa de z-index. Também dá Escape e foco de graça.
export default function Lightbox({ fotos, index, onClose, onNavigate }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    dialogRef.current?.showModal()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onNavigate])

  const foto = fotos[index]
  if (!foto) return null

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      onClick={(e) => { if (e.target === dialogRef.current) dialogRef.current.close() }}
    >
      <button className={styles.close} onClick={() => dialogRef.current.close()} aria-label="Fechar">&times;</button>
      {fotos.length > 1 && (
        <>
          <button
            className={`${styles.nav} ${styles.prev}`}
            onClick={(e) => { e.stopPropagation(); onNavigate(-1) }}
            aria-label="Foto anterior"
          >&#8249;</button>
          <button
            className={`${styles.nav} ${styles.next}`}
            onClick={(e) => { e.stopPropagation(); onNavigate(1) }}
            aria-label="Próxima foto"
          >&#8250;</button>
        </>
      )}
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <img src={foto.url} alt={foto.legenda || ''} />
        {foto.legenda && <p className={styles.caption}>{foto.legenda}</p>}
      </div>
    </dialog>
  )
}
