import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children, guestAllowed = false }) {
  const token = localStorage.getItem('token')
  const isGuest = localStorage.getItem('isGuest') === 'true'

  if (!token && !isGuest) {
    return <Navigate to="/login" replace />
  }

  if (!token && isGuest && !guestAllowed) {
    return <Navigate to="/login" replace />
  }

  return children
}