import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AppContext } from '../App'

function Header() {
  const { user, logout } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="header">
      <Link to="/" className="header-logo">
      <img src="https://i.ibb.co/RGCYWfYm/Screenshot-2.png" alt="" />
      </Link>
      
      <nav className="header-nav">
        <Link to="/host">Become a host</Link>
        <Link to="/search">Find cars</Link>
      </nav>
      
      <div className="header-actions">
        {user ? (
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #e5e5e5'
              }}
            >
              <img 
                src={user.avatar} 
                alt={user.name}
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
              />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>{user.name}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            
            {showMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                minWidth: '200px',
                zIndex: 100
              }}>
                <Link 
                  to="/dashboard" 
                  onClick={() => setShowMenu(false)}
                  style={{ display: 'block', padding: '12px 16px', fontSize: '14px' }}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/dashboard?tab=bookings" 
                  onClick={() => setShowMenu(false)}
                  style={{ display: 'block', padding: '12px 16px', fontSize: '14px' }}
                >
                  My Trips
                </Link>
                <Link 
                  to="/dashboard?tab=cars" 
                  onClick={() => setShowMenu(false)}
                  style={{ display: 'block', padding: '12px 16px', fontSize: '14px' }}
                >
                  My Cars
                </Link>
                <Link 
                  to="/dashboard?tab=favorites" 
                  onClick={() => setShowMenu(false)}
                  style={{ display: 'block', padding: '12px 16px', fontSize: '14px' }}
                >
                  Favorites
                </Link>
                <div style={{ borderTop: '1px solid #e5e5e5', margin: '8px 0' }} />
                <button 
                  onClick={() => { logout(); setShowMenu(false); }}
                  style={{ 
                    display: 'block', 
                    width: '100%', 
                    padding: '12px 16px', 
                    fontSize: '14px', 
                    textAlign: 'left',
                    color: '#e53935'
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signin" className="btn btn-outline">Sign in</Link>
            <Link to="/signup" className="btn btn-primary">Sign up</Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
