import { useEffect, useId, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'
const FORM_FIELDS = 'textarea:not([disabled]),input:not([disabled]),select:not([disabled])'

export default function Modal({
  open,
  title,
  description,
  children,
  onClose,
  size = 'md',
}) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef(null)
  const lastActiveRef = useRef(null)
  const hasFocusedOnOpenRef = useRef(false)
  const onCloseRef = useRef(onClose)

  // Keep onClose ref up to date
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  const labelledBy = title ? titleId : undefined
  const describedBy = description ? descriptionId : undefined

  const sizeClass = useMemo(() => {
    if (size === 'sm') return styles.sizeSm
    if (size === 'lg') return styles.sizeLg
    return styles.sizeMd
  }, [size])

  useEffect(() => {
    if (!open) {
      hasFocusedOnOpenRef.current = false
      return
    }

    lastActiveRef.current = document.activeElement
    document.body.style.overflow = 'hidden'

    const dialog = dialogRef.current
    // Only auto-focus first FORM FIELD when modal opens for the first time
    const firstFormField = dialog?.querySelector(FORM_FIELDS)
    if (firstFormField && !hasFocusedOnOpenRef.current) {
      firstFormField.focus()
      hasFocusedOnOpenRef.current = true
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') onCloseRef.current?.()
      if (e.key !== 'Tab') return
      if (!dialog) return

      const focusables = Array.from(dialog.querySelectorAll(FOCUSABLE))
      if (focusables.length === 0) return
      const currentIndex = focusables.indexOf(document.activeElement)
      const lastIndex = focusables.length - 1

      if (e.shiftKey && (currentIndex <= 0 || currentIndex === -1)) {
        e.preventDefault()
        focusables[lastIndex].focus()
      } else if (!e.shiftKey && currentIndex === lastIndex) {
        e.preventDefault()
        focusables[0].focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      const last = lastActiveRef.current
      if (last && typeof last.focus === 'function') last.focus()
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className={[styles.dialog, sizeClass].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {(title || description) && (
          <header className={styles.header}>
            {title && (
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
            )}
            {description && (
              <p id={descriptionId} className={styles.description}>
                {description}
              </p>
            )}
            <button className={styles.close} type="button" onClick={onClose}>
              <span className="srOnly">Close</span>
              <span aria-hidden="true">×</span>
            </button>
          </header>
        )}
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body,
  )
}

