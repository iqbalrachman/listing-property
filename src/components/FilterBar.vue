<script setup>
import { computed } from 'vue'
import { PRICE_RANGES } from '../services/format'

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
  emit('update:modelValue', { type: '', city: '', priceRange: '' })
}
</script>

<template>
  <div class="filter-bar">
    <select :value="modelValue.type" @change="update('type', $event.target.value)">
      <option value="">Semua Tipe</option>
      <option v-for="t in propertyTypes" :key="t" :value="t">{{ t }}</option>
    </select>

    <select :value="modelValue.city" @change="update('city', $event.target.value)">
      <option value="">Semua Lokasi</option>
      <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
    </select>

    <select :value="modelValue.priceRange" @change="update('priceRange', $event.target.value)">
      <option value="">Semua Harga</option>
      <option v-for="r in PRICE_RANGES" :key="r.key" :value="r.key">{{ r.label }}</option>
    </select>

    <button
      v-if="modelValue.type || modelValue.city || modelValue.priceRange"
      class="btn btn-outline reset"
      @click="resetFilters"
    >
      Reset
    </button>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px;
  background: var(--paper-raised);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}
select {
  font-family: var(--font-body);
  font-size: 14px;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fff;
  color: var(--ink);
  min-width: 160px;
}
.reset {
  padding: 10px 16px;
  font-size: 13px;
}
@media (max-width: 640px) {
  select { min-width: 0; flex: 1 1 45%; }
}
</style>
