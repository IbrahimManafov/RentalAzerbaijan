import { useState, useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AppContext } from '../App'
import CarCard from '../components/CarCard'
import { categories } from '../data/cars'

function Search() {
  const { cars } = useContext(AppContext)
  const [searchParams] = useSearchParams()
  
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || 'all',
    minPrice: '',
    maxPrice: '',
    transmission: '',
    fuelType: '',
    seats: '',
    instantBook: false,
    sortBy: 'recommended'
  })

  const [filteredCars, setFilteredCars] = useState(cars)

  useEffect(() => {
    let result = [...cars]

    // Location filter
    if (filters.location) {
      result = result.filter(car => 
        car.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      result = result.filter(car => 
        car.category.toLowerCase() === filters.category.toLowerCase()
      )
    }

    // Price filter
    if (filters.minPrice) {
      result = result.filter(car => car.price >= parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      result = result.filter(car => car.price <= parseInt(filters.maxPrice))
    }

    // Transmission filter
    if (filters.transmission) {
      result = result.filter(car => car.transmission === filters.transmission)
    }

    // Fuel type filter
    if (filters.fuelType) {
      result = result.filter(car => car.fuelType === filters.fuelType)
    }

    // Seats filter
    if (filters.seats) {
      result = result.filter(car => car.seats >= parseInt(filters.seats))
    }

    // Instant book filter
    if (filters.instantBook) {
      result = result.filter(car => car.instantBook)
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'trips':
        result.sort((a, b) => b.trips - a.trips)
        break
      default:
        // recommended - sort by rating * trips
        result.sort((a, b) => (b.rating * b.trips) - (a.rating * a.trips))
    }

    setFilteredCars(result)
  }, [filters, cars])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      category: 'all',
      minPrice: '',
      maxPrice: '',
      transmission: '',
      fuelType: '',
      seats: '',
      instantBook: false,
      sortBy: 'recommended'
    })
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>
          {filters.location 
            ? `Cars in ${filters.location}` 
            : filters.category !== 'all' 
              ? `${filters.category} cars` 
              : 'All available cars'}
        </h1>
        <p>{filteredCars.length} cars available</p>
      </div>

      {/* Quick Filters */}
      <div className="search-filters">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${filters.category === cat.id ? 'active' : ''}`}
            onClick={() => handleFilterChange('category', cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="search-content">
        {/* Sidebar Filters */}
        <div className="filters-sidebar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Filters</h3>
            <button 
              onClick={clearFilters}
              style={{ fontSize: '14px', color: '#593cfb' }}
            >
              Clear all
            </button>
          </div>

          {/* Location */}
          <div className="filter-section">
            <h4>Location</h4>
            <input
              type="text"
              placeholder="Enter city or area"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                border: '1px solid #e5e5e5', 
                borderRadius: '6px', 
                fontSize: '14px' 
              }}
            />
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <h4>Price per day</h4>
            <div className="price-range">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>
          </div>

          {/* Transmission */}
          <div className="filter-section">
            <h4>Transmission</h4>
            <div className="checkbox-group">
              <label className="checkbox-item">
                <input
                  type="radio"
                  name="transmission"
                  checked={filters.transmission === ''}
                  onChange={() => handleFilterChange('transmission', '')}
                />
                All
              </label>
              <label className="checkbox-item">
                <input
                  type="radio"
                  name="transmission"
                  checked={filters.transmission === 'Automatic'}
                  onChange={() => handleFilterChange('transmission', 'Automatic')}
                />
                Automatic
              </label>
              <label className="checkbox-item">
                <input
                  type="radio"
                  name="transmission"
                  checked={filters.transmission === 'Manual'}
                  onChange={() => handleFilterChange('transmission', 'Manual')}
                />
                Manual
              </label>
            </div>
          </div>

          {/* Fuel Type */}
          <div className="filter-section">
            <h4>Fuel type</h4>
            <div className="checkbox-group">
              <label className="checkbox-item">
                <input
                  type="radio"
                  name="fuelType"
                  checked={filters.fuelType === ''}
                  onChange={() => handleFilterChange('fuelType', '')}
                />
                All
              </label>
              <label className="checkbox-item">
                <input
                  type="radio"
                  name="fuelType"
                  checked={filters.fuelType === 'Gas'}
                  onChange={() => handleFilterChange('fuelType', 'Gas')}
                />
                Gas
              </label>
              <label className="checkbox-item">
                <input
                  type="radio"
                  name="fuelType"
                  checked={filters.fuelType === 'Electric'}
                  onChange={() => handleFilterChange('fuelType', 'Electric')}
                />
                Electric
              </label>
              <label className="checkbox-item">
                <input
                  type="radio"
                  name="fuelType"
                  checked={filters.fuelType === 'Hybrid'}
                  onChange={() => handleFilterChange('fuelType', 'Hybrid')}
                />
                Hybrid
              </label>
            </div>
          </div>

          {/* Seats */}
          <div className="filter-section">
            <h4>Minimum seats</h4>
            <select
              value={filters.seats}
              onChange={(e) => handleFilterChange('seats', e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px 12px', 
                border: '1px solid #e5e5e5', 
                borderRadius: '6px', 
                fontSize: '14px' 
              }}
            >
              <option value="">Any</option>
              <option value="2">2+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
              <option value="7">7+</option>
            </select>
          </div>

          {/* Instant Book */}
          <div className="filter-section">
            <label className="checkbox-item" style={{ fontWeight: '500' }}>
              <input
                type="checkbox"
                checked={filters.instantBook}
                onChange={(e) => handleFilterChange('instantBook', e.target.checked)}
              />
              Instant book only
            </label>
          </div>
        </div>

        {/* Results */}
        <div>
          {/* Sort */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              Showing {filteredCars.length} cars
            </span>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              style={{ 
                padding: '10px 16px', 
                border: '1px solid #e5e5e5', 
                borderRadius: '8px', 
                fontSize: '14px',
                background: '#fff'
              }}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="trips">Most Trips</option>
            </select>
          </div>

          {filteredCars.length > 0 ? (
            <div className="car-grid">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <h3>No cars found</h3>
              <p>Try adjusting your filters or search in a different location.</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
