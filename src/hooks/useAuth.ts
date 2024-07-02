import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      navigate('/login')
    }
  }, [navigate])

  return { isAuthenticated }
}
