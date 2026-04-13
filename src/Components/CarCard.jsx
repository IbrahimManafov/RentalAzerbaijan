import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../App'

function CarCard({ car }) {
  const { favorites, toggleFavorite, user } = useContext(AppContext)
  const isFavorite = favorites.includes(car.id)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (user) {
      toggleFavorite(car.id)
    }
  }

  return (
    <Link to={`/car/${car.id}`} className="car-card">
      <div style={{ position: 'relative' }}>
        <img 
          src={car.image} 
          alt={`${car.make} ${car.model}`} 
          className="car-image"
        />
        {user && (
          <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill={isFavorite ? '#e91e63' : 'none'}
              stroke={isFavorite ? '#e91e63' : '#666'}
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        )}
      </div>
      
      <div className="car-info">
        <h3 className="car-title">{car.year} {car.make} {car.model}</h3>
        
        <div className="car-rating">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span>{car.rating.toFixed(1)}</span>
          <span>({car.trips} trips)</span>
        </div>
        
        <div className="car-details">
          <span>{car.transmission}</span>
          <span>{car.fuelType}</span>
          <span>{car.seats} seats</span>
        </div>
        
        <div className="car-price">
          ${car.price} <span>/ day</span>
        </div>
        
        {car.instantBook && (
          <span className="car-badge">Instant book</span>
        )}
      </div>
    </Link>
  )
}

export default CarCard
