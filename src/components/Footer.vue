<script setup>
defineProps({ settings: Object })
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <div class="footer-brand">{{ settings?.site_name || 'Property Listing' }}</div>
        <p class="footer-note">{{ settings?.footer || 'Katalog properti untuk calon pembeli.' }}</p>
      </div>
      
        v-if="settings?.whatsapp"
        class="btn btn-accent"
        :href="`https://wa.me/${settings.whatsapp}`"
        target="_blank" rel="noopener"
      >
        <svg class="icon" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Hubungi via WhatsApp
      </a>
    </div>
    <div class="container footer-bottom mono">© {{ year }} {{ settings?.site_name || 'Property Listing' }}</div>
  </footer>
</template>

<style scoped>
.footer { background: var(--surface); border-top: 1px solid var(--line); margin-top: 64px; }
.footer-inner {
  padding: 40px 24px; display: flex; justify-content: space-between;
  align-items: center; gap: 24px; flex-wrap: wrap;
}
.footer-brand { font-family: var(--font-display); font-size: 18px; margin-bottom: 6px; color: var(--text); }
.footer-note { color: var(--text-muted); font-size: 14px; margin: 0; max-width: 420px; }
.footer-bottom { border-top: 1px solid var(--line); padding: 16px 24px; font-size: 11px; color: var(--text-muted); }
</style>
