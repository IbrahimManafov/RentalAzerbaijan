import { useState, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../App'

function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cars, user, addBooking, favorites, toggleFavorite } = useContext(AppContext)
  
  const car = cars.find(c => c.id === parseInt(id))
  const [selectedImage, setSelectedImage] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [message, setMessage] = useState('')

  if (!car) {
    return (
      <div className="car-detail-page">
        <div className="empty-state">
          <h3>Car not found</h3>
          <p>This car may no longer be available.</p>
          <Link to="/search" className="btn btn-primary">Browse cars</Link>
        </div>
      </div>
    )
  }

  const isFavorite = favorites.includes(car.id)
  const today = new Date().toISOString().split('T')[0]

  const calculateDays = () => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  const days = calculateDays()
  const tripFee = Math.round(car.price * days * 0.1)
  const total = (car.price * days) + tripFee

  const handleBooking = () => {
    if (!user) {
      navigate('/signin')
      return
    }

    if (!startDate || !endDate) {
      setMessage('Please select pickup and return dates')
      return
    }

    if (days <= 0) {
      setMessage('Return date must be after pickup date')
      return
    }

    addBooking({
      carId: car.id,
      car: car,
      startDate,
      endDate,
      days,
      total
    })

    setMessage('Booking confirmed! Check your dashboard for details.')
    setTimeout(() => {
      navigate('/dashboard?tab=bookings')
    }, 2000)
  }

  return (
    <div className="car-detail-page">
      <Link to="/search" className="back-link">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to search
      </Link>

      <div className="car-detail-grid">
        {/* Left Column - Gallery & Info */}
        <div>
          {/* Gallery */}
          <div className="car-gallery">
            <img 
              src={car.images[selectedImage]} 
              alt={`${car.make} ${car.model}`}
              className="car-main-image"
            />
            <div className="car-thumbnails">
              {car.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${car.make} ${car.model} ${index + 1}`}
                  className={selectedImage === index ? 'active' : ''}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Car Info */}
          <div className="car-detail-info" style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1>{car.year} {car.make} {car.model}</h1>
                <div className="car-rating" style={{ marginBottom: '16px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#593cfb" stroke="#593cfb">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <span style={{ fontWeight: '600' }}>{car.rating.toFixed(1)}</span>
                  <span>({car.trips} trips)</span>
                  <span style={{ margin: '0 8px' }}>|</span>
                  <span>{car.location}</span>
                </div>
              </div>
              {user && (
                <button 
                  onClick={() => toggleFavorite(car.id)}
                  style={{ 
                    padding: '10px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    background: isFavorite ? '#fce4ec' : '#fff'
                  }}
                >
                  <svg 
                    width="24" 
                    height="24" 
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

            {/* Host Info */}
            <div className="car-host-info">
              <img 
                src={car.host.avatar} 
                alt={car.host.name}
                className="host-avatar"
              />
              <div className="host-name">
                <strong>Hosted by {car.host.name}</strong>
                <span>Joined {car.host.joined} | {car.host.trips} trips | {car.host.responseRate} response rate</span>
              </div>
            </div>

            {/* Stats */}
            <div className="car-stats">
              <div className="stat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                {car.transmission}
              </div>
              <div className="stat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
                </svg>
                {car.fuelType}
              </div>
              <div className="stat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                {car.seats} seats
              </div>
              <div className="stat">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18"/>
                </svg>
                {car.doors} doors
              </div>
            </div>

            {/* Description */}
            <div className="car-description">
              <h3>Description</h3>
              <p>{car.description}</p>
            </div>

            {/* Features */}
            <div className="car-features">
              <h3>Features</h3>
              <div className="features-grid">
                {car.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div>
          <div className="booking-card">
            <div className="booking-price">
              ${car.price} <span>/ day</span>
            </div>
            <div className="booking-rating">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#593cfb" stroke="#593cfb">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span>{car.rating.toFixed(1)} ({car.trips} trips)</span>
            </div>

            {message && (
              <div className={`message ${message.includes('confirmed') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <div className="booking-form">
              <div className="date-inputs">
                <div className="date-input">
                  <label>Trip Start</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={today}
                  />
                </div>
                <div className="date-input">
                  <label>Trip End</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || today}
                  />
                </div>
              </div>

              {days > 0 && (
                <div className="booking-summary">
                  <div className="summary-row">
                    <span>${car.price} x {days} day{days > 1 ? 's' : ''}</span>
                    <span>${car.price * days}</span>
                  </div>
                  <div className="summary-row">
                    <span>Trip fee</span>
                    <span>${tripFee}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              )}

              <button className="book-btn" onClick={handleBooking}>
                {car.instantBook ? 'Book instantly' : 'Request to book'}
              </button>
              
              {car.instantBook && (
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#666', marginTop: '8px' }}>
                  Instant booking - no approval needed
                </p>
              )}
            </div>

            <div style={{ 
              marginTop: '24px', 
              padding: '16px', 
              background: '#f8f8f8', 
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#593cfb" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span style={{ fontWeight: '600' }}>Free cancellation</span>
              </div>
              <p style={{ color: '#666', margin: 0 }}>
                Full refund before trip starts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetail
