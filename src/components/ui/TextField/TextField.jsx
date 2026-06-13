import styles from './TextField.module.css'

export default function TextField({
  label,
  hint,
  error,
  id,
  as = 'input',
  endAdornment,
  className,
  ...props
}) {
  const Comp = as
  return (
    <label className={[styles.field, className].filter(Boolean).join(' ')}>
      <span className={styles.label}>{label}</span>
      <span className={styles.inputWrap}>
        <Comp
          id={id}
          className={[
            styles.input,
            endAdornment ? styles.inputHasEnd : null,
            error ? styles.inputError : null,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={hint || error ? `${id}-hint` : undefined}
          {...props}
        />
        {endAdornment ? <span className={styles.end}>{endAdornment}</span> : null}
      </span>
      {(hint || error) && (
        <span id={`${id}-hint`} className={error ? styles.error : styles.hint}>
          {error || hint}
        </span>
      )}
    </label>
  )
}
