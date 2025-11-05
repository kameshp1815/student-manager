import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../services/api'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch('/auth/me')
        setUser(res.user)
      } catch (e) {
        setError('Please login again')
      }
    }
    load()
  }, [])

  useEffect(() => {
    async function loadCount() {
      try {
        const res = await apiFetch('/students/count')
        setCount(res.count || 0)
      } catch (e) {
        // ignore, already handled by auth
      }
    }
    loadCount()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 24, border: '1px solid #93c5fd', borderRadius: 8, background: '#ffffff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome{user?.name ? `, ${user.name}` : ''}</h2>
        <button onClick={logout}>Logout</button>
      </div>
      {error && (
        <div style={{ color: '#1d4ed8', background: '#eff6ff', padding: 8, borderRadius: 6, marginTop: 12, border: '1px solid #93c5fd' }}>
          {error}
        </div>
      )}
      <div style={{ marginTop: 16 }}>
        <div style={{ padding: 12, border: '1px solid #93c5fd', borderRadius: 8, background: '#ffffff' }}>
          <strong>Total students:</strong> {count}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button onClick={() => navigate('/students/new')}>Add Student</button>
          <button onClick={() => navigate('/students')}>View Students</button>
        </div>
      </div>
    </div>
  )
}
