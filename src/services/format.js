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

// Bucket harga sesuai kesepakatan filter:
// <500 Juta | 500 Juta-1 M | 1 M-3 M | 3 M-5 M | >5 M
export const PRICE_RANGES = [
  { key: 'lt500jt', label: '< 500 Juta', min: 0, max: 500_000_000 },
  { key: '500jt-1m', label: '500 Juta - 1 M', min: 500_000_000, max: 1_000_000_000 },
  { key: '1m-3m', label: '1 M - 3 M', min: 1_000_000_000, max: 3_000_000_000 },
  { key: '3m-5m', label: '3 M - 5 M', min: 3_000_000_000, max: 5_000_000_000 },
  { key: 'gt5m', label: '> 5 M', min: 5_000_000_000, max: Infinity }
]

export function priceInRange(price, rangeKey) {
  const range = PRICE_RANGES.find(r => r.key === rangeKey)
  if (!range) return true
  const num = Number(price)
  return num >= range.min && num < range.max
}

// Kolom "featured" di sheet bisa berupa checkbox (TRUE/FALSE) atau teks (Ya/Tidak)
export function isFeatured(value) {
  if (value === true) return true
  if (!value) return false
  const v = String(value).trim().toLowerCase()
  return ['true', 'ya', 'yes', '1', 'checked'].includes(v)
}
