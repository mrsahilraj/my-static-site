import { NavLink } from 'react-router-dom'
import Icon from '../../ui/Icon/Icon.jsx'
import styles from './BottomNav.module.css'

function Item({ to, label, icon, external }) {
  const common = (
    <>
      <Icon name={icon} size={20} className={styles.icon} />
      <span className={styles.label}>{label}</span>
    </>
  )

  if (external) {
    return (
      <a className={styles.item} href={to}>
        {common}
      </a>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [styles.item, isActive ? styles.active : null].filter(Boolean).join(' ')
      }
    >
      {common}
    </NavLink>
  )
}

export default function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Bottom navigation">
      <div className={styles.inner}>
        <Item to="/" label="Home" icon="home" />
        <Item to="/bookings" label="My Booking" icon="calendar" />
        <Item to="mailto:hello@example.com" label="Email Us" icon="mail" external />
        <Item to="/help" label="Help" icon="help" />
        <Item to="tel:+10000000000" label="Call Us" icon="phone" external />
      </div>
    </nav>
  )
}

