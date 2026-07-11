<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import PropertyCard from '../components/PropertyCard.vue'
import FilterBar from '../components/FilterBar.vue'
import { fetchProperties } from '../services/api'
import { priceInMinMax, matchesKeyword, sortProperties } from '../services/format'

const PAGE_SIZE = 9
const route = useRoute()

const properties = ref([])
const loading = ref(true)
const error = ref('')
const filters = ref({
  type: route.query.type || '',
  city: route.query.city || '',
  priceMin: '',
  priceMax: '',
  keyword: route.query.keyword || '',
  sort: 'newest'
})
const page = ref(1)

const filtered = computed(() => {
  let result = properties.value.filter(p => {
    if (filters.value.type && p.property_type !== filters.value.type) return false
    if (filters.value.city && p.city !== filters.value.city) return false
    if (!priceInMinMax(p.price, filters.value.priceMin, filters.value.priceMax)) return false
    if (!matchesKeyword(p, filters.value.keyword)) return false
    return true
  })
  return sortProperties(result, filters.value.sort)
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const paginated = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(start, start + PAGE_SIZE)
})

watch(filters, () => { page.value = 1 }, { deep: true })

function goToPage(p) {
  if (p < 1 || p > totalPages.value) return
  page.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

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
  <section class="container listings">
    <div class="page-head">
      <h1>Semua Listing</h1>
      <span class="mono count" v-if="!loading">{{ filtered.length }} properti</span>
    </div>

    <FilterBar :properties="properties" v-model="filters" />

    <p v-if="loading" class="status mono">Memuat data...</p>
    <p v-else-if="error" class="status mono error">{{ error }}</p>
    <p v-else-if="!filtered.length" class="status mono">
      Tidak ada properti yang cocok dengan filter ini.
    </p>

    <template v-else>
      <div class="grid">
        <PropertyCard v-for="p in paginated" :key="p.id" :property="p" />
      </div>

      <div class="pagination" v-if="totalPages > 1">
        <button class="btn btn-outline" :disabled="page === 1" @click="goToPage(page - 1)">←</button>
        <span class="mono page-info">Halaman {{ page }} / {{ totalPages }}</span>
        <button class="btn btn-outline" :disabled="page === totalPages" @click="goToPage(page + 1)">→</button>
      </div>
    </template>
  </section>
</template>

<style scoped>
.listings { padding: 40px 24px 64px; }
.page-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px; }
.page-head h1 { font-size: 28px; }
.count { color: var(--text-muted); font-size: 13px; }
.grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px; margin-top: 24px;
}
.status { margin-top: 24px; color: var(--text-muted); font-size: 13px; }
.status.error { color: var(--terjual); }
.pagination { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 36px; }
.page-info { color: var(--text-muted); font-size: 13px; }
</style>
