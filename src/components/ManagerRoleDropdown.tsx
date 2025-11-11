import './ManagerRoleDropdown.css'

interface ManagerRoleDropdownProps {
  value: string
  onChange: (value: string) => void
}

// Фиксированные роли для менеджеров согласно дизайну
const MANAGER_ROLES = [
  'Менеджер ресторана',
  'Менеджер франшизы',
  'Супер-админ',
]

const ManagerRoleDropdown: React.FC<ManagerRoleDropdownProps> = ({ value, onChange }) => {
  const handleSelect = (roleName: string) => {
    onChange(roleName)
  }

  return (
    <div className="manager-role-selector">
      <div className="manager-role-buttons">
        {MANAGER_ROLES.slice(0, 2).map((role) => (
          <button
            key={role}
            type="button"
            className={`role-button ${value === role ? 'selected' : ''}`}
            onClick={() => handleSelect(role)}
          >
            {role}
          </button>
        ))}
      </div>
      <div className="manager-role-buttons">
        {MANAGER_ROLES.slice(2).map((role) => (
          <button
            key={role}
            type="button"
            className={`role-button ${value === role ? 'selected' : ''}`}
            onClick={() => handleSelect(role)}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ManagerRoleDropdown

