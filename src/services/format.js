export function formatRupiah(value) {
  const num = Number(value)
  if (!num || isNaN(num)) return '-'
  if (num >= 1_000_000_000) {
    return 'Rp ' + (num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1) + ' M'
  }
  if (num >= 1_000_000) {
    return 'Rp ' + (num / 1_000_000).toFixed(0) + ' Jt'
  }
  return 'Rp ' + num.toLocaleString('id-ID')
}

export function isFeatured(value) {
  if (value === true) return true
  if (!value) return false
  const v = String(value).trim().toLowerCase()
  return ['true', 'ya', 'yes', '1', 'checked'].includes(v)
}

// Filter harga minimum-maksimum bebas (bukan bucket tetap lagi)
export function priceInMinMax(price, min, max) {
  const num = Number(price)
  if (min !== '' && min !== null && num < Number(min)) return false
  if (max !== '' && max !== null && num > Number(max)) return false
  return true
}

// Pencarian kata kunci di judul & kota
export function matchesKeyword(property, keyword) {
  if (!keyword) return true
  const k = keyword.trim().toLowerCase()
  return (
    (property.title || '').toLowerCase().includes(k) ||
    (property.city || '').toLowerCase().includes(k)
  )
}

// Urutkan: price_asc, price_desc, newest, oldest
export function sortProperties(list, sortKey) {
  const arr = [...list]
  switch (sortKey) {
    case 'price_asc': return arr.sort((a, b) => Number(a.price) - Number(b.price))
    case 'price_desc': return arr.sort((a, b) => Number(b.price) - Number(a.price))
    case 'oldest': return arr.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    case 'newest':
    default: return arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  }
}
