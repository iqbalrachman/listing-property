<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPropertyById } from '../services/api'
import { formatRupiah } from '../services/format'

const route = useRoute()
const settings = inject('settings')
const property = ref(null)
const loading = ref(true)
const error = ref('')
const activeImage = ref('')

const isSold = computed(() => property.value?.status === 'Sold')

const youtubeEmbed = computed(() => {
  const url = property.value?.youtube
  if (!url) return ''
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : ''
})

const waLink = computed(() => {
  if (!settings?.value?.whatsapp || !property.value) return ''
  const msg = `Halo, saya tertarik dengan properti "${property.value.title}" (${property.value.id}). Apakah masih tersedia?`
  return `https://wa.me/${settings.value.whatsapp}?text=${encodeURIComponent(msg)}`
})

onMounted(async () => {
  try {
    property.value = await fetchPropertyById(route.params.id)
    if (!property.value) {
      error.value = 'Properti tidak ditemukan.'
    } else {
      activeImage.value = property.value.cover_url || ''
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="container detail">
    <p v-if="loading" class="status mono">Memuat data...</p>
    <p v-else-if="error" class="status mono error">{{ error }}</p>

    <template v-else-if="property">
      <router-link to="/listing" class="back mono">← Kembali ke listing</router-link>

      <div class="layout">
        <div class="gallery">
          <div class="main-image">
            <img v-if="activeImage" :src="activeImage" :alt="property.title" />
            <div v-else class="cover-fallback mono">Foto belum tersedia</div>
            <span class="badge" :class="isSold ? 'badge-terjual' : 'badge-available'">
              {{ isSold ? 'Terjual' : 'Tersedia' }}
            </span>
          </div>
          <div class="thumbs" v-if="property.gallery?.length">
            <button v-for="img in property.gallery" :key="img.url" class="thumb" @click="activeImage = img.url">
              <img :src="img.url" :alt="img.name" />
            </button>
          </div>
        </div>

        <div class="info">
          <span class="stamp">{{ property.id }}</span>
          <h1>{{ property.title }}</h1>
          <p class="location">
            <svg class="icon" viewBox="0 0 24 24"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
            {{ property.city }} · {{ property.property_type }}
          </p>
          <p class="price mono">{{ formatRupiah(property.price) }}</p>

          <div class="specs mono">
            <div v-if="property.land_area"><span>Luas Tanah</span>{{ property.land_area }} m²</div>
            <div v-if="property.building_area"><span>Luas Bangunan</span>{{ property.building_area }} m²</div>
            <div v-if="property.bedroom"><span>Kamar Tidur</span>{{ property.bedroom }}</div>
            <div v-if="property.bathroom"><span>Kamar Mandi</span>{{ property.bathroom }}</div>
            <div v-if="property.certificate"><span>Sertifikat</span>{{ property.certificate }}</div>
          </div>

          <a v-if="waLink" :href="waLink" target="_blank" rel="noopener" class="btn btn-accent wa-btn">
            Tanya via WhatsApp
          </a>
          <a v-if="property.maps" :href="property.maps" target="_blank" rel="noopener" class="btn btn-outline">
            Lihat Lokasi di Maps
          </a>
        </div>
      </div>

      <div class="description" v-if="property.description">
        <h2>Deskripsi</h2>
        <p>{{ property.description }}</p>
      </div>

      <div class="video" v-if="youtubeEmbed">
        <h2>Video</h2>
        <div class="video-frame">
          <iframe :src="youtubeEmbed" title="Video properti" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
.detail { padding: 32px 24px 64px; }
.back { display: inline-block; margin-bottom: 20px; font-size: 13px; color: var(--text-muted); }
.status { color: var(--text-muted); font-size: 13px; }
.status.error { color: var(--terjual); }
.layout { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; }
.main-image { position: relative; aspect-ratio: 4/3; background: var(--surface-alt); border-radius: var(--radius); overflow: hidden; }
.main-image img { width: 100%; height: 100%; object-fit: cover; }
.cover-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 13px; }
.main-image .badge { position: absolute; top: 12px; left: 12px; }
.thumbs { display: flex; gap: 8px; margin-top: 10px; overflow-x: auto; }
.thumb { border: 1px solid var(--line); background: none; padding: 0; width: 64px; height: 64px; border-radius: 6px; overflow: hidden; flex-shrink: 0; cursor: pointer; }
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.info h1 { font-size: 28px; margin: 10px 0 4px; line-height: 1.2; color: var(--text); }
.location { color: var(--text-muted); margin: 0 0 12px; display: flex; align-items: center; gap: 6px; }
.location .icon { width: 15px; height: 15px; }
.price { font-size: 26px; font-weight: 700; color: var(--accent); margin: 0 0 20px; }
.specs { display: flex; flex-direction: column; gap: 8px; font-size: 13px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 14px 0; margin-bottom: 20px; }
.specs div { display: flex; justify-content: space-between; }
.specs span { color: var(--text-muted); }
.wa-btn { width: 100%; justify-content: center; margin-bottom: 10px; }
.info .btn-outline { width: 100%; justify-content: center; }
.description, .video { margin-top: 40px; max-width: 720px; }
.description h2, .video h2 { font-size: 20px; margin-bottom: 12px; }
.description p { line-height: 1.7; color: var(--text-muted); white-space: pre-line; }
.video-frame { position: relative; aspect-ratio: 16/9; border-radius: var(--radius); overflow: hidden; }
.video-frame iframe { width: 100%; height: 100%; border: 0; }
@media (max-width: 800px) { .layout { grid-template-columns: 1fr; } }
</style>
