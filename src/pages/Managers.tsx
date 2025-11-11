import { useState } from 'react'
import ManagerCard from '../components/ManagerCard'
import AddManagerModal from '../components/AddManagerModal'
import './Managers.css'

const Managers = () => {
  // Локальное хранение менеджеров (до перезагрузки страницы)
  const [managers, setManagers] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingManager, setEditingManager] = useState<any>(null)
  const [editType, setEditType] = useState<'role' | 'restaurants' | 'password' | null>(null)

  const handleAddManager = (managerData: any) => {
    // Локальное добавление менеджера (без запроса к API)
    const newManager = {
      id: `manager-${Date.now()}`,
      name: managerData.name,
      role: managerData.role,
      restaurants: managerData.restaurants,
      password: managerData.password, // Храним только для отображения, не отправляем на сервер
    }
    setManagers([...managers, newManager])
    setIsModalOpen(false)
    alert('Менеджер успешно добавлен')
  }

  const handleDeleteManager = (managerId: string) => {
    // Локальное удаление менеджера
    if (window.confirm('Вы уверены, что хотите удалить этого менеджера?')) {
      setManagers(managers.filter(m => m.id !== managerId))
      alert('Менеджер успешно удален')
    }
  }

  const handleEdit = (manager: any, type: 'role' | 'restaurants' | 'password') => {
    setEditingManager(manager)
    setEditType(type)
    setIsModalOpen(true)
  }

  const handleSaveEdit = (value: string | string[]) => {
    if (!editingManager || !editType) return

    // Локальное обновление менеджера
    const updatedManager = {
      ...editingManager,
      [editType]: value,
    }
    setManagers(managers.map(m => m.id === editingManager.id ? updatedManager : m))
    setEditingManager(null)
    setEditType(null)
    setIsModalOpen(false)
    alert('Изменения сохранены')
  }


  return (
    <div className="managers-page">
      <div className="managers-container">
        <div className="managers-header">
          <h1 className="page-title">Менеджеры</h1>
          <button className="add-manager-button" onClick={() => setIsModalOpen(true)}>
            Добавить менеджера
          </button>
        </div>
        
        <div className="managers-grid">
          {managers.length === 0 ? (
            <div className="managers-empty">Нет менеджеров. Добавьте первого менеджера.</div>
          ) : (
            managers.map((manager) => (
              <ManagerCard
                key={manager.id}
                manager={manager}
                onEdit={handleEdit}
                onDelete={handleDeleteManager}
              />
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddManagerModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddManager}
          manager={editingManager}
          editType={editType}
          onSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  )
}

export default Managers

