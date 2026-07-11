<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  coverUrl: { type: String, default: '' },
  gallery: { type: Array, default: () => [] },
  title: { type: String, default: '' }
})

const images = computed(() => {
  const list = []
  if (props.coverUrl) list.push({ name: 'cover', url: props.coverUrl })
  props.gallery.forEach(img => list.push(img))
  return list
})

const activeIndex = ref(0)
const touchStartX = ref(0)

function goTo(index) {
  if (index < 0) index = images.value.length - 1
  if (index >= images.value.length) index = 0
  activeIndex.value = index
}
function next() { goTo(activeIndex.value + 1) }
function prev() { goTo(activeIndex.value - 1) }

function onTouchStart(e) { touchStartX.value = e.touches[0].clientX }
function onTouchEnd(e) {
  const diff = e.changedTouches[0].clientX - touchStartX.value
  if (Math.abs(diff) < 40) return
  diff > 0 ? prev() : next()
}
function onKeydown(e) {
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}
</script>

<template>
  <div class="gallery" tabindex="0" @keydown="onKeydown">
    <div
      class="main-frame"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <img
        v-if="images.length"
        :src="images[activeIndex].url"
        :alt="title"
      />
      <div v-else class="fallback mono">Foto belum tersedia</div>

      <button
        v-if="images.length > 1"
        class="nav-btn prev"
        @click="prev"
        aria-label="Foto sebelumnya"
      >
        <svg class="icon" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        v-if="images.length > 1"
        class="nav-btn next"
        @click="next"
        aria-label="Foto berikutnya"
      >
        <svg class="icon" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      <div class="counter mono" v-if="images.length > 1">
        {{ activeIndex + 1 }} / {{ images.length }}
      </div>
    </div>

    <div class="dots" v-if="images.length > 1">
      <button
        v-for="(img, i) in images"
        :key="img.url"
        class="dot"
        :class="{ active: i === activeIndex }"
        @click="goTo(i)"
        :aria-label="`Foto ke-${i + 1}`"
      ></button>
    </div>

    <div class="thumbs" v-if="images.length > 1">
      <button
        v-for="(img, i) in images"
        :key="img.url + '-thumb'"
        class="thumb"
        :class="{ active: i === activeIndex }"
        @click="goTo(i)"
      >
        <img :src="img.url" :alt="img.name" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.gallery { outline: none; }

.main-frame {
  position: relative;
  aspect-ratio: 4 / 3;
  background: var(--surface-alt);
  border-radius: var(--radius);
  overflow: hidden;
  touch-action: pan-y;
}
.main-frame img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  user-select: none; -webkit-user-drag: none;
}
.fallback {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-muted); font-size: 13px;
}

.nav-btn {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(11,15,25,0.55);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s ease;
}
.nav-btn:hover { background: rgba(108,92,231,0.75); }
.nav-btn.prev { left: 10px; }
.nav-btn.next { right: 10px; }
.nav-btn .icon { width: 20px; height: 20px; }

.counter {
  position: absolute; bottom: 10px; right: 10px;
  background: rgba(11,15,25,0.6);
  backdrop-filter: blur(4px);
  color: #fff; font-size: 11px;
  padding: 3px 8px; border-radius: 6px;
}

.dots {
  display: flex; justify-content: center; gap: 6px;
  margin-top: 12px;
}
.dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--line); border: none; padding: 0; cursor: pointer;
  transition: background 0.15s ease, width 0.15s ease;
}
.dot.active { background: var(--accent); width: 18px; border-radius: 3px; }

.thumbs {
  display: flex; gap: 8px; margin-top: 10px; overflow-x: auto;
}
.thumb {
  border: 1px solid var(--line); background: none; padding: 0;
  width: 60px; height: 60px; border-radius: 6px; overflow: hidden;
  flex-shrink: 0; cursor: pointer; opacity: 0.6;
  transition: opacity 0.15s ease, border-color 0.15s ease;
}
.thumb.active { opacity: 1; border-color: var(--primary-light); }
.thumb img { width: 100%; height: 100%; object-fit: cover; }

@media (max-width: 640px) {
  .thumbs { display: none; } /* di mobile cukup swipe + dots, thumbnail strip bikin sempit */
}
</style>
