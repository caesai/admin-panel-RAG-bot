import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Layout from './Layout'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Layout>{children}</Layout>
}

export default PrivateRoute

