<template>
  <div class="w-1/3">
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <Icon icon="radix-icons:magnifying-glass" class="h-4 w-4 text-white/60" />
      </div>
      <Input type="text" v-model="searchQuery" @input="handleSearch" placeholder="Search by currency name..."
        class="pl-7 bg-white/10 border-white/20 text-white placeholder:text-white/60 text-sm h-8" />
      <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-2 flex items-center">
        <Button variant="ghost" size="sm" @click="clearSearch"
          class="h-auto p-1 text-white/60 hover:text-white hover:bg-white/10">
          <Icon icon="radix-icons:cross-2" class="h-3 w-3" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFiltersStore } from '../store/filters'
import { useMarketStore } from '../store/market'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@iconify/vue'

const filtersStore = useFiltersStore()
const marketStore = useMarketStore()
const searchQuery = ref('')

function handleSearch() {
  filtersStore.setSearch(searchQuery.value)
  marketStore.applyFiltersAndSort()
}

function clearSearch() {
  searchQuery.value = ''
  filtersStore.setSearch('')
  marketStore.applyFiltersAndSort()
}

watch(() => filtersStore.getSearch, (newValue) => {
  if (newValue !== searchQuery.value) {
    searchQuery.value = newValue
  }
})
</script>
