<template>
  <div class="flex justify-start items-end gap-2">

    <div>
      <label class="block text-xs font-light text-white/80 mb-1">Price</label>
      <div class="grid grid-cols-2 gap-1">
        <Input v-model="priceRange.min" type="number" placeholder="Min" @input="handlePriceRangeChange"
          class="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-xs h-7" />
        <Input v-model="priceRange.max" type="number" placeholder="Max" @input="handlePriceRangeChange"
          class="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-xs h-7" />
      </div>
    </div>

    <div>
      <label class="block text-xs font-light text-white/80 mb-1">Volume</label>
      <div class="grid grid-cols-2 gap-1">
        <Input v-model="volumeRange.min" type="number" placeholder="Min" @input="handleVolumeRangeChange"
          class="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-xs h-7" />
        <Input v-model="volumeRange.max" type="number" placeholder="Max" @input="handleVolumeRangeChange"
          class="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-xs h-7" />
      </div>
    </div>

    <div>
      <label class="block text-xs font-light text-white/80 mb-1">Change</label>
      <div class="grid grid-cols-2 gap-1">
        <Input v-model="changeRange.min" type="number" placeholder="Min" @input="handleChangeRangeChange"
          class="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-xs h-7" />
        <Input v-model="changeRange.max" type="number" placeholder="Max" @input="handleChangeRangeChange"
          class="bg-white/10 border-white/20 text-white placeholder:text-white/60 text-xs h-7" />
      </div>
    </div>

    <div class="mt-2 flex justify-end">
      <Button @click="resetFilters" variant="ghost" size="sm"
        class="h-6 w-6 p-0 text-white/60 hover:text-white hover:bg-white/10">
        <Icon icon="radix-icons:cross-2" class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useFiltersStore } from '../store/filters'
import { useMarketStore } from '../store/market'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@iconify/vue'

const filtersStore = useFiltersStore()
const marketStore = useMarketStore()

const priceRange = ref<{ min: number; max: number }>({ min: 0, max: 0 })
const volumeRange = ref<{ min: number; max: number }>({ min: 0, max: 0 })
const changeRange = ref<{ min: number; max: number }>({ min: -100, max: 100 })

function handlePriceRangeChange() {
  filtersStore.setPriceRange(priceRange.value.min, priceRange.value.max)
  marketStore.applyFiltersAndSort()
}

function handleVolumeRangeChange() {
  filtersStore.setVolumeRange(volumeRange.value.min, volumeRange.value.max)
  marketStore.applyFiltersAndSort()
}

function handleChangeRangeChange() {
  filtersStore.setChangeRange(changeRange.value.min, changeRange.value.max)
  marketStore.applyFiltersAndSort()
}

function resetFilters() {
  priceRange.value = { min: 0, max: 0 }
  volumeRange.value = { min: 0, max: 0 }
  changeRange.value = { min: -100, max: 100 }
  filtersStore.resetFilters()
  marketStore.applyFiltersAndSort()
}

watch(() => filtersStore.getPriceRange, (newValue) => {
  if (newValue !== priceRange.value) {
    priceRange.value = { ...newValue }
  }
})

watch(() => filtersStore.getVolumeRange, (newValue) => {
  if (newValue !== volumeRange.value) {
    volumeRange.value = { ...newValue }
  }
})

watch(() => filtersStore.getChangeRange, (newValue) => {
  if (newValue !== changeRange.value) {
    changeRange.value = { ...newValue }
  }
})

onMounted(() => {
  priceRange.value = { ...filtersStore.getPriceRange }
  volumeRange.value = { ...filtersStore.getVolumeRange }
  changeRange.value = { ...filtersStore.getChangeRange }
})
</script>