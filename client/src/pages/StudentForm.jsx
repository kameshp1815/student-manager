import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiFetch } from '../services/api'

export default function StudentForm() {
  const { id } = useParams()
  const isEdit = !!id
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!isEdit) return
    ;(async () => {
      try {
        const { student } = await apiFetch(`/students/${id}`)
        setForm({ name: student.name, email: student.email, phone: student.phone, course: student.course })
      } catch (e) {
        setError(e.message)
      }
    })()
  }, [id, isEdit])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (isEdit) {
        await apiFetch(`/students/${id}`, { method: 'PUT', body: form })
      } else {
        await apiFetch('/students', { method: 'POST', body: form })
      }
      navigate('/students')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24, border: '1px solid #93c5fd', borderRadius: 8, background: '#ffffff' }}>
      <h2 style={{ marginBottom: 16 }}>{isEdit ? 'Edit Student' : 'Add Student'}</h2>
      {error && (
        <div style={{ color: '#1d4ed8', background: '#eff6ff', padding: 8, borderRadius: 6, marginBottom: 12, border: '1px solid #93c5fd' }}>
          {error}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Name</label>
          <input name="name" value={form.name} onChange={onChange} required style={{ width: '100%', padding: 8, border: '1px solid #93c5fd', borderRadius: 6 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Email</label>
          <input name="email" value={form.email} onChange={onChange} type="email" required style={{ width: '100%', padding: 8, border: '1px solid #93c5fd', borderRadius: 6 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Phone</label>
          <input name="phone" value={form.phone} onChange={onChange} required style={{ width: '100%', padding: 8, border: '1px solid #93c5fd', borderRadius: 6 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Course</label>
          <input name="course" value={form.course} onChange={onChange} required style={{ width: '100%', padding: 8, border: '1px solid #93c5fd', borderRadius: 6 }} />
        </div>
        <button disabled={loading} type="submit" style={{ width: '100%', padding: 10 }}>{loading ? 'Please wait…' : 'Save'}</button>
      </form>
    </div>
  )
}
