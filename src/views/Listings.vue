<script setup>
import { ref, onMounted, computed } from 'vue'
import PropertyCard from '../components/PropertyCard.vue'
import FilterBar from '../components/FilterBar.vue'
import { fetchProperties } from '../services/api'
import { priceInRange } from '../services/format'

const properties = ref([])
const loading = ref(true)
const error = ref('')
const filters = ref({ type: '', city: '', priceRange: '' })

const filtered = computed(() => {
  return properties.value.filter(p => {
    if (filters.value.type && p.property_type !== filters.value.type) return false
    if (filters.value.city && p.city !== filters.value.city) return false
    if (filters.value.priceRange && !priceInRange(p.price, filters.value.priceRange)) return false
    return true
  })
})

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
    <div v-else class="grid">
      <PropertyCard v-for="p in filtered" :key="p.id" :property="p" />
    </div>
  </section>
</template>

<style scoped>
.listings {
  padding: 40px 24px 64px;
}
.page-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
}
.page-head h1 { font-size: 28px; }
.count { color: var(--text-muted); font-size: 13px; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 24px;
}
.status {
  margin-top: 24px;
  color: var(--text-muted);
  font-size: 13px;
}
.status.error { color: var(--terjual); }
</style>
