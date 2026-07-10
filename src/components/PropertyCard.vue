<script setup>
import { computed } from 'vue'
import { formatRupiah } from '../services/format'

const props = defineProps({ property: { type: Object, required: true } })
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
      <p class="location">
        <svg class="icon" viewBox="0 0 24 24"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
        {{ property.city }} · {{ property.property_type }}
      </p>
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
  display: block; background: var(--surface); border: 1px solid var(--line);
  border-radius: var(--radius); overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}
.card:hover {
  transform: translateY(-3px);
  border-color: var(--primary);
  box-shadow: 0 12px 32px rgba(108,92,231,0.25);
}
.cover { position: relative; aspect-ratio: 4/3; background: var(--surface-alt); }
.cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
.cover-fallback {
  width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
  color: var(--text-muted); font-size: 12px;
}
.badge { position: absolute; top: 10px; left: 10px; }
.id-stamp { position: absolute; bottom: 10px; right: 10px; }
.body { padding: 16px; }
.title { font-size: 17px; line-height: 1.3; margin-bottom: 6px; color: var(--text); }
.location {
  font-size: 13px; color: var(--text-muted); margin: 0 0 10px;
  display: flex; align-items: center; gap: 5px;
}
.location .icon { width: 14px; height: 14px; }
.price { font-size: 17px; font-weight: 600; color: var(--accent); margin: 0 0 10px; }
.specs {
  display: flex; flex-wrap: wrap; gap: 10px; font-size: 11px; color: var(--text-muted);
  border-top: 1px solid var(--line); padding-top: 10px;
}
</style>
