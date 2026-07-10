<script setup>
defineProps({
  settings: Object
})
</script>

<template>
  <header class="navbar">
    <div class="container navbar-inner">
      <router-link to="/" class="brand">
        <span class="brand-mark">/</span>
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
  background: var(--paper-raised);
  border-bottom: 1px solid var(--line);
  position: sticky;
  top: 0;
  z-index: 20;
}
.navbar-inner {
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}
.brand-mark {
  color: var(--brass);
  font-family: var(--font-mono);
}
.nav-links {
  display: flex;
  gap: 28px;
  font-size: 14px;
  font-weight: 600;
}
.nav-links a {
  color: var(--text-muted);
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
}
.nav-links a.active {
  color: var(--ink);
  border-bottom-color: var(--brass);
}
@media (max-width: 640px) {
  .nav-links { gap: 16px; font-size: 13px; }
}
</style>
