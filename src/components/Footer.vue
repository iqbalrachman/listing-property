<script setup>
defineProps({
  settings: Object
})

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <div class="footer-brand">{{ settings?.site_name || 'Property Listing' }}</div>
        <p class="footer-note">{{ settings?.footer || 'Katalog properti untuk calon pembeli.' }}</p>
      </div>
      <div class="footer-contact" v-if="settings?.whatsapp">
        <a
          class="btn btn-brass"
          :href="`https://wa.me/${settings.whatsapp}`"
          target="_blank"
          rel="noopener"
        >
          Hubungi via WhatsApp
        </a>
      </div>
    </div>
    <div class="container footer-bottom mono">
      © {{ year }} {{ settings?.site_name || 'Property Listing' }}
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--ink);
  color: var(--paper);
  margin-top: 64px;
}
.footer-inner {
  padding: 40px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}
.footer-brand {
  font-family: var(--font-display);
  font-size: 18px;
  margin-bottom: 6px;
}
.footer-note {
  color: #aab0c0;
  font-size: 14px;
  margin: 0;
  max-width: 420px;
}
.footer-bottom {
  border-top: 1px solid #2a3760;
  padding: 16px 24px;
  font-size: 11px;
  color: #7c84a0;
}
</style>
