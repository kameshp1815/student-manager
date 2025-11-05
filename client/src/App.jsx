import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'

function App() {
  const isAuthed = !!localStorage.getItem('token')
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route
        path="/dashboard"
        element={isAuthed ? <Dashboard /> : <Navigate to="/" replace />}
      />
      <Route path="*" element={<Navigate to={isAuthed ? '/dashboard' : '/'} replace />} />
    </Routes>
  )
}

export default App
