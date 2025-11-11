import { Role } from '../services/telegramUsersService'
import RoleSelector from './RoleSelector'
import RestaurantSelectorDropdown from './RestaurantSelectorDropdown'
import './Table.css'

interface TelegramUsersTableProps {
  data: any[]
  roles: Role[]
  onRoleChange: (userId: string, roleId: string) => void
  onRestaurantChange?: (userId: string, restaurant: string | string[]) => void
}

const TelegramUsersTable: React.FC<TelegramUsersTableProps> = ({ 
  data, 
  roles, 
  onRoleChange,
  onRestaurantChange
}) => {
  const handleRestaurantChange = (userId: string, restaurant: string | string[]) => {
    if (onRestaurantChange) {
      onRestaurantChange(userId, restaurant)
    }
  }

  return (
    <div className="table-container">
      <div className="table-body">
        {data.length === 0 ? (
          <div className="table-empty">Нет данных</div>
        ) : (
          <>
            {data.filter(row => row && (row.id || row.telegram_id)).map((row, index) => (
              <div key={row.id || index} className={`table-row telegram-users ${index % 2 === 1 ? 'even' : ''}`}>
                <div className="table-cell">{row.telegram_id || '—'}</div>
                <div className="table-cell">{row.login ? `@${row.login}` : '—'}</div>
                <div className="table-cell role-cell">
                  <RoleSelector
                    value={row.role || ''}
                    roles={roles}
                    onChange={(newRole) => onRoleChange(row.telegram_id || row.id, newRole)}
                  />
                </div>
                <div className="table-cell restaurant-cell">
                  <RestaurantSelectorDropdown
                    value={Array.isArray(row.restaurants) ? row.restaurants : (row.restaurant ? [row.restaurant] : [])}
                    onChange={(restaurant) => handleRestaurantChange(row.id || row.telegram_id, restaurant)}
                    multiple={true}
                  />
                </div>
              </div>
            ))}
            <div className="table-header-footer">
              <div className="table-header-row telegram-users">
                <div className="table-cell header">Telegram ID</div>
                <div className="table-cell header">UserName</div>
                <div className="table-cell header">Роль</div>
                <div className="table-cell header">Ресторан</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TelegramUsersTable

