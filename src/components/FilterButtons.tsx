import './FilterButtons.css'

const FilterButtons = () => {
  return (
    <div className="filter-buttons">
      <button className="filter-button" type="button" title="Фильтр">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 6H21M7 12H17M11 18H13" stroke="#71747A" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <button className="filter-button" type="button" title="Сортировка">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 6H21M6 12H18M9 18H15" stroke="#71747A" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}

export default FilterButtons

