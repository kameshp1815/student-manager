import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../services/api'

export default function StudentsList() {
  const [students, setStudents] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isAdmin] = useState(true)
  const navigate = useNavigate()

  async function load(search) {
    setLoading(true)
    setError('')
    try {
      const res = await apiFetch(`/students${search ? `?q=${encodeURIComponent(search)}` : ''}`)
      setStudents(res.students || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load('')
  }, [])

  const onSearch = (e) => {
    e.preventDefault()
    load(q)
  }

  const onAdd = () => navigate('/students/new')
  const onEdit = (id) => navigate(`/students/${id}`)

  async function onDelete(id) {
    if (!confirm('Delete this student?')) return
    try {
      await apiFetch(`/students/${id}`, { method: 'DELETE' })
      setStudents((prev) => prev.filter((s) => s._id !== id))
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, border: '1px solid #93c5fd', borderRadius: 8, background: '#ffffff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2>Students</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <form onSubmit={onSearch} style={{ display: 'flex', gap: 8 }}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" style={{ padding: 8, border: '1px solid #93c5fd', borderRadius: 6 }} />
            <button type="submit">Search</button>
          </form>
          <button onClick={onAdd}>Add Student</button>
        </div>
      </div>
      {error && (
        <div style={{ color: '#1d4ed8', background: '#eff6ff', padding: 8, borderRadius: 6, marginBottom: 12, border: '1px solid #93c5fd' }}>
          {error}
        </div>
      )}
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ padding: '8px 6px', borderBottom: '1px solid #93c5fd' }}>Name</th>
                <th style={{ padding: '8px 6px', borderBottom: '1px solid #93c5fd' }}>Email</th>
                <th style={{ padding: '8px 6px', borderBottom: '1px solid #93c5fd' }}>Phone</th>
                <th style={{ padding: '8px 6px', borderBottom: '1px solid #93c5fd' }}>Course</th>
                <th style={{ padding: '8px 6px', borderBottom: '1px solid #93c5fd' }}></th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td style={{ padding: '8px 6px', borderBottom: '1px solid #93c5fd' }}>{s.name}</td>
                  <td style={{ padding: '8px 6px', borderBottom: '1px solid #93c5fd' }}>{s.email}</td>
                  <td style={{ padding: '8px 6px', borderBottom: '1px solid #93c5fd' }}>{s.phone}</td>
                  <td style={{ padding: '8px 6px', borderBottom: '1px solid #93c5fd' }}>{s.course}</td>
                  <td style={{ padding: '8px 6px', borderBottom: '1px solid #93c5fd', whiteSpace: 'nowrap' }}>
                    <>
                      <button onClick={() => onEdit(s._id)} style={{ marginRight: 8 }}>Edit</button>
                      <button onClick={() => onDelete(s._id)}>Delete</button>
                    </>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '12px 6px' }}>No students</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
