<script setup>
defineProps({ settings: Object })
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-about">
        <div class="footer-brand">{{ settings?.site_name || 'Property Listing' }}</div>
        <p class="footer-note">{{ settings?.footer || 'Katalog properti untuk calon pembeli.' }}</p>
      </div>

      <div class="footer-contact-list">
        <a v-if="settings?.phone" class="contact-item" :href="`tel:${settings.phone.replace(/[^0-9+]/g, '')}`">
          <svg class="icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          {{ settings.phone }}
        </a>
        <a v-if="settings?.email" class="contact-item" :href="`mailto:${settings.email}`">
          <svg class="icon" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>
          {{ settings.email }}
        </a>
      </div>

      <a v-if="settings?.whatsapp" class="btn btn-accent" :href="`https://wa.me/${settings.whatsapp}`" target="_blank" rel="noopener">
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
.footer-about { flex: 1 1 260px; }
.footer-brand { font-family: var(--font-display); font-size: 18px; margin-bottom: 6px; color: var(--text); }
.footer-note { color: var(--text-muted); font-size: 14px; margin: 0; max-width: 380px; }
.footer-contact-list { display: flex; flex-direction: column; gap: 8px; }
.contact-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; color: var(--text-muted);
}
.contact-item:hover { color: var(--accent); }
.contact-item .icon { width: 15px; height: 15px; flex-shrink: 0; }
.footer-bottom { border-top: 1px solid var(--line); padding: 16px 24px; font-size: 11px; color: var(--text-muted); }
</style>
