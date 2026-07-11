<script setup>
import { ref, computed } from 'vue'
import { formatRupiahFull } from '../services/format'

const harga = ref(1000000000)
const dpPercent = ref(20)
const tenorTahun = ref(15)
const bungaPercent = ref(8.5)

const uangMuka = computed(() => harga.value * (dpPercent.value / 100))
const pokokPinjaman = computed(() => harga.value - uangMuka.value)

const angsuranBulanan = computed(() => {
  const pokok = pokokPinjaman.value
  const n = tenorTahun.value * 12
  const r = bungaPercent.value / 100 / 12
  if (n <= 0) return 0
  if (r === 0) return pokok / n
  const factor = Math.pow(1 + r, n)
  return (pokok * r * factor) / (factor - 1)
})

const totalPembayaran = computed(() => angsuranBulanan.value * tenorTahun.value * 12)
const totalBunga = computed(() => totalPembayaran.value - pokokPinjaman.value)

function onHargaInput(e) {
  const val = Number(e.target.value.replace(/[^0-9]/g, ''))
  harga.value = isNaN(val) ? 0 : val
}
</script>

<template>
  <div class="calculator">
    <div class="calc-inputs">
      <div class="field">
        <label>Harga Properti</label>
        <div class="input-prefix">
          <span class="prefix mono">Rp</span>
          <input
            type="text"
            inputmode="numeric"
            :value="harga.toLocaleString('id-ID')"
            @input="onHargaInput"
          />
        </div>
      </div>

      <div class="field">
        <label>Uang Muka (DP): <span class="mono">{{ dpPercent }}%</span></label>
        <input type="range" min="10" max="50" step="5" v-model.number="dpPercent" />
      </div>

      <div class="field">
        <label>Tenor Pinjaman</label>
        <select v-model.number="tenorTahun">
          <option :value="5">5 Tahun</option>
          <option :value="10">10 Tahun</option>
          <option :value="15">15 Tahun</option>
          <option :value="20">20 Tahun</option>
          <option :value="25">25 Tahun</option>
          <option :value="30">30 Tahun</option>
        </select>
      </div>

      <div class="field">
        <label>Suku Bunga per Tahun: <span class="mono">{{ bungaPercent }}%</span></label>
        <input type="range" min="3" max="15" step="0.1" v-model.number="bungaPercent" />
      </div>
    </div>

    <div class="calc-result">
      <div class="result-main">
        <span class="result-label mono">Estimasi Angsuran / Bulan</span>
        <span class="result-value mono">{{ formatRupiahFull(angsuranBulanan) }}</span>
      </div>
      <div class="result-grid mono">
        <div>
          <span class="rg-label">Uang Muka</span>
          <span class="rg-value">{{ formatRupiahFull(uangMuka) }}</span>
        </div>
        <div>
          <span class="rg-label">Pokok Pinjaman</span>
          <span class="rg-value">{{ formatRupiahFull(pokokPinjaman) }}</span>
        </div>
        <div>
          <span class="rg-label">Total Bunga</span>
          <span class="rg-value">{{ formatRupiahFull(totalBunga) }}</span>
        </div>
        <div>
          <span class="rg-label">Total Pembayaran</span>
          <span class="rg-value">{{ formatRupiahFull(totalPembayaran) }}</span>
        </div>
      </div>
      <p class="disclaimer">
        *Estimasi kasar, bukan penawaran resmi bank. Suku bunga dan syarat KPR aktual dapat berbeda tiap bank.
      </p>
    </div>
  </div>
</template>

<style scoped>
.calculator {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 32px;
}

.calc-inputs { display: flex; flex-direction: column; gap: 20px; }
.field { display: flex; flex-direction: column; gap: 8px; }
.field label { font-size: 13px; color: var(--text-muted); font-weight: 600; }

.input-prefix {
  display: flex; align-items: center; gap: 8px;
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 10px 14px;
}
.input-prefix .prefix { color: var(--text-muted); font-size: 14px; }
.input-prefix input {
  border: none; background: none; outline: none;
  color: var(--text); font-size: 15px; width: 100%;
  font-family: var(--font-mono);
}

select {
  font-family: var(--font-body); font-size: 14px;
  padding: 10px 12px; border: 1px solid var(--line); border-radius: var(--radius);
  background: var(--surface-alt); color: var(--text);
}

input[type="range"] {
  -webkit-appearance: none; width: 100%; height: 4px;
  background: var(--line); border-radius: 2px; outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
  background: var(--primary-light); cursor: pointer;
  box-shadow: 0 0 0 4px rgba(108,92,231,0.2);
}
input[type="range"]::-moz-range-thumb {
  width: 16px; height: 16px; border-radius: 50%; border: none;
  background: var(--primary-light); cursor: pointer;
}

.calc-result {
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 24px;
  display: flex; flex-direction: column; gap: 20px;
}
.result-main { display: flex; flex-direction: column; gap: 4px; }
.result-label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
.result-value { font-size: 28px; font-weight: 700; color: var(--accent); }

.result-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
  padding-top: 16px; border-top: 1px solid var(--line);
}
.result-grid div { display: flex; flex-direction: column; gap: 4px; }
.rg-label { font-size: 11px; color: var(--text-muted); }
.rg-value { font-size: 14px; font-weight: 600; color: var(--text); }

.disclaimer { font-size: 11px; color: var(--text-muted); margin: 0; line-height: 1.5; }

@media (max-width: 800px) {
  .calculator { grid-template-columns: 1fr; }
}
</style>
