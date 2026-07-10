<script setup>
import { computed } from 'vue'

const props = defineProps({
  properties: { type: Array, default: () => [] },
  modelValue: { type: Object, required: true }
})
const emit = defineEmits(['update:modelValue'])

const propertyTypes = computed(() => {
  const set = new Set(props.properties.map(p => p.property_type).filter(Boolean))
  return Array.from(set).sort()
})
const cities = computed(() => {
  const set = new Set(props.properties.map(p => p.city).filter(Boolean))
  return Array.from(set).sort()
})

function update(field, value) {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
function resetFilters() {
  emit('update:modelValue', { type: '', city: '', priceMin: '', priceMax: '', keyword: '', sort: 'newest' })
}
const hasActiveFilter = computed(() =>
  props.modelValue.type || props.modelValue.city || props.modelValue.priceMin ||
  props.modelValue.priceMax || props.modelValue.keyword
)
</script>

<template>
  <div class="filter-bar">
    <div class="search-row">
      <svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input
        type="text"
        placeholder="Cari judul atau kota..."
        :value="modelValue.keyword"
        @input="update('keyword', $event.target.value)"
      />
    </div>

    <div class="filter-grid">
      <select :value="modelValue.type" @change="update('type', $event.target.value)">
        <option value="">Semua Tipe</option>
        <option v-for="t in propertyTypes" :key="t" :value="t">{{ t }}</option>
      </select>

      <select :value="modelValue.city" @change="update('city', $event.target.value)">
        <option value="">Semua Kota</option>
        <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
      </select>

      <input
        type="number"
        placeholder="Harga Minimum"
        class="mono"
        :value="modelValue.priceMin"
        @input="update('priceMin', $event.target.value)"
      />
      <input
        type="number"
        placeholder="Harga Maksimum"
        class="mono"
        :value="modelValue.priceMax"
        @input="update('priceMax', $event.target.value)"
      />

      <select :value="modelValue.sort" @change="update('sort', $event.target.value)">
        <option value="newest">Terbaru</option>
        <option value="oldest">Terlama</option>
        <option value="price_asc">Harga Terendah</option>
        <option value="price_desc">Harga Tertinggi</option>
      </select>

      <button v-if="hasActiveFilter" class="btn btn-outline" @click="resetFilters">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 16px;
}
.search-row {
  display: flex; align-items: center; gap: 10px;
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 10px 14px;
  margin-bottom: 14px;
}
.search-row .icon { color: var(--text-muted); flex-shrink: 0; }
.search-row input {
  border: none; background: none; outline: none;
  color: var(--text); font-size: 14px; width: 100%;
}
.filter-grid { display: flex; flex-wrap: wrap; gap: 10px; }
select, input[type="number"] {
  font-family: var(--font-body); font-size: 14px;
  padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius);
  background: var(--surface-alt); color: var(--text); min-width: 150px;
}
select:focus, input:focus { outline: none; border-color: var(--primary-light); }
@media (max-width: 640px) {
  select, input[type="number"] { min-width: 0; flex: 1 1 45%; }
}
</style>
