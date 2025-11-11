import FilterButtons from './FilterButtons'
import './SearchBar.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Поиск' }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="search-icon">
          <circle cx="11" cy="11" r="6" stroke="#71747A" strokeWidth="2"/>
          <path d="M20 20L17 17" stroke="#71747A" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
      </div>
      <FilterButtons />
    </div>
  )
}

export default SearchBar

