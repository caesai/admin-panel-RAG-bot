import { useState, useEffect } from 'react'
import ManagerRoleDropdown from './ManagerRoleDropdown'
import RestaurantSelectorDropdown from './RestaurantSelectorDropdown'
import './AddManagerModal.css'

interface AddManagerModalProps {
  onClose: () => void
  onSave?: (data: any) => void
  manager?: any
  editType?: 'role' | 'restaurants' | 'password' | null
  onSaveEdit?: (value: string | string[]) => void
}

const AddManagerModal: React.FC<AddManagerModalProps> = ({ 
  onClose, 
  onSave, 
  manager, 
  editType,
  onSaveEdit
}) => {
  const [name, setName] = useState(manager?.name || '')
  const [role, setRole] = useState(manager?.role || '')
  const [restaurants, setRestaurants] = useState<string[]>(manager?.restaurants || [])
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (manager) {
      setName(manager.name || '')
      setRole(manager.role || '')
      setRestaurants(manager.restaurants || [])
      setPassword('')
    }
  }, [manager])

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!editType) {
      if (!name.trim()) {
        newErrors.name = 'Введите имя и фамилию'
      }
      if (!role) {
        newErrors.role = 'Выберите роль'
      }
      if (restaurants.length === 0) {
        newErrors.restaurants = 'Выберите хотя бы один ресторан'
      }
      if (!password.trim()) {
        newErrors.password = 'Введите пароль'
      } else if (password.length < 6) {
        newErrors.password = 'Пароль должен содержать минимум 6 символов'
      }
    } else if (editType === 'role' && !role) {
      newErrors.role = 'Выберите роль'
    } else if (editType === 'restaurants' && restaurants.length === 0) {
      newErrors.restaurants = 'Выберите хотя бы один ресторан'
    } else if (editType === 'password') {
      if (!password.trim()) {
        newErrors.password = 'Введите пароль'
      } else if (password.length < 6) {
        newErrors.password = 'Пароль должен содержать минимум 6 символов'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return

    if (editType && onSaveEdit) {
      if (editType === 'role') {
        onSaveEdit(role)
      } else if (editType === 'restaurants') {
        onSaveEdit(restaurants)
      } else if (editType === 'password') {
        onSaveEdit(password.trim())
      }
    } else if (onSave) {
      onSave({
        name: name.trim(),
        role,
        restaurants,
        password: password.trim(),
      })
    }
    
    setName('')
    setRole('')
    setRestaurants([])
    setErrors({})
  }

  const handleCancel = () => {
    setName('')
    setRole('')
    setRestaurants([])
    setPassword('')
    setErrors({})
    onClose()
  }

  const getTitle = () => {
    if (editType === 'role') return 'Выбор ролей:'
    if (editType === 'restaurants') return 'Доступ к ресторанам:'
    if (editType === 'password') return 'Изменение пароля:'
    return 'Добавить менеджера'
  }

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{getTitle()}</h2>
          <button className="modal-close" onClick={handleCancel}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {editType === 'role' ? (
            <div className="form-group">
              <ManagerRoleDropdown
                value={role}
                onChange={setRole}
              />
              {errors.role && <span className="error-text">{errors.role}</span>}
            </div>
          ) : editType === 'restaurants' ? (
            <div className="form-group">
              <RestaurantSelectorDropdown
                value={restaurants}
                onChange={(value: string | string[]) => setRestaurants(Array.isArray(value) ? value : [value])}
                multiple={true}
              />
              {errors.restaurants && <span className="error-text">{errors.restaurants}</span>}
            </div>
          ) : editType === 'password' ? (
            <div className="form-group">
              <label htmlFor="password">Новый пароль *</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите новый пароль"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="name">Имя Фамилия *</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Петров"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="role">Роль *</label>
                <ManagerRoleDropdown
                  value={role}
                  onChange={setRole}
                />
                {errors.role && <span className="error-text">{errors.role}</span>}
              </div>

              <div className="form-group">
                <label>Доступ к ресторанам *</label>
                <RestaurantSelectorDropdown
                  value={restaurants}
                  onChange={(value: string | string[]) => setRestaurants(Array.isArray(value) ? value : [value])}
                  multiple={true}
                />
                {errors.restaurants && <span className="error-text">{errors.restaurants}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Пароль *</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Минимум 6 символов"
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="button-cancel" onClick={handleCancel}>
            Отменить
          </button>
          <button className="button-save" onClick={handleSave}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddManagerModal

