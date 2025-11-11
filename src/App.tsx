import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Login'
import Logs from './pages/Logs'
import Managers from './pages/Managers'
import TelegramUsers from './pages/TelegramUsers'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/logs"
            element={
              <PrivateRoute>
                <Logs />
              </PrivateRoute>
            }
          />
          <Route
            path="/telegram-users"
            element={
              <PrivateRoute>
                <TelegramUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="/managers"
            element={
              <PrivateRoute>
                <Managers />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/logs" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

