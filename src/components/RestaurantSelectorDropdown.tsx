import { useState, useEffect } from 'react'
import './RestaurantSelectorDropdown.css'

// Псевдо-список ресторанов (так как нет API)
const RESTAURANTS = [
  'Smoke BBQ',
  'Trappist',
  'Self Edge Japaneese',
  'Blackchops',
]

interface RestaurantSelectorDropdownProps {
  value: string | string[]
  onChange: (value: string | string[]) => void
  multiple?: boolean
}

const RestaurantSelectorDropdown: React.FC<RestaurantSelectorDropdownProps> = ({ 
  value, 
  onChange, 
  multiple = true 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRestaurants, setSelectedRestaurants] = useState<string[]>(
    Array.isArray(value) ? value : (value ? [value] : [])
  )

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedRestaurants(value)
    } else if (value) {
      setSelectedRestaurants([value])
    } else {
      setSelectedRestaurants([])
    }
  }, [value])

  const handleToggleRestaurant = (restaurant: string) => {
    let newSelection: string[]
    if (multiple) {
      newSelection = selectedRestaurants.includes(restaurant)
        ? selectedRestaurants.filter(r => r !== restaurant)
        : [...selectedRestaurants, restaurant]
    } else {
      newSelection = selectedRestaurants.includes(restaurant) ? [] : [restaurant]
    }
    setSelectedRestaurants(newSelection)
    onChange(multiple ? newSelection : (newSelection.length > 0 ? newSelection[0] : ''))
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const displayText = selectedRestaurants.length > 0 
    ? (selectedRestaurants.length === 1 
        ? selectedRestaurants[0] 
        : `Выбрано: ${selectedRestaurants.length}`)
    : 'Выберите ресторан'

  return (
    <>
      <div className="restaurant-selector-wrapper">
        <button
          type="button"
          className="restaurant-selector-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{displayText}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`restaurant-selector-arrow ${isOpen ? 'open' : ''}`}>
            <path d="M6 9L12 15L18 9" stroke="#71747A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {isOpen && (
        <>
          <div className="restaurant-selector-overlay" onClick={handleClose} />
          <div className="restaurant-selector-modal">
            <div className="restaurant-selector-modal-header">
              <h3 className="restaurant-selector-modal-title">Выбор ресторана:</h3>
              <button
                type="button"
                className="restaurant-selector-modal-close"
                onClick={handleClose}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#71747A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="restaurant-selector-list">
              {RESTAURANTS.map((restaurant, index) => (
                <div key={restaurant}>
                  <button
                    type="button"
                    className="restaurant-selector-item"
                    onClick={() => {
                      handleToggleRestaurant(restaurant)
                      if (!multiple) {
                        handleClose()
                      }
                    }}
                  >
                    <div className={`restaurant-checkbox ${selectedRestaurants.includes(restaurant) ? 'checked' : ''}`}>
                      {selectedRestaurants.includes(restaurant) && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span>{restaurant}</span>
                  </button>
                  {index < RESTAURANTS.length - 1 && <div className="restaurant-divider" />}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default RestaurantSelectorDropdown
