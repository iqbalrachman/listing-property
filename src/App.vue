<script setup>
import { ref, onMounted, provide } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import BackToTop from './components/BackToTop.vue'
import { fetchSettings } from './services/api'

const settings = ref(null)
provide('settings', settings)

onMounted(async () => {
  try {
    settings.value = await fetchSettings()
  } catch (err) {
    console.error('Gagal memuat settings:', err.message)
    settings.value = { site_name: 'Property Listing', whatsapp: '' }
  }
})
</script>

<template>
  <Navbar :settings="settings" />
  <main style="flex: 1;">
    <router-view />
  </main>
  <Footer :settings="settings" />
  <BackToTop />
</template>
