import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Listings from '../views/Listings.vue'
import PropertyDetail from '../views/PropertyDetail.vue'

// createWebHashHistory dipakai supaya kompatibel di GitHub Pages
// tanpa perlu konfigurasi server-side rewrite (URL akan pakai #/)
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/listing', name: 'listings', component: Listings },
    { path: '/properti/:id', name: 'property-detail', component: PropertyDetail, props: true }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
