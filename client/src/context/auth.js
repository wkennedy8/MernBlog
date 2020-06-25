import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      axios
        .get(`/users/current`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(({ data }) => {
          setCurrentUser(data)
        })
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
