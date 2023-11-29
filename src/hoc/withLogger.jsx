import {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router'

export const withLogger = Component => {
  const WithLogger = props => {
    const navigate = useNavigate()
    const currentLocation = useLocation().pathname

    useEffect(() => {
      const token = localStorage.getItem('token')
      if (token && currentLocation === '/login') {
        localStorage.removeItem('token')
      }
      if (!token) {
        navigate('/login')
      }
    }, [currentLocation, navigate])

    return <Component {...props} />
  }
  return WithLogger
}
