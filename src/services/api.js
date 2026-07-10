// URL Web App Apps Script, diisi di file .env (lihat .env.example)
const API_URL = import.meta.env.VITE_API_URL

async function request(action, params = {}) {
  if (!API_URL) {
    throw new Error('VITE_API_URL belum diatur. Cek file .env')
  }
  const url = new URL(API_URL)
  url.searchParams.set('action', action)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error('Gagal menghubungi server (status ' + res.status + ')')
  }
  const json = await res.json()
  if (!json.success) {
    throw new Error(json.message || 'Terjadi kesalahan pada server')
  }
  return json.data
}

export function fetchProperties() {
  return request('properties')
}

export function fetchPropertyById(id) {
  return request('property', { id })
}

export function fetchSettings() {
  return request('settings')
}
