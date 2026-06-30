import { useEffect, useRef, useState } from 'react'
import { sanityClient, urlFor } from '../lib/sanity'
import { newsletterFallback } from '../data/newsletterFallback'
import styles from './NewsletterSection.module.css'

const QUERY = `*[_type == "newsletterPost"] | order(publishedAt desc)[0...8]{
  _id, title, excerpt, publishedAt, link, image
}`

const AUTOPLAY_MS = 5000
const RESUME_AFTER_MS = 7000

function formatDate(value) {
  if (!value) return ''
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(value))
  } catch {
    return ''
  }
}

// Largura de um "passo" (card + gap) e se há overflow para rolar
function stepWidth(track) {
  const cards = track.querySelectorAll('[data-card]')
  if (cards.length >= 2) return cards[1].offsetLeft - cards[0].offsetLeft
  if (cards.length === 1) return cards[0].offsetWidth
  return track.clientWidth
}
function isAtEnd(track) {
  return track.scrollLeft + track.clientWidth >= track.scrollWidth - 2
}

export default function NewsletterSection() {
  const [posts, setPosts] = useState(null) // null = carregando
  const [usingFallback, setUsingFallback] = useState(false)

  const trackRef = useRef(null)
  const [canScroll, setCanScroll] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const hoverRef = useRef(false)
  const lastInteractRef = useRef(0)

  // ── Busca no Sanity (com fallback) ──────────────────────────
  useEffect(() => {
    let alive = true
    if (!sanityClient) {
      setPosts(newsletterFallback)
      setUsingFallback(true)
      return
    }
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('sanity-timeout')), 5000)
    )
    Promise.race([sanityClient.fetch(QUERY), timeout])
      .then(data => {
        if (!alive) return
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data)
        } else {
          setPosts(newsletterFallback)
          setUsingFallback(true)
        }
      })
      .catch(() => {
        if (!alive) return
        setPosts(newsletterFallback)
        setUsingFallback(true)
      })
    return () => {
      alive = false
    }
  }, [])

  // ── Reveal ao entrar na viewport ────────────────────────────
  useEffect(() => {
    if (!posts) return
    const els = document.querySelectorAll(`.${styles.reveal}`)
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(el => el.classList.add(styles.isVisible))
      return
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [posts])

  // ── Mede overflow (define se mostra setas/auto-play) ────────
  useEffect(() => {
    if (!posts) return
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      setCanScroll(track.scrollWidth - track.clientWidth > 4)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [posts])

  // ── Auto-play ───────────────────────────────────────────────
  useEffect(() => {
    if (!canScroll) return
    const reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const id = setInterval(() => {
      const track = trackRef.current
      if (!track) return
      if (hoverRef.current) return
      if (Date.now() - lastInteractRef.current < RESUME_AFTER_MS) return
      if (isAtEnd(track)) {
        track.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        track.scrollBy({ left: stepWidth(track), behavior: 'smooth' })
      }
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [canScroll])

  const markInteract = () => {
    lastInteractRef.current = Date.now()
  }

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    const step = stepWidth(track) || 1
    setActiveIndex(Math.round(track.scrollLeft / step))
  }

  const go = dir => {
    markInteract()
    const track = trackRef.current
    if (!track) return
    const step = stepWidth(track)
    if (dir > 0 && isAtEnd(track)) {
      track.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (dir < 0 && track.scrollLeft <= 1) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' })
    } else {
      track.scrollBy({ left: step * dir, behavior: 'smooth' })
    }
  }

  const goTo = i => {
    markInteract()
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: stepWidth(track) * i, behavior: 'smooth' })
  }

  const renderCard = (post, i) => {
    const imageUrl =
      post.image && urlFor
        ? urlFor(post.image).width(720).height(480).fit('crop').auto('format').url()
        : null
    const initial = (post.title || '·').trim().charAt(0).toUpperCase()
    const Card = post.link ? 'a' : 'article'
    const linkProps = post.link
      ? { href: post.link, target: '_blank', rel: 'noopener noreferrer' }
      : {}
    return (
      <Card
        key={post._id}
        data-card=""
        className={`${styles.card} ${styles.reveal}`}
        style={{ transitionDelay: `${Math.min(i, 3) * 0.08}s` }}
        {...linkProps}
      >
        <div className={styles.media} data-index={i % 3}>
          {imageUrl ? (
            <img src={imageUrl} alt={post.title || ''} loading="lazy" />
          ) : (
            <span className={styles.placeholderGlyph} aria-hidden="true">
              {initial}
            </span>
          )}
        </div>
        <div className={styles.body}>
          {post.publishedAt && (
            <time className={styles.date} dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          )}
          <h3 className={styles.cardTitle}>{post.title}</h3>
          {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
          {post.link && <span className={styles.readMore}>Saiba mais →</span>}
        </div>
      </Card>
    )
  }

  return (
    <section className={styles.section} aria-label="Novidades">
      <div className="container">
        <div className={`${styles.head} ${styles.reveal}`}>
          <span className={styles.kicker}>O Portal Vivo</span>
          <h2 className={styles.title}>Novidades</h2>
          <p className={styles.lead}>
            Acompanhe as últimas publicações, eventos e descobertas do acervo.
          </p>
        </div>

        {!posts ? (
          <div className={styles.track} aria-hidden="true">
            {[0, 1, 2].map(i => (
              <div key={i} className={`${styles.card} ${styles.skeleton}`} data-card="">
                <div className={styles.media} />
                <div className={styles.body}>
                  <span className={styles.skelLine} />
                  <span className={styles.skelLine} style={{ width: '70%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.carousel}>
            <div
              className={styles.track}
              ref={trackRef}
              onScroll={handleScroll}
              onMouseEnter={() => (hoverRef.current = true)}
              onMouseLeave={() => (hoverRef.current = false)}
              onTouchStart={markInteract}
              onWheel={markInteract}
            >
              {posts.map(renderCard)}
            </div>

            {canScroll && (
              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={() => go(-1)}
                  aria-label="Anterior"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <div className={styles.dots} role="tablist" aria-label="Selecionar novidade">
                  {posts.map((p, i) => (
                    <button
                      key={p._id}
                      type="button"
                      className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                      onClick={() => goTo(i)}
                      aria-label={`Ir para a novidade ${i + 1}`}
                      aria-selected={i === activeIndex}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={() => go(1)}
                  aria-label="Próximo"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {usingFallback && (
          <p className={styles.notice}>
            Conteúdo de exemplo — as novidades publicadas no painel aparecerão aqui.
          </p>
        )}
      </div>
    </section>
  )
}
