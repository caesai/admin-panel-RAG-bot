import { useState, useEffect } from 'react'
import { logsService } from '../services/logsService'
import Tabs from '../components/Tabs'
import LogsTable from '../components/LogsTable'
import ConfidentialTable from '../components/ConfidentialTable'
import ManagerChangesTable from '../components/ManagerChangesTable'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import './Logs.css'

type TabType = 'managerChanges' | 'requests' | 'confidential'

const Logs = () => {
  const [activeTab, setActiveTab] = useState<TabType>('confidential')
  const [managerChanges, setManagerChanges] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])
  const [confidential, setConfidential] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 20

  useEffect(() => {
    setCurrentPage(1)
    setSearchQuery('')
    fetchData(1)
  }, [activeTab])

  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage])

  const fetchData = async (page: number) => {
    setLoading(true)
    setError(null)
    try {
      if (activeTab === 'managerChanges') {
        const response = await logsService.getManagerChanges(page, pageSize)
        setManagerChanges(response.data)
        setTotalPages(response.pagination.total_pages)
      } else if (activeTab === 'requests') {
        const response = await logsService.getUserRequests(page, pageSize)
        setRequests(response.data)
        setTotalPages(response.pagination.total_pages)
      } else {
        const response = await logsService.getConfidential(page, pageSize)
        setConfidential(response.data)
        setTotalPages(response.pagination.total_pages)
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Ошибка при загрузке данных'
      setError(errorMessage)
      if (!errorMessage.includes('403') && !errorMessage.includes('запрещен')) {
        alert(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const tabs = [
    { id: 'managerChanges', label: 'Изменения менеджеров' },
    { id: 'requests', label: 'Запросы пользователей' },
    { id: 'confidential', label: 'Срабатывания «Конфиденциально»' },
  ]

  const filterData = (data: any[]) => {
    if (!searchQuery.trim()) return data
    
    const query = searchQuery.toLowerCase()
    return data.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    })
  }

  // Получаем заголовки таблицы в зависимости от активной вкладки
  const renderTableHeader = () => {
    if (activeTab === 'managerChanges') {
      return (
        <div className="table-header-only">
          <div className="table-header-row manager-changes">
            <div className="table-cell header">Дата и время</div>
            <div className="table-cell header">Кто изменил</div>
            <div className="table-cell header">Что изменил</div>
            <div className="table-cell header">Детали изменения</div>
          </div>
        </div>
      )
    } else if (activeTab === 'requests') {
      return (
        <div className="table-header-only">
          <div className="table-header-row requests">
            <div className="table-cell header">ID записи</div>
            <div className="table-cell header">Дата и время</div>
            <div className="table-cell header">Telegram ID</div>
            <div className="table-cell header">@username</div>
            <div className="table-cell header">Текст запроса</div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="table-header-only">
          <div className="table-header-row confidential">
            <div className="table-cell header">Дата и время</div>
            <div className="table-cell header">Пользователь Telegram</div>
            <div className="table-cell header">Текст запроса</div>
          </div>
        </div>
      )
    }
  }

  // Получаем тело таблицы без заголовков
  const renderTableBody = () => {
    if (activeTab === 'managerChanges') {
      return <ManagerChangesTable data={filterData(managerChanges)} showHeader={false} />
    } else if (activeTab === 'requests') {
      return <LogsTable data={filterData(requests)} showHeader={false} />
    } else {
      return <ConfidentialTable data={filterData(confidential)} showHeader={false} />
    }
  }

  return (
    <div className="logs-page">
      {/* Табы вынесены вне основного блока */}
      <div className="logs-tabs-wrapper">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab as any} />
      </div>

      <div className="logs-container">
        {/* Заголовки таблицы */}
        {renderTableHeader()}

        {/* Строка поиска */}
        <div className="logs-toolbar">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Поиск" />
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="error-container">{error}</div>
        ) : (
          <>
            {/* Тело таблицы */}
            {renderTableBody()}
            
            {totalPages > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Logs

