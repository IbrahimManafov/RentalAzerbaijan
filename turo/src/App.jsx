import { Routes, Route } from 'react-router-dom'
import { useState, createContext } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CarDetail from './pages/CarDetail'
import Search from './pages/Search'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import HostCar from './pages/HostCar'
import Dashboard from './pages/Dashboard'
import { cars as initialCars } from './data/cars'

export const AppContext = createContext()

function App() {
  const [user, setUser] = useState(null)
  const [cars, setCars] = useState(initialCars)
  const [bookings, setBookings] = useState([])
  const [favorites, setFavorites] = useState([])
  const [myCars, setMyCars] = useState([])

  const login = (email, password) => {
    const newUser = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=593cfb&color=fff`
    }
    setUser(newUser)
    return true
  }

  const register = (name, email, password) => {
    const newUser = {
      id: Date.now(),
      email,
      name,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=593cfb&color=fff`
    }
    setUser(newUser)
    return true
  }

  const logout = () => {
    setUser(null)
    setBookings([])
    setMyCars([])
  }

  const addBooking = (booking) => {
    setBookings([...bookings, { ...booking, id: Date.now(), status: 'upcoming' }])
  }

  const toggleFavorite = (carId) => {
    if (favorites.includes(carId)) {
      setFavorites(favorites.filter(id => id !== carId))
    } else {
      setFavorites([...favorites, carId])
    }
  }

  const addCar = (carData) => {
    const newCar = {
      ...carData,
      id: Date.now(),
      rating: 0,
      trips: 0,
      host: {
        name: user.name,
        avatar: user.avatar,
        joined: new Date().getFullYear().toString(),
        responseRate: "100%",
        trips: 0
      },
      instantBook: true
    }
    setCars([newCar, ...cars])
    setMyCars([newCar, ...myCars])
    return newCar
  }

  return (
    <AppContext.Provider value={{
      user,
      cars,
      bookings,
      favorites,
      myCars,
      login,
      register,
      logout,
      addBooking,
      toggleFavorite,
      addCar
    }}>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/host" element={<HostCar />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

export default App
