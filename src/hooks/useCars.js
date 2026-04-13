import { useState } from 'react'
import { cars as initialCars } from '../data/cars'

export function useCars(user) {
  const [cars, setCars] = useState(initialCars)
  const [myCars, setMyCars] = useState([])
  const [favorites, setFavorites] = useState([])

  const addCar = (carData) => {
    const newCar = {
      ...carData,
      id: Date.now(),
      rating: 0,
      trips: 0,
      instantBook: true,
      host: {
        name: user.name,
        avatar: user.avatar,
        joined: String(new Date().getFullYear()),
        responseRate: '100%',
        trips: 0,
      },
    }
    setCars(prev => [newCar, ...prev])
    setMyCars(prev => [newCar, ...prev])
    return newCar
  }

  const toggleFavorite = (carId) =>
    setFavorites(prev =>
      prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]
    )

  const resetCars = () => setMyCars([])

  return { cars, myCars, favorites, addCar, toggleFavorite, resetCars }
}