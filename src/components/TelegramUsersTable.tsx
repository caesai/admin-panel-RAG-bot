import { Role } from '../services/telegramUsersService'
import RoleSelector from './RoleSelector'
import './Table.css'

interface TelegramUsersTableProps {
  data: any[]
  roles: Role[]
  onRoleChange: (userId: string, roleId: string) => void
  onDeleteUser?: (userId: string) => void
}

const TelegramUsersTable: React.FC<TelegramUsersTableProps> = ({ 
  data, 
  roles, 
  onRoleChange,
  onDeleteUser
}) => {
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
                <div className="table-cell action-cell">
                  <button
                    className="delete-user-button"
                    onClick={() => onDeleteUser && onDeleteUser(row.telegram_id || row.id)}
                    title="Удалить пользователя"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 5H17M8 5V3C8 2.44772 8.44772 2 9 2H11C11.5523 2 12 2.44772 12 3V5M15 5V17C15 17.5523 14.5523 18 14 18H6C5.44772 18 5 17.5523 5 17V5H15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <div className="table-header-footer">
              <div className="table-header-row telegram-users">
                <div className="table-cell header">Telegram ID</div>
                <div className="table-cell header">UserName</div>
                <div className="table-cell header">Роль</div>
                <div className="table-cell header">Действия</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TelegramUsersTable

