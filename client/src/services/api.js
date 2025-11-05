const API_BASE = '/api'

function getToken() {
  return localStorage.getItem('token')
}

export async function apiFetch(path, { method = 'GET', body, headers } = {}) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  }
  const token = getToken()
  if (token) opts.headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, opts)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.message || 'Request failed')
  }
  return data
}
