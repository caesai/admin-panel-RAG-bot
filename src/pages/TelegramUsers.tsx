import { useState, useEffect } from 'react'
import { telegramUsersService, TelegramUser, Role } from '../services/telegramUsersService'
import TelegramUsersTable from '../components/TelegramUsersTable'
import GenerateLinkModal from '../components/GenerateLinkModal'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import { copyToClipboard } from '../utils/clipboard'
import './TelegramUsers.css'

const TelegramUsers = () => {
  const [users, setUsers] = useState<TelegramUser[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const pageSize = 20

  useEffect(() => {
    fetchData()
    fetchRoles()
  }, [currentPage])

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await telegramUsersService.getUsers(currentPage, pageSize)
      setUsers(response.users)
      setTotalPages(response.pagination.total_pages)
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

  const fetchRoles = async () => {
    try {
      const rolesData = await telegramUsersService.getRoles()
      setRoles(rolesData)
    } catch {}
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleRoleChange = async (telegramId: string, roleName: string) => {
    try {
      // Находим UUID роли по названию
      const selectedRole = roles.find(r => r.name === roleName)
      if (!selectedRole) {
        alert('Роль не найдена')
        return
      }
      
      await telegramUsersService.updateUserRole(telegramId, selectedRole.uuid)
      alert('Роль успешно изменена')
      fetchData()
    } catch (err: any) {
      alert(err.message || 'Ошибка при изменении роли')
    }
  }

  const handleGenerateLink = async (roleId: string) => {
    try {
      const result = await telegramUsersService.generateToken(roleId)
      const success = await copyToClipboard(result.link)
      if (success) {
        alert(`Ссылка скопирована в буфер обмена:\n${result.link}`)
      } else {
        alert(`Ссылка сгенерирована (не удалось скопировать):\n${result.link}`)
      }
      return result.link
    } catch (err: any) {
      alert(err.message || 'Ошибка при генерации ссылки')
      throw err
    }
  }

  const filterData = (data: TelegramUser[]) => {
    if (!searchQuery.trim()) return data
    
    const query = searchQuery.toLowerCase()
    return data.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    })
  }

  const handleRestaurantChange = (userId: string, restaurant: string | string[]) => {
    // Псевдо-изменение ресторана (локальное хранение)
    const restaurants = Array.isArray(restaurant) ? restaurant : (restaurant ? [restaurant] : [])
    setUsers(users.map(user => 
      (user.id === userId || user.telegram_id === userId) 
        ? { ...user, restaurants, restaurant: Array.isArray(restaurant) ? restaurant.join(', ') : restaurant } 
        : user
    ))
  }

  return (
    <div className="telegram-users-page">
      <div className="telegram-users-container">
        {/* Заголовки таблицы */}
        <div className="table-header-only">
          <div className="table-header-row telegram-users">
            <div className="table-cell header">Telegram ID</div>
            <div className="table-cell header">UserName</div>
            <div className="table-cell header">Роль</div>
            <div className="table-cell header">Ресторан</div>
          </div>
        </div>

        {/* Строка поиска */}
        <div className="telegram-users-toolbar">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Поиск" />
        </div>

        {/* Кнопка генерации ссылки */}
        <div className="telegram-users-generate-section">
          <button 
            className="generate-link-button" 
            onClick={() => setIsModalOpen(true)}
          >
            Сгенерировать ссылку
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="error-container">{error}</div>
        ) : (
          <>
            <TelegramUsersTable
              data={filterData(users)}
              roles={roles}
              onRoleChange={handleRoleChange}
              onRestaurantChange={handleRestaurantChange}
            />
            
            {!loading && !error && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <GenerateLinkModal
          roles={roles}
          onClose={() => setIsModalOpen(false)}
          onGenerateLink={handleGenerateLink}
        />
      )}
    </div>
  )
}

export default TelegramUsers

