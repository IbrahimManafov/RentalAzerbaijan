import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { locations } from '../data/cars'

function SearchBox() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredLocations = locations.filter(loc => 
    loc.toLowerCase().includes(location.toLowerCase())
  )

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (startDate) params.set('startDate', startDate)
    if (endDate) params.set('endDate', endDate)
    navigate(`/search?${params.toString()}`)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="search-box">
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-field" style={{ position: 'relative' }}>
          <label>Where</label>
          <input
            type="text"
            placeholder="City, airport, or address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {showSuggestions && filteredLocations.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              marginTop: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10,
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              {filteredLocations.map((loc, index) => (
                <div
                  key={index}
                  onClick={() => { setLocation(loc); setShowSuggestions(false); }}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
                  onMouseLeave={(e) => e.target.style.background = '#fff'}
                >
                  {loc}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="search-field">
          <label>From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={today}
          />
        </div>
        
        <div className="search-field">
          <label>Until</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || today}
          />
        </div>
        
        <div className="search-field">
          <label>Time</label>
          <select defaultValue="10:00">
            <option value="08:00">8:00 AM</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
            <option value="18:00">6:00 PM</option>
          </select>
        </div>
        
        <button type="submit" className="search-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBox
