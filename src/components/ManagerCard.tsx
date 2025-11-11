import './ManagerCard.css'

interface ManagerCardProps {
  manager: {
    id: string
    name: string
    role: string
    restaurants: string[]
  }
  onEdit: (manager: any, type: 'role' | 'restaurants' | 'password') => void
  onDelete: (managerId: string) => void
}

const ManagerCard: React.FC<ManagerCardProps> = ({ manager, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Вы уверены, что хотите удалить менеджера "${manager.name}"?`)) {
      onDelete(manager.id)
    }
  }

  return (
    <div className="manager-card">
      <div className="manager-card-header">
        <span className="manager-card-label">{manager.name}</span>
        <button
          className="manager-card-delete"
          onClick={handleDelete}
          aria-label="Удалить менеджера"
          title="Удалить менеджера"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#71747A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 11V17M14 11V17" stroke="#71747A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="manager-card-row">
        <span className="manager-card-label">{manager.role}</span>
        <button
          className="manager-card-edit"
          onClick={() => onEdit(manager, 'role')}
          aria-label="Редактировать роль"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17" stroke="#71747A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 5.00011L19 8.00011M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z" stroke="#71747A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="manager-card-row">
        <span className="manager-card-label">{manager.restaurants.join(', ')}</span>
        <button
          className="manager-card-edit"
          onClick={() => onEdit(manager, 'restaurants')}
          aria-label="Редактировать доступ к ресторанам"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17" stroke="#71747A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 5.00011L19 8.00011M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z" stroke="#71747A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="manager-card-row">
        <span className="manager-card-label">Пароль</span>
        <button
          className="manager-card-edit"
          onClick={() => onEdit(manager, 'password')}
          aria-label="Изменить пароль"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17" stroke="#71747A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 5.00011L19 8.00011M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z" stroke="#71747A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ManagerCard
