import { useState } from 'react'
import './RoleSelector.css'

interface RoleSelectorProps {
  value: string
  roles: { name: string; uuid: string }[]
  onChange: (value: string) => void
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ value, roles, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedRole = roles.length > 0 ? (roles.find(r => r.name === value) || roles[0]) : null

  return (
    <>
      <div className="role-selector-wrapper">
        <button
          type="button"
          className="role-selector-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedRole?.name || (roles.length > 0 ? roles[0]?.name || 'Выберите роль' : 'Выберите роль')}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`role-selector-arrow ${isOpen ? 'open' : ''}`}>
            <path d="M6 9L12 15L18 9" stroke="#71747A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {isOpen && (
        <>
          <div className="role-selector-overlay" onClick={() => setIsOpen(false)} />
          <div className="role-selector-modal">
            <div className="role-selector-modal-header">
              <h3 className="role-selector-modal-title">Выбор ролей:</h3>
              <button
                type="button"
                className="role-selector-modal-close"
                onClick={() => setIsOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#71747A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="role-selector-grid">
              {roles.map((role) => (
                <button
                  key={role.uuid}
                  type="button"
                  className={`role-selector-option ${value === role.name ? 'selected' : ''}`}
                  onClick={() => {
                    onChange(role.name)
                    setIsOpen(false)
                  }}
                >
                  {role.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default RoleSelector
