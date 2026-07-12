<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Edit di sini kalau mau ganti/tambah banner.
// link boleh dikosongkan '' kalau banner tidak perlu diklik ke mana-mana.
const banners = [
  { image: `${import.meta.env.BASE_URL}banners/banner1.jpg`, link: '/listing' },
  { image: `${import.meta.env.BASE_URL}banners/banner2.jpg`, link: '' },
  { image: `${import.meta.env.BASE_URL}banners/banner3.jpg`, link: '' }
]

const activeIndex = ref(0)
const touchStartX = ref(0)
let timer = null

function goTo(i) {
  if (i < 0) i = banners.length - 1
  if (i >= banners.length) i = 0
  activeIndex.value = i
}
function next() { goTo(activeIndex.value + 1) }

function startAutoplay() {
  stopAutoplay()
  timer = setInterval(next, 4500)
}
function stopAutoplay() {
  if (timer) clearInterval(timer)
}

function onTouchStart(e) { touchStartX.value = e.touches[0].clientX }
function onTouchEnd(e) {
  const diff = e.changedTouches[0].clientX - touchStartX.value
  if (Math.abs(diff) < 40) return
  diff > 0 ? goTo(activeIndex.value - 1) : next()
}

onMounted(startAutoplay)
onUnmounted(stopAutoplay)
</script>

<template>
  <div
    v-if="banners.length"
    class="banner-slider"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div class="slide-track" :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
      <component
        :is="b.link ? 'router-link' : 'div'"
        v-for="(b, i) in banners"
        :key="i"
        :to="b.link || undefined"
        class="slide"
      >
        <img :src="b.image" :alt="`Banner ${i + 1}`" loading="lazy" />
      </component>
    </div>

    <div class="dots" v-if="banners.length > 1">
      <button
        v-for="(b, i) in banners" :key="i"
        class="dot" :class="{ active: i === activeIndex }"
        @click="goTo(i)"
        :aria-label="`Banner ke-${i + 1}`"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.banner-slider {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  border: 1px solid var(--line);
  aspect-ratio: 16 / 5;
  background: var(--surface-alt);
}
.slide-track {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
}
.slide {
  flex: 0 0 100%;
  height: 100%;
  display: block;
}
.slide img {
  width: 100%; height: 100%; object-fit: cover; display: block;
}

.dots {
  position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 6px;
}
.dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: rgba(255,255,255,0.5); border: none; padding: 0; cursor: pointer;
  transition: background 0.15s ease, width 0.15s ease;
}
.dot.active { background: var(--accent); width: 20px; border-radius: 4px; }

@media (max-width: 640px) {
  .banner-slider { aspect-ratio: 16 / 9; }
}
</style>
