import { useState, useContext, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { AppContext } from '../App'
import CarCard from '../components/CarCard'

function Dashboard() {
  const { user, bookings, myCars, cars, favorites } = useContext(AppContext)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'bookings')

  useEffect(() => {
    if (!user) {
      navigate('/signin')
    }
  }, [user, navigate])

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  if (!user) {
    return null
  }

  const favoriteCars = cars.filter(car => favorites.includes(car.id))

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user.name}</h1>
          <p style={{ color: '#666' }}>{user.email}</p>
        </div>
        <Link to="/host" className="btn btn-primary">List a car</Link>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`dashboard-tab ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          My Trips ({bookings.length})
        </button>
        <button 
          className={`dashboard-tab ${activeTab === 'cars' ? 'active' : ''}`}
          onClick={() => setActiveTab('cars')}
        >
          My Cars ({myCars.length})
        </button>
        <button 
          className={`dashboard-tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites ({favorites.length})
        </button>
        <button 
          className={`dashboard-tab ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          Account
        </button>
      </div>

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div>
          {bookings.length > 0 ? (
            <div className="bookings-list">
              {bookings.map(booking => (
                <div key={booking.id} className="booking-item">
                  <img src={booking.car.image} alt={`${booking.car.make} ${booking.car.model}`} />
                  <div className="booking-info">
                    <h3>{booking.car.year} {booking.car.make} {booking.car.model}</h3>
                    <div className="booking-dates">
                      <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </span>
                      <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {booking.car.location}
                      </span>
                    </div>
                    <span className={`booking-status ${booking.status}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="booking-actions">
                    <div style={{ fontSize: '24px', fontWeight: '700' }}>${booking.total}</div>
                    <Link to={`/car/${booking.car.id}`} className="btn btn-secondary">
                      View car
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <h3>No trips yet</h3>
              <p>When you book a car, your trips will appear here.</p>
              <Link to="/search" className="btn btn-primary">Browse cars</Link>
            </div>
          )}
        </div>
      )}

      {/* My Cars Tab */}
      {activeTab === 'cars' && (
        <div className="my-cars-grid">
          <Link to="/host" className="add-car-card">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            <span style={{ fontSize: '16px', fontWeight: '500' }}>List a new car</span>
          </Link>
          
          {myCars.map(car => (
            <div key={car.id} className="car-card" style={{ cursor: 'default' }}>
              <img src={car.image} alt={`${car.make} ${car.model}`} className="car-image" />
              <div className="car-info">
                <h3 className="car-title">{car.year} {car.make} {car.model}</h3>
                <div className="car-rating">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <span>{car.rating > 0 ? car.rating.toFixed(1) : 'New'}</span>
                  <span>({car.trips} trips)</span>
                </div>
                <div className="car-price">
                  ${car.price} <span>/ day</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button className="btn btn-secondary" style={{ flex: 1 }}>Edit</button>
                  <button className="btn btn-outline" style={{ flex: 1 }}>Pause</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Favorites Tab */}
      {activeTab === 'favorites' && (
        <div>
          {favoriteCars.length > 0 ? (
            <div className="car-grid">
              {favoriteCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <h3>No favorites yet</h3>
              <p>Save cars you like by clicking the heart icon.</p>
              <Link to="/search" className="btn btn-primary">Browse cars</Link>
            </div>
          )}
        </div>
      )}

      {/* Account Tab */}
      {activeTab === 'account' && (
        <div style={{ maxWidth: '600px' }}>
          <div className="form-section">
            <h3>Profile Information</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <img 
                src={user.avatar} 
                alt={user.name}
                style={{ width: '80px', height: '80px', borderRadius: '50%' }}
              />
              <div>
                <h4 style={{ margin: 0 }}>{user.name}</h4>
                <p style={{ margin: '4px 0 0', color: '#666' }}>{user.email}</p>
              </div>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue={user.name} />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue={user.email} />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="Add phone number" />
            </div>

            <button className="btn btn-primary" style={{ marginTop: '16px' }}>
              Save changes
            </button>
          </div>

          <div className="form-section" style={{ marginTop: '24px' }}>
            <h3>Password</h3>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" placeholder="Enter current password" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" />
            </div>
            <button className="btn btn-secondary" style={{ marginTop: '16px' }}>
              Update password
            </button>
          </div>

          <div className="form-section" style={{ marginTop: '24px' }}>
            <h3>Notifications</h3>
            <label className="checkbox-item" style={{ marginBottom: '12px' }}>
              <input type="checkbox" defaultChecked />
              Email notifications for bookings
            </label>
            <label className="checkbox-item" style={{ marginBottom: '12px' }}>
              <input type="checkbox" defaultChecked />
              Email notifications for messages
            </label>
            <label className="checkbox-item" style={{ marginBottom: '12px' }}>
              <input type="checkbox" />
              Marketing emails
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
