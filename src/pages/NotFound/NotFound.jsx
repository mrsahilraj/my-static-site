import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button/Button.jsx'
import Reveal from '../../components/ui/Reveal/Reveal.jsx'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.page}>
      <Reveal>
        <div className={styles.card}>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.subtitle}>
            The link may be outdated or the page moved.
          </p>
          <Button as={Link} to="/">
            Go home
          </Button>
        </div>
      </Reveal>
    </div>
  )
}
