import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import StudentsList from './pages/StudentsList'
import StudentForm from './pages/StudentForm'

function RequireAuth({ children }) {
  const location = useLocation()
  const isAuthed = !!localStorage.getItem('token')
  if (!isAuthed) return <Navigate to="/" replace state={{ from: location }} />
  return children
}

function App() {
  const isAuthed = !!localStorage.getItem('token')
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/students" element={<RequireAuth><StudentsList /></RequireAuth>} />
      <Route path="/students/new" element={<RequireAuth><StudentForm /></RequireAuth>} />
      <Route path="/students/:id" element={<RequireAuth><StudentForm /></RequireAuth>} />
      <Route path="*" element={<Navigate to={isAuthed ? '/dashboard' : '/'} replace />} />
    </Routes>
  )
}

export default App
