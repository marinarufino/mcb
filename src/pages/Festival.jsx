import { useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import styles from './SobrePage.module.css'

export default function Festival() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="page-animate">
      <PageBanner title="Festival" subtitle="O Festival do Cavaquinho Brasileiro" />
      <div className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.section}>
            <h3>Sobre o Festival</h3>
            <p>Em breve, mais informações sobre o Festival do Cavaquinho Brasileiro: programação, edições, artistas e como participar.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
