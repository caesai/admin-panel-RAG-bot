import { formatDate } from '../utils/dateFormatter'
import './Table.css'

interface ConfidentialTableProps {
  data: any[]
  showHeader?: boolean
}

const ConfidentialTable: React.FC<ConfidentialTableProps> = ({ data, showHeader = true }) => {

  return (
    <div className="table-container">
      {showHeader && (
        <div className="table-header">
          <div className="table-header-row confidential">
            <div className="table-cell header">Дата и время</div>
            <div className="table-cell header">Пользователь Telegram</div>
            <div className="table-cell header">Текст запроса</div>
          </div>
        </div>
      )}
      <div className="table-body">
        {data.length === 0 ? (
          <div className="table-empty">Нет данных</div>
        ) : (
          <>
            {data.filter(row => row && (row.id || row.telegram_id || row.created_at)).map((row, index) => {
              // Формируем строку "Пользователь Telegram" из telegram_id и username
              let userInfo = '—'
              if (row.telegram_id && row.username) {
                userInfo = `${row.telegram_id} @${row.username}`
              } else if (row.telegram_id) {
                userInfo = row.telegram_id
              } else if (row.username) {
                userInfo = `@${row.username}`
              }
              
              return (
                <div key={row.id || index} className={`table-row confidential ${index % 2 === 1 ? 'even' : ''}`}>
                  <div className="table-cell">{formatDate(row.created_at || row.timestamp)}</div>
                  <div className="table-cell">{userInfo}</div>
                  <div className="table-cell text-request">{row.request_text || row.query || '—'}</div>
                </div>
              )
            })}
            {!showHeader && (
              <div className="table-header-footer">
                <div className="table-header-row confidential">
                  <div className="table-cell header">Дата и время</div>
                  <div className="table-cell header">Пользователь Telegram</div>
                  <div className="table-cell header">Текст запроса</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ConfidentialTable

