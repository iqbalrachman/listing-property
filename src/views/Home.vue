<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import PropertyCard from '../components/PropertyCard.vue'
import { fetchProperties } from '../services/api'
import { isFeatured } from '../services/format'

const settings = inject('settings')
const router = useRouter()

const properties = ref([])
const loading = ref(true)
const error = ref('')

const featuredList = computed(() => properties.value.filter(p => isFeatured(p.featured)))
const highlighted = computed(() => {
  const source = featuredList.value.length ? featuredList.value : properties.value
  return [...source].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10)
})
const sectionTitle = computed(() => featuredList.value.length ? 'Properti Pilihan' : 'Properti Terbaru')

// Data untuk dropdown quick search, diambil dari data yang sudah ada
const cityOptions = computed(() => {
  const set = new Set(properties.value.map(p => p.city).filter(Boolean))
  return Array.from(set).sort()
})
const typeOptions = computed(() => {
  const set = new Set(properties.value.map(p => p.property_type).filter(Boolean))
  return Array.from(set).sort()
})

const search = ref({ keyword: '', city: '', type: '' })

function submitSearch() {
  const query = {}
  if (search.value.keyword) query.keyword = search.value.keyword
  if (search.value.city) query.city = search.value.city
  if (search.value.type) query.type = search.value.type
  router.push({ path: '/listing', query })
}

// Scroll horizontal untuk featured
const scrollTrack = ref(null)
function scrollFeatured(direction) {
  if (!scrollTrack.value) return
  const amount = scrollTrack.value.clientWidth * 0.8
  scrollTrack.value.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' })
}

const reasons = [
  {
    icon: 'M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z',
    title: 'Terpercaya',
    desc: 'Setiap listing diverifikasi langsung oleh agent, bukan sekadar diambil dari sumber lain.'
  },
  {
    icon: 'M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z',
    title: 'Banyak Pilihan',
    desc: 'Rumah, tanah, hingga properti komersial tersedia dengan lokasi dan budget beragam.'
  },
  {
    icon: 'M20 12v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7M3 8h18v4H3V8zm9-5v17M12 8s-2-3-4-3-3 2-1 3 5 0 5 0 1-3-1-3-3 0-4 3',
    title: 'Bonus & Diskon',
    desc: 'Promo dan penawaran khusus untuk pembeli yang menghubungi langsung lewat WhatsApp.'
  }
]

