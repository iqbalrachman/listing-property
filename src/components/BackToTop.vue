<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

function onScroll() { visible.value = window.scrollY > 480 }
function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <button v-if="visible" class="back-to-top" @click="scrollTop" aria-label="Kembali ke atas">
    <svg class="icon" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
  </button>
</template>

<style scoped>
.back-to-top {
  position: fixed; bottom: 24px; right: 24px; z-index: 50;
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--primary); color: #fff; border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(108,92,231,0.4);
  transition: background 0.15s ease, transform 0.15s ease;
}
.back-to-top:hover { background: var(--primary-light); transform: translateY(-2px); }
</style>
