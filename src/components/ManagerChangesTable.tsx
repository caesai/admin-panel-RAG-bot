import { formatDate } from '../utils/dateFormatter'
import './Table.css'

interface ManagerChangesTableProps {
  data: any[]
  showHeader?: boolean
}

const ManagerChangesTable: React.FC<ManagerChangesTableProps> = ({ data, showHeader = true }) => {

  return (
    <div className="table-container">
      {showHeader && (
        <div className="table-header">
          <div className="table-header-row manager-changes">
            <div className="table-cell header">Дата и время</div>
            <div className="table-cell header">Кто изменил</div>
            <div className="table-cell header">Что изменил</div>
            <div className="table-cell header">Детали изменения</div>
          </div>
        </div>
      )}
      <div className="table-body">
        {data.length === 0 ? (
          <div className="table-empty">Нет данных</div>
        ) : (
          <>
            {data.filter(row => row && (row.id || row.created_at || row.admin_name)).map((row, index) => (
              <div key={row.id || index} className={`table-row manager-changes ${index % 2 === 1 ? 'even' : ''}`}>
                <div className="table-cell">{formatDate(row.created_at || row.timestamp)}</div>
                <div className="table-cell">{row.admin_name || '—'}</div>
                <div className="table-cell">{row.change_type || '—'}</div>
                <div className="table-cell text-request">{row.details || '—'}</div>
              </div>
            ))}
            {!showHeader && (
              <div className="table-header-footer">
                <div className="table-header-row manager-changes">
                  <div className="table-cell header">Дата и время</div>
                  <div className="table-cell header">Кто изменил</div>
                  <div className="table-cell header">Что изменил</div>
                  <div className="table-cell header">Детали изменения</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ManagerChangesTable

