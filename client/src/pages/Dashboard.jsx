import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../services/api'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
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
      <p style={{ marginTop: 16 }}>This is your dashboard. Build your large project here.</p>
    </div>
  )
}
