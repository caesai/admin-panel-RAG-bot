import { useAuth } from '../contexts/AuthContext'
import './Header.css'

const Header = () => {
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
      // Даже при ошибке logout() выполнит редирект
    }
  }

  return (
    <header className="header">
      <div className="header-user">
        <div className="user-avatar">
          <div className="avatar-circle"></div>
          <span>Супер-Администратор</span>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Выйти">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3H9" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 12H9" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header

