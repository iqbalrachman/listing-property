<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import PropertyCard from '../components/PropertyCard.vue'
import { fetchProperties } from '../services/api'
import { isFeatured } from '../services/format'

const settings = inject('settings')
const properties = ref([])
const loading = ref(true)
const error = ref('')

const featuredList = computed(() => properties.value.filter(p => isFeatured(p.featured)))

// Kalau ada properti yang ditandai featured di sheet, tampilkan itu.
// Kalau belum ada satupun yang ditandai, fallback ke 6 properti terbaru.
const latest = computed(() => {
  const source = featuredList.value.length ? featuredList.value : properties.value
  return [...source]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6)
})

const sectionTitle = computed(() =>
  featuredList.value.length ? 'Properti Pilihan' : 'Properti Terbaru'
)

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
  <section class="hero">
    <div class="container hero-inner">
      <span class="stamp">Katalog Properti</span>
      <h1>{{ settings?.hero_title || 'Temukan Properti Impian Anda' }}</h1>
      <p class="hero-sub">
        Jelajahi listing rumah, apartemen, ruko, tanah, dan properti komersial pilihan
        di area Jabodetabek.
      </p>
      <router-link to="/listing" class="btn btn-brass">Lihat Semua Listing</router-link>
    </div>
  </section>

  <section class="container latest">
    <div class="section-head">
      <h2>{{ sectionTitle }}</h2>
      <router-link to="/listing" class="see-all mono">Lihat semua →</router-link>
    </div>

    <p v-if="loading" class="status mono">Memuat data...</p>
    <p v-else-if="error" class="status mono error">{{ error }}</p>
    <p v-else-if="!latest.length" class="status mono">Belum ada properti yang tersedia.</p>
    <div v-else class="grid">
      <PropertyCard v-for="p in latest" :key="p.id" :property="p" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: var(--ink);
  color: var(--paper);
  padding: 80px 0 64px;
}
.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.hero-inner .stamp {
  color: var(--brass);
  border-color: rgba(184, 147, 95, 0.5);
}
.hero h1 {
  font-size: clamp(32px, 5vw, 52px);
  max-width: 700px;
  line-height: 1.1;
}
.hero-sub {
  color: #b8bfd4;
  max-width: 520px;
  font-size: 16px;
  margin: 0;
}
.latest {
  padding: 56px 24px;
}
.section-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 24px;
}
.section-head h2 { font-size: 24px; }
.see-all {
  font-size: 13px;
  color: var(--brass-dark);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.status {
  color: var(--text-muted);
  font-size: 13px;
}
.status.error { color: var(--terjual); }
</style>
