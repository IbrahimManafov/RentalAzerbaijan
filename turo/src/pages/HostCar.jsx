import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import { locations } from '../data/cars'

function HostCar() {
  const { user, addCar } = useContext(AppContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '2023',
    category: 'Sedan',
    price: '',
    location: '',
    transmission: 'Automatic',
    fuelType: 'Gas',
    seats: '5',
    doors: '4',
    description: '',
    features: []
  })
  
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const allFeatures = [
    'Bluetooth', 'USB Charger', 'Backup Camera', 'Navigation', 
    'Heated Seats', 'Leather Seats', 'Sunroof', 'Apple CarPlay',
    'Android Auto', 'Cruise Control', '4WD', 'Sport Mode',
    'Parking Sensors', 'Blind Spot Monitor', 'Lane Assist', 'Autopilot'
  ]

  const carMakes = [
    'Acura', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler',
    'Dodge', 'Ferrari', 'Ford', 'GMC', 'Honda', 'Hyundai', 'Infiniti',
    'Jaguar', 'Jeep', 'Kia', 'Lamborghini', 'Land Rover', 'Lexus',
    'Lincoln', 'Maserati', 'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi',
    'Nissan', 'Porsche', 'Ram', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!user) {
      navigate('/signin')
      return
    }

    if (!formData.make || !formData.model || !formData.price || !formData.location) {
      setMessage('Please fill in all required fields')
      return
    }

    setLoading(true)

    const newCar = {
      ...formData,
      price: parseInt(formData.price),
      year: parseInt(formData.year),
      seats: parseInt(formData.seats),
      doors: parseInt(formData.doors),
      image: `https://source.unsplash.com/800x600/?${formData.make}+${formData.model}+car`,
      images: [
        `https://source.unsplash.com/800x600/?${formData.make}+car`,
        `https://source.unsplash.com/800x600/?${formData.model}+car`,
        `https://source.unsplash.com/800x600/?car+interior`,
        `https://source.unsplash.com/800x600/?car+wheel`
      ]
    }

    setTimeout(() => {
      addCar(newCar)
      setMessage('Car listed successfully!')
      setLoading(false)
      
      setTimeout(() => {
        navigate('/dashboard?tab=cars')
      }, 1500)
    }, 1000)
  }

  if (!user) {
    return (
      <div className="host-page">
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
            <circle cx="6.5" cy="16.5" r="2.5"/>
            <circle cx="16.5" cy="16.5" r="2.5"/>
          </svg>
          <h3>Sign in to list your car</h3>
          <p>Create an account or sign in to start earning with your car.</p>
          <button onClick={() => navigate('/signin')} className="btn btn-primary">
            Sign in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="host-page">
      <h1>List your car</h1>
      <p>Share your car with travelers and earn extra income</p>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form className="host-form" onSubmit={handleSubmit}>
        {/* Car Details */}
        <div className="form-section">
          <h3>Car Details</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Make *</label>
              <select name="make" value={formData.make} onChange={handleChange} required>
                <option value="">Select make</option>
                {carMakes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Model *</label>
              <input
                type="text"
                name="model"
                placeholder="e.g., Model 3, Camry, Mustang"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Year</label>
              <select name="year" value={formData.year} onChange={handleChange}>
                {Array.from({ length: 15 }, (_, i) => 2024 - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Sports">Sports</option>
                <option value="Electric">Electric</option>
                <option value="Exotic">Exotic</option>
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Transmission</label>
              <select name="transmission" value={formData.transmission} onChange={handleChange}>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Fuel Type</label>
              <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
                <option value="Gas">Gas</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Seats</label>
              <select name="seats" value={formData.seats} onChange={handleChange}>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8+</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Doors</label>
              <select name="doors" value={formData.doors} onChange={handleChange}>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing & Location */}
        <div className="form-section">
          <h3>Pricing & Location</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Daily Price ($) *</label>
              <input
                type="number"
                name="price"
                placeholder="e.g., 75"
                value={formData.price}
                onChange={handleChange}
                min="25"
                max="2000"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Location *</label>
              <select name="location" value={formData.location} onChange={handleChange} required>
                <option value="">Select location</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="form-section">
          <h3>Description</h3>
          <div className="form-group">
            <label>Tell guests about your car</label>
            <textarea
              name="description"
              placeholder="Describe your car, its condition, and what makes it special..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>
        </div>

        {/* Features */}
        <div className="form-section">
          <h3>Features</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Select the features your car has
          </p>
          <div className="feature-checkboxes">
            {allFeatures.map(feature => (
              <label key={feature} className="feature-checkbox">
                <input
                  type="checkbox"
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                />
                {feature}
              </label>
            ))}
          </div>
        </div>

        {/* Photos */}
        <div className="form-section">
          <h3>Photos</h3>
          <div className="image-upload">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p>Photos will be automatically generated based on your car details</p>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Listing your car...' : 'List your car'}
        </button>
      </form>
    </div>
  )
}

export default HostCar
