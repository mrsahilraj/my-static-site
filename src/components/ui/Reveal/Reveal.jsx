import useInView from '../../../hooks/useInView.js'
import styles from './Reveal.module.css'

export default function Reveal({ as: Comp = 'div', children, className }) {
  const { ref, inView } = useInView()
  return (
    <Comp
      ref={ref}
      className={[styles.reveal, inView ? styles.in : null, className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Comp>
  )
}