onMounted(async () => {
  try {
    properties.value = await fetchProperties()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- HERO -->
  <section class="hero">
    <img class="hero-bg" :src="`${import.meta.env.BASE_URL}hero.jpg`" alt="" @error="$event.target.style.display='none'" />
    <div class="hero-overlay"></div>
    <div class="container hero-inner">
      <span class="stamp">Katalog Properti</span>
      <h1>{{ settings?.hero_title || 'Temukan Properti Impian Anda' }}</h1>
      <p class="hero-sub">
        Jelajahi listing rumah, apartemen, ruko, tanah, dan properti komersial pilihan
        di area Jabodetabek.
      </p>

      <form class="search-box" @submit.prevent="submitSearch">
        <div class="search-field grow">
          <svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Cari judul atau kota..." v-model="search.keyword" />
        </div>
        <select v-model="search.city">
          <option value="">Semua Kota</option>
          <option v-for="c in cityOptions" :key="c" :value="c">{{ c }}</option>
        </select>
        <select v-model="search.type">
          <option value="">Semua Tipe</option>
          <option v-for="t in typeOptions" :key="t" :value="t">{{ t }}</option>
        </select>
        <button type="submit" class="btn btn-accent">Cari</button>
      </form>
    </div>
  </section>

  <!-- FEATURED -->
  <section class="container latest">
    <div class="section-head">
      <h2>{{ sectionTitle }}</h2>
      <div class="head-actions">
        <router-link to="/listing" class="see-all mono">Lihat semua →</router-link>
      </div>
    </div>

    <p v-if="loading" class="status mono">Memuat data...</p>
    <p v-else-if="error" class="status mono error">{{ error }}</p>
    <p v-else-if="!highlighted.length" class="status mono">Belum ada properti yang tersedia.</p>

    <div v-else class="scroll-wrap">
      <button class="scroll-btn prev" @click="scrollFeatured('prev')" aria-label="Sebelumnya">
        <svg class="icon" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div class="scroll-track" ref="scrollTrack">
        <div class="scroll-item" v-for="p in highlighted" :key="p.id">
          <PropertyCard :property="p" />
        </div>
      </div>
      <button class="scroll-btn next" @click="scrollFeatured('next')" aria-label="Berikutnya">
        <svg class="icon" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  </section>

  <!-- KENAPA PILIH KAMI -->
  <section class="container trust">
    <h2 class="trust-title">Mengapa Cari Properti di {{ settings?.site_name || 'Kami' }}?</h2>
    <div class="trust-grid">
      <div class="trust-card" v-for="r in reasons" :key="r.title">
        <div class="trust-icon">
          <svg class="icon" viewBox="0 0 24 24"><path :d="r.icon"/></svg>
        </div>
        <h3>{{ r.title }}</h3>
        <p>{{ r.desc }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* HERO */
.hero {
  position: relative;
  padding: 100px 0 70px;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  background: radial-gradient(circle at top left, rgba(108,92,231,0.3), transparent 60%), var(--bg);
}
.hero-bg {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover;
  opacity: 0.35;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(11,15,25,0.4), var(--bg) 90%);
}
.hero-inner { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
.hero-inner .stamp { color: var(--accent); border-color: rgba(0,229,199,0.35); }
.hero h1 { font-size: clamp(32px, 5vw, 54px); max-width: 720px; line-height: 1.1; color: var(--text); }
.hero-sub { color: var(--text-muted); max-width: 520px; font-size: 16px; margin: 0; }

.search-box {
  display: flex; flex-wrap: wrap; gap: 10px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 10px;
  margin-top: 8px;
  width: 100%; max-width: 720px;
}
.search-field {
  display: flex; align-items: center; gap: 8px;
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 10px 12px;
}
.search-field.grow { flex: 1 1 220px; }
.search-field .icon { color: var(--text-muted); width: 16px; height: 16px; flex-shrink: 0; }
.search-field input { border: none; background: none; outline: none; color: var(--text); font-size: 14px; width: 100%; }
.search-box select {
  font-family: var(--font-body); font-size: 14px;
  padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius);
  background: var(--surface-alt); color: var(--text);
}
.search-box .btn { flex-shrink: 0; }
@media (max-width: 640px) {
  .search-box { flex-direction: column; }
  .search-box select, .search-box .btn { width: 100%; }
}

/* FEATURED SCROLL */
.latest { padding: 56px 24px; }
.section-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px; }
.section-head h2 { font-size: 24px; }
.see-all { font-size: 13px; color: var(--accent); }
.status { color: var(--text-muted); font-size: 13px; }
.status.error { color: var(--terjual); }

.scroll-wrap { position: relative; }
.scroll-track {
  display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory;
  padding-bottom: 8px;
  scrollbar-width: none;
}
.scroll-track::-webkit-scrollbar { display: none; }
.scroll-item { flex: 0 0 260px; scroll-snap-align: start; }
.scroll-btn {
  position: absolute; top: 40%; transform: translateY(-50%);
  width: 38px; height: 38px; border-radius: 50%;
  background: var(--surface); border: 1px solid var(--line);
  color: var(--text); display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 3;
}
.scroll-btn:hover { border-color: var(--primary-light); color: var(--primary-light); }
.scroll-btn.prev { left: -8px; }
.scroll-btn.next { right: -8px; }
@media (max-width: 900px) { .scroll-btn { display: none; } }

/* TRUST SECTION */
.trust { padding: 20px 24px 64px; }
.trust-title { font-size: 24px; text-align: center; margin-bottom: 32px; }
.trust-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;
}
.trust-card {
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius);
  padding: 28px 22px; text-align: center;
  transition: border-color 0.15s ease, transform 0.15s ease;
}
.trust-card:hover { border-color: var(--primary); transform: translateY(-3px); }
.trust-icon {
  width: 52px; height: 52px; border-radius: 50%;
  background: rgba(108,92,231,0.15);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
}
.trust-icon .icon { width: 24px; height: 24px; color: var(--primary-light); }
.trust-card h3 { font-size: 17px; margin-bottom: 8px; }
.trust-card p { font-size: 13px; color: var(--text-muted); line-height: 1.6; margin: 0; }
</style>
