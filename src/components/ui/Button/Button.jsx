import styles from './Button.module.css'

export default function Button({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  const classes = [
    styles.button,
    variant === 'secondary' ? styles.secondary : null,
    variant === 'ghost' ? styles.ghost : null,
    size === 'sm' ? styles.sm : null,
    size === 'lg' ? styles.lg : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <Comp className={classes} {...props} />
}

