import { Role } from '../services/telegramUsersService'
import RoleSelector from './RoleSelector'
import './TelegramUsersTable.css'

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
    <div className="tg-users-table-wrapper">
      <table className="tg-users-table">
        <thead>
          <tr>
            <th>Telegram ID</th>
            <th>UserName</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="tg-users-empty">Нет данных</td>
            </tr>
          ) : (
            data.filter(row => row && (row.id || row.telegram_id)).map((row, index) => (
              <tr key={row.id || index} className={index % 2 === 1 ? 'even' : ''}>
                <td>{row.telegram_id || '—'}</td>
                <td>{row.login ? `@${row.login}` : '—'}</td>
                <td>
                  <RoleSelector
                    value={row.role || ''}
                    roles={roles}
                    onChange={(newRole) => onRoleChange(row.telegram_id || row.id, newRole)}
                  />
                </td>
                <td>
                  <button
                    className="delete-user-button"
                    onClick={() => onDeleteUser && onDeleteUser(row.telegram_id || row.id)}
                    title="Удалить пользователя"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 5H17M8 5V3C8 2.44772 8.44772 2 9 2H11C11.5523 2 12 2.44772 12 3V5M15 5V17C15 17.5523 14.5523 18 14 18H6C5.44772 18 5 17.5523 5 17V5H15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TelegramUsersTable

