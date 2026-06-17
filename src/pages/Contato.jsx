import { useEffect, useState } from 'react'
import PageBanner from '../components/PageBanner'
import styles from './SobrePage.module.css'

export default function Contato() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => { setSent(false); e.target.reset() }, 4000)
  }

  return (
    <div className="page-animate">
      <PageBanner title="Contato" subtitle="Entre em Contato Conosco" />
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.contatoGrid}>
            <div className={styles.contatoInfo}>
              <h3>Memória do Cavaquinho Brasileiro</h3>
              <p>Entre em contato para colaborar com o projeto, enviar partituras, materiais históricos, fotografias, gravações ou informações sobre cavaquinistas.</p>
              <div className={styles.contatoLinks}>
                <a className={styles.contatoLink} href="mailto:contato@memoriadocavaquinho.com.br">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  contato@memoriadocavaquinho.com.br
                </a>
                <a className={styles.contatoLink} href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02"/></svg>
                  Canal no YouTube
                </a>
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} aria-label="Formulário de contato">
              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="contact-name">Nome</label>
                <input className={styles.formInput} type="text" id="contact-name" placeholder="Seu nome completo" required />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="contact-email">E-mail</label>
                <input className={styles.formInput} type="email" id="contact-email" placeholder="seu@email.com.br" required />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="contact-subject">Assunto</label>
                <input className={styles.formInput} type="text" id="contact-subject" placeholder="Assunto da mensagem" required />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="contact-message">Mensagem</label>
                <textarea className={styles.formTextarea} id="contact-message" placeholder="Escreva sua mensagem..." required />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                id="btn-enviar-contato"
                style={sent ? { background: '#15803d', borderColor: '#15803d' } : {}}
              >
                {sent ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><polyline points="20,6 9,17 4,12"/></svg>
                    Mensagem enviada!
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
