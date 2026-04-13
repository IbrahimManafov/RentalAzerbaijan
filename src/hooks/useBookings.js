import { useState } from 'react'

export function useBookings() {
  const [bookings, setBookings] = useState([])

  const addBooking = (booking, userId) =>
    setBookings(prev => [
      ...prev,
      { ...booking, id: Date.now(), userId, status: 'upcoming' },
    ])

  const resetBookings = () => setBookings([])

  return { bookings, addBooking, resetBookings }
}