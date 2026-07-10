<script setup>
import { computed } from 'vue'
import { formatRupiah } from '../services/format'

const props = defineProps({
  property: { type: Object, required: true }
})

const isSold = computed(() => props.property.status === 'Sold')
const coverUrl = computed(() => props.property.cover_url || '')
</script>

<template>
  <router-link :to="`/properti/${property.id}`" class="card">
    <div class="cover">
      <img v-if="coverUrl" :src="coverUrl" :alt="property.title" loading="lazy" />
      <div v-else class="cover-fallback mono">Foto belum tersedia</div>
      <span class="badge" :class="isSold ? 'badge-terjual' : 'badge-available'">
        {{ isSold ? 'Terjual' : 'Tersedia' }}
      </span>
      <span class="stamp id-stamp">{{ property.id }}</span>
    </div>
    <div class="body">
      <h3 class="title">{{ property.title }}</h3>
      <p class="location">{{ property.city }} · {{ property.property_type }}</p>
      <p class="price mono">{{ formatRupiah(property.price) }}</p>
      <div class="specs mono">
        <span v-if="property.land_area">LT {{ property.land_area }}m²</span>
        <span v-if="property.building_area">LB {{ property.building_area }}m²</span>
        <span v-if="property.bedroom">KT {{ property.bedroom }}</span>
        <span v-if="property.bathroom">KM {{ property.bathroom }}</span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.card {
  display: block;
  background: var(--paper-raised);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(20, 33, 61, 0.08);
}
.cover {
  position: relative;
  aspect-ratio: 4 / 3;
  background: #E4E6EA;
}
.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cover-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 12px;
}
.badge {
  position: absolute;
  top: 10px;
  left: 10px;
}
.id-stamp {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(255,255,255,0.92);
}
.body {
  padding: 16px;
}
.title {
  font-size: 17px;
  line-height: 1.3;
  margin-bottom: 4px;
}
.location {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0 0 10px;
}
.price {
  font-size: 16px;
  font-weight: 600;
  color: var(--brass-dark);
  margin: 0 0 10px;
}
.specs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 11px;
  color: var(--text-muted);
  border-top: 1px solid var(--line);
  padding-top: 10px;
}
</style>
