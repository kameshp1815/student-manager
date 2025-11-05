import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../services/api'

export default function Auth() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const path = mode === 'login' ? '/auth/login' : '/auth/register'
      const payload = mode === 'login' ? { email: form.email, password: form.password } : form
      const res = await apiFetch(path, { method: 'POST', body: payload })
      localStorage.setItem('token', res.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '0 auto', padding: 24, border: '1px solid #93c5fd', borderRadius: 8, background: '#ffffff' }}>
      <h2 style={{ marginBottom: 16 }}>{mode === 'login' ? 'Login' : 'Register'}</h2>
      {error && (
        <div style={{ color: '#1d4ed8', background: '#eff6ff', padding: 8, borderRadius: 6, marginBottom: 12, border: '1px solid #93c5fd' }}>
          {error}
        </div>
      )}
      <form onSubmit={onSubmit}>
        {mode === 'register' && (
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>Name</label>
            <input name="name" value={form.name} onChange={onChange} required type="text" placeholder="Your name" style={{ width: '100%', padding: 8, border: '1px solid #93c5fd', borderRadius: 6 }} />
          </div>
        )}
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Email</label>
          <input name="email" value={form.email} onChange={onChange} required type="email" placeholder="you@example.com" style={{ width: '100%', padding: 8, border: '1px solid #93c5fd', borderRadius: 6 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Password</label>
          <input name="password" value={form.password} onChange={onChange} required type="password" placeholder="••••••••" minLength={6} style={{ width: '100%', padding: 8, border: '1px solid #93c5fd', borderRadius: 6 }} />
        </div>
        <button disabled={loading} type="submit" style={{ width: '100%', padding: 10 }}>
          {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create account'}
        </button>
      </form>
      <div style={{ marginTop: 12, textAlign: 'center' }}>
        {mode === 'login' ? (
          <button onClick={() => setMode('register')} style={{ background: 'transparent', border: 'none', color: '#2563eb', cursor: 'pointer' }}>
            Need an account? Register
          </button>
        ) : (
          <button onClick={() => setMode('login')} style={{ background: 'transparent', border: 'none', color: '#2563eb', cursor: 'pointer' }}>
            Already have an account? Login
          </button>
        )}
      </div>
    </div>
  )
}
