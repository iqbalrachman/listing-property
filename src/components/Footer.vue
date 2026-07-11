<script setup>
import { computed } from 'vue'

const props = defineProps({ settings: Object })
const year = new Date().getFullYear()

const socials = computed(() => [
  { key: 'instagram', url: props.settings?.instagram, path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm5.2-1.7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' },
  { key: 'facebook', url: props.settings?.facebook, path: 'M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.7c0-.5.3-.7.8-.7z' },
  { key: 'tiktok', url: props.settings?.tiktok, path: 'M14 3v10.5a2.5 2.5 0 1 1-2-2.45V9a4.5 4.5 0 1 0 4 4.47V8.2a6 6 0 0 0 3.5 1.3V7.4A4 4 0 0 1 16 3h-2z' },
  { key: 'linkedin', url: props.settings?.linkedin, path: 'M4.5 3.5A1.5 1.5 0 1 0 4.5 6.5 1.5 1.5 0 0 0 4.5 3.5zM3 8h3v13H3zM9 8h3v1.8c.5-.9 1.7-1.8 3.3-1.8 3 0 4.7 2 4.7 5.7V21h-3v-6.4c0-1.7-.6-2.9-2.2-2.9-1.2 0-1.9.8-2.2 1.6-.1.3-.1.6-.1 1V21H9z' },
  { key: 'twitter', url: props.settings?.twitter, path: 'M3 3l7.5 9.5L3.3 21H6l5.8-6.8L16.5 21H21l-8-9.9L20.4 3H18l-5.3 6.3L8 3H3z' }
])

const activeSocials = computed(() => socials.value.filter(s => s.url))
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-about">
        <div class="footer-brand">{{ settings?.site_name || 'Property Listing' }}</div>
        <p class="footer-note">{{ settings?.footer || 'Katalog properti untuk calon pembeli.' }}</p>
        <div class="social-row" v-if="activeSocials.length">
          <a v-for="s in activeSocials" :key="s.key" :href="s.url" target="_blank" rel="noopener" class="social-icon" :aria-label="s.key">
            <svg class="icon" viewBox="0 0 24 24"><path :d="s.path" /></svg>
          </a>
        </div>
      </div>

      <div class="footer-contact-list">
        <a v-if="settings?.phone" class="contact-item" :href="`tel:${settings.phone.replace(/[^0-9+]/g, '')}`">
          <svg class="icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
          {{ settings.phone }}
        </a>
        <a v-if="settings?.email" class="contact-item" :href="`mailto:${settings.email}`">
          <svg class="icon" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" /><path d="m22 6-10 7L2 6" /></svg>
          {{ settings.email }}
        </a>
      </div>

      <a v-if="settings?.whatsapp" class="btn btn-accent" :href="`https://wa.me/${settings.whatsapp}`" target="_blank" rel="noopener">
        <svg class="icon" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
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
.footer-note { color: var(--text-muted); font-size: 14px; margin: 0 0 14px; max-width: 380px; }

.social-row { display: flex; gap: 10px; }
.social-icon {
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--surface-alt); border: 1px solid var(--line);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-muted);
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.social-icon .icon { width: 16px; height: 16px; }
.social-icon:hover { background: var(--primary); color: #fff; border-color: var(--primary); }

.footer-contact-list { display: flex; flex-direction: column; gap: 8px; }
.contact-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-muted); }
.contact-item:hover { color: var(--accent); }
.contact-item .icon { width: 15px; height: 15px; flex-shrink: 0; }
.footer-bottom { border-top: 1px solid var(--line); padding: 16px 24px; font-size: 11px; color: var(--text-muted); }
</style>
