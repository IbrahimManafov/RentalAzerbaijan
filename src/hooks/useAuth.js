import { useState } from 'react'

const makeUser = (name, email) => ({
  id: Date.now(),
  email,
  name,
  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=593cfb&color=fff`
})

export function useAuth() {
  const [user, setUser] = useState(null)

  const login = (email, _password) => {
    setUser(makeUser(email.split('@')[0], email))
    return true
  }

  const register = (name, email, _password) => {
    setUser(makeUser(name, email))
    return true
  }

  const logout = () => setUser(null)

  return { user, login, register, logout }
}