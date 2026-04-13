import { createContext, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CarDetail from './pages/CarDetail'
import Search from './pages/Search'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import HostCar from './pages/HostCar'
import Dashboard from './pages/Dashboard'
import { useAuth } from './hooks/useAuth'
import { useCars } from './hooks/useCars'
import { useBookings } from './hooks/useBookings'

export const AppContext = createContext()
export const useAppContext = () => useContext(AppContext)

function App() {
  const { user, login, register, logout: authLogout } = useAuth()
  const { cars, myCars, favorites, addCar, toggleFavorite, resetCars } = useCars(user)
  const { bookings, addBooking: addBookingBase, resetBookings } = useBookings()

  const logout = () => {
    authLogout()
    resetBookings()
    resetCars()
  }

  const addBooking = (booking) => addBookingBase(booking, user?.id)

  return (
    <AppContext.Provider value={{
      user, cars, bookings, favorites, myCars,
      login, register, logout, addBooking, toggleFavorite, addCar,
    }}>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/car/:id"   element={<CarDetail />} />
            <Route path="/search"    element={<Search />} />
            <Route path="/signin"    element={<SignIn />} />
            <Route path="/signup"    element={<SignUp />} />
            <Route path="/host"      element={<HostCar />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

export default App