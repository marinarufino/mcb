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
                  <svg className={styles.contatoLinkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <span className={styles.contatoLinkText}>
                    <span className={styles.contatoLinkTitle}>E-mail</span>
                    <span className={styles.contatoLinkSub}>Clique para nos enviar um e-mail</span>
                  </span>
                  <svg className={styles.contatoLinkSeta} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                </a>
                <a className={styles.contatoLink} href="https://wa.me/5521988885223?text=Ol%C3%A1!%20Vim%20pelo%20site%20Mem%C3%B3ria%20do%20Cavaquinho%20Brasileiro." target="_blank" rel="noopener noreferrer">
                  <svg className={styles.contatoLinkIcon} viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  <span className={styles.contatoLinkText}>
                    <span className={styles.contatoLinkTitle}>WhatsApp</span>
                    <span className={styles.contatoLinkSub}>Clique para falar conosco pelo WhatsApp</span>
                  </span>
                  <svg className={styles.contatoLinkSeta} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                </a>
                <a className={styles.contatoLink} href="https://www.youtube.com/@Mem%C3%B3riadoCavaquinhoBrasileiro" target="_blank" rel="noopener noreferrer">
                  <svg className={styles.contatoLinkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02"/></svg>
                  <span className={styles.contatoLinkText}>
                    <span className={styles.contatoLinkTitle}>Canal no YouTube</span>
                    <span className={styles.contatoLinkSub}>Clique para assistir aos nossos vídeos</span>
                  </span>
                  <svg className={styles.contatoLinkSeta} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
                </a>
                <a className={styles.contatoLink} href="https://www.instagram.com/memoriadocavaquinhobrasileiro/" target="_blank" rel="noopener noreferrer">
                  <svg className={styles.contatoLinkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  <span className={styles.contatoLinkText}>
                    <span className={styles.contatoLinkTitle}>Instagram</span>
                    <span className={styles.contatoLinkSub}>Clique para ver nossas publicações</span>
                  </span>
                  <svg className={styles.contatoLinkSeta} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
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
