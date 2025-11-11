import { useState } from 'react'
import { telegramUsersService, Role } from '../services/telegramUsersService'
import './GenerateLinkModal.css'

interface GenerateLinkModalProps {
  roles: Role[]
  onClose: () => void
  onGenerateLink?: (roleId: string) => Promise<string>
}

const GenerateLinkModal: React.FC<GenerateLinkModalProps> = ({ roles, onClose, onGenerateLink }) => {
  const [selectedRole, setSelectedRole] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!selectedRole) {
      alert('Выберите роль')
      return
    }

    setLoading(true)
    try {
      if (onGenerateLink) {
        const link = await onGenerateLink(selectedRole)
        setGeneratedLink(link)
      } else {
        const response = await telegramUsersService.generateToken(selectedRole)
        setGeneratedLink(response.link)
      }
    } catch (err: any) {
      // Ошибка уже обработана в onGenerateLink
      if (!onGenerateLink) {
        alert(err.message || 'Ошибка при генерации ссылки')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      alert('Ссылка скопирована в буфер обмена')
    } catch (err) {
      alert('Ошибка при копировании ссылки')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content generate-link-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Сгенерировать ссылку</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="role">Выберите роль</label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="role-select-modal"
            >
              <option value="">Выберите роль</option>
              {roles.map((role) => (
                <option key={role.uuid} value={role.uuid}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <button
            className="button-generate"
            onClick={handleGenerate}
            disabled={loading || !selectedRole}
          >
            {loading ? 'Генерация...' : 'Сгенерировать'}
          </button>

          {generatedLink && (
            <div className="generated-link-container">
              <label>Сгенерированная ссылка:</label>
              <div className="link-display">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="link-input"
                />
                <button className="copy-button" onClick={handleCopy}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="6" y="6" width="10" height="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M4 14V4H14" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                  Копировать
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="button-cancel" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}

export default GenerateLinkModal

