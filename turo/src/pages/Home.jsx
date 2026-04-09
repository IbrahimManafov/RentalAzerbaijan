import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import SearchBox from '../components/SearchBox'
import CarCard from '../components/CarCard'
import { categories } from '../data/cars'

function Home() {
  const { cars } = useContext(AppContext)
  const featuredCars = cars.slice(0, 8)
  const sportsCars = cars.filter(car => car.category === 'Sports').slice(0, 4)
  const suvCars = cars.filter(car => car.category === 'SUV').slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80" 
            alt="Luxury car on road"
            className="hero-bg-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1>Find your drive</h1>
          <p>Explore the world&apos;s largest car sharing marketplace</p>
          <SearchBox />
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">350K+</span>
              <span className="stat-label">Active listings</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">14M+</span>
              <span className="stat-label">Trips completed</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">8,500+</span>
              <span className="stat-label">Cities worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Browse by type</h2>
        <div className="category-grid">
          {categories.map(category => (
            <Link 
              to={`/search?category=${category.id}`} 
              key={category.id} 
              className="category-card"
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: '#593cfb', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                {category.id === 'electric' && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                )}
                {category.id === 'sports' && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                )}
                {category.id === 'suv' && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13"/>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                )}
                {category.id === 'sedan' && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
                    <circle cx="6.5" cy="16.5" r="2.5"/>
                    <circle cx="16.5" cy="16.5" r="2.5"/>
                  </svg>
                )}
                {category.id === 'exotic' && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                )}
                {category.id === 'all' && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                )}
              </div>
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section className="car-section">
        <div className="section-header">
          <h2>Featured cars</h2>
          <Link to="/search" className="btn btn-secondary">View all</Link>
        </div>
        <div className="car-grid">
          {featuredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Sports Cars */}
      {sportsCars.length > 0 && (
        <section className="car-section">
          <div className="section-header">
            <h2>Sports cars</h2>
            <Link to="/search?category=sports" className="btn btn-secondary">View all</Link>
          </div>
          <div className="car-grid">
            {sportsCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="how-it-works">
        <h2>How Rental works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
            <h3>Find the perfect car</h3>
            <p>Enter a location and date and browse thousands of cars shared by local hosts.</p>
          </div>
          
          <div className="step">
            <div className="step-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h3>Book your trip</h3>
            <p>Book on the Rental website or app, and get ready for an unforgettable trip.</p>
          </div>
          
          <div className="step">
            <div className="step-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
                <circle cx="6.5" cy="16.5" r="2.5"/>
                <circle cx="16.5" cy="16.5" r="2.5"/>
              </svg>
            </div>
            <h3>Hit the road</h3>
            <p>Meet your host at the car's location, unlock with the app, and drive off into your next adventure.</p>
          </div>
        </div>
      </section>

      {/* SUV Cars */}
      {suvCars.length > 0 && (
        <section className="car-section">
          <div className="section-header">
            <h2>Popular SUVs</h2>
            <Link to="/search?category=suv" className="btn btn-secondary">View all</Link>
          </div>
          <div className="car-grid">
            {suvCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>
      )}

      {/* Host CTA */}
      <section className="host-cta">
        <h2>Start earning with your car</h2>
        <p>Share your car when you're not using it and earn extra income. It's free to list and easy to get started.</p>
        <Link to="/host" className="btn btn-primary">Become a host</Link>
      </section>
    </div>
  )
}

export default Home
