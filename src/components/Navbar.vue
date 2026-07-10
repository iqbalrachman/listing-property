<script setup>
defineProps({ settings: Object })
</script>

<template>
  <header class="navbar">
    <div class="container navbar-inner">
      <router-link to="/" class="brand">
        <svg class="icon" viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>
        {{ settings?.site_name || 'Property Listing' }}
      </router-link>
      <nav class="nav-links">
        <router-link to="/" exact-active-class="active">Beranda</router-link>
        <router-link to="/listing" active-class="active">Semua Listing</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background: rgba(11,15,25,0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
  position: sticky; top: 0; z-index: 20;
}
.navbar-inner { height: 68px; display: flex; align-items: center; justify-content: space-between; }
.brand {
  font-family: var(--font-display); font-size: 19px; font-weight: 600;
  display: flex; align-items: center; gap: 8px; color: var(--text);
}
.brand .icon { color: var(--primary-light); width: 22px; height: 22px; }
.nav-links { display: flex; gap: 28px; font-size: 14px; font-weight: 600; }
.nav-links a { color: var(--text-muted); padding-bottom: 4px; border-bottom: 2px solid transparent; }
.nav-links a.active { color: var(--text); border-bottom-color: var(--accent); }
@media (max-width: 640px) { .nav-links { gap: 16px; font-size: 13px; } }
</style>
