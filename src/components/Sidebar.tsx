import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <svg width="200" height="48" viewBox="0 0 253 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="40" fontFamily="Helvetica Neue" fontSize="22" fontWeight="700" fill="#3B3C40" letterSpacing="-0.04em">
            DT CONCIERGE
          </text>
        </svg>
      </div>
      <nav className="sidebar-nav">
        <button className="nav-item" disabled>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect x="3.5" y="3.5" width="21" height="21" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M17.5 17.5L10.5 17.5M17.5 14L10.5 14M17.5 10.5L14 10.5" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Доступы</span>
        </button>
        <NavLink to="/managers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="9" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M7 21C7 17 10 14 14 14C18 14 21 17 21 21" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span>Менеджеры</span>
        </NavLink>
        <button className="nav-item" disabled>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M3.5 13.5H8.5V24.5H3.5V13.5Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M19.5 3.5H24.5V24.5H19.5V3.5Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M10.5 7.5V24.5M18 2.5V24.5" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Рестораны</span>
        </button>
        <button className="nav-item" disabled>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="10.5" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M14 7V14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Настройки</span>
        </button>
        <NavLink to="/logs" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M3.5 3.5H24.5V24.5H3.5V3.5Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M8 8H20M8 14H20M8 20H16" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Логи</span>
        </NavLink>
        <NavLink to="/telegram-users" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="9" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M7 21C7 17 10 14 14 14C18 14 21 17 21 21" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span>Пользователи TG</span>
        </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar

