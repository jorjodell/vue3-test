<template>
  <div class="container mx-auto font-light">
    <div class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/20">
      <div class=" mx-auto p-4">
        <div class="flex justify-between items-end gap-4">
          <Search />
          <Filter />
        </div>
      </div>
    </div>

    <div class="h-32"></div>

    <div class="px-5">
      <div class="mb-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div class="text-xs flex items-center">
            <Icon icon="radix-icons:info-circled" class="w-3 h-3 mr-2 text-white/60" />
            <span class="font-light text-white">Found:</span> {{ filteredMarketData.length }} of {{ marketData.length }}
            records
          </div>
          <div class="text-xs text-white/70 flex flex-wrap gap-2">
            <span v-if="filtersStore.getSearch" class="flex items-center">
              <Icon icon="radix-icons:magnifying-glass" class="w-2.5 h-2.5 mr-1" />
              Search: "{{ filtersStore.getSearch }}"
            </span>
            <span class="flex items-center">
              <Icon icon="radix-icons:carret-sort" class="w-2.5 h-2.5 mr-1" />
              Sort: {{ getSortFieldLabel(filtersStore.getSortField) }}
              <Icon v-if="filtersStore.getSortDirection === 'asc'" icon="radix-icons:arrow-up" class="ml-1 w-3 h-3" />
              <Icon v-else icon="radix-icons:arrow-down" class="ml-1 w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      <div v-if="loading" class="text-center py-10 text-sm text-white/70">
        <Icon icon="radix-icons:update" class="w-6 h-6 mx-auto mb-4 animate-spin" />
        Loading data...
      </div>

      <div v-if="error" class="mb-5 bg-red-500/20 backdrop-blur-md rounded-lg border border-red-500/30 p-4">
        <div class="flex items-center text-red-400">
          <Icon icon="radix-icons:exclamation-triangle" class="w-4 h-4 mr-2" />
          {{ error }}
        </div>
      </div>

      <div v-if="!loading && !error && marketStore.dataReady && filteredMarketData.length === 0"
        class="text-center py-10">
        <Icon icon="radix-icons:question-mark-circled" class="w-12 h-12 mx-auto mb-4 text-white/40" />
        <div class="text-white/70 text-sm mb-2">No results found</div>
        <div class="text-white/50 text-xs">Try changing search parameters or filters</div>
      </div>

      <div v-if="marketStore.isPolling" class="text-center py-4">
        <div class="inline-flex items-center text-xs text-white/60">
          <Icon icon="radix-icons:update" class="w-3 h-3 mr-2 animate-spin" />
          Auto-updating every {{ Math.round(marketStore.pollingIntervalMs / 1000) }} seconds
        </div>
      </div>

      <div v-if="filteredMarketData.length > 0 && marketStore.dataReady"
        class="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden mb-10">
        <div class="overflow-x-auto">
          <Table class="min-w-[900px]">
            <TableHeader>
              <TableRow class="bg-white/10 backdrop-blur-md">
                <TableHead
                  class="w-[200px] px-3 py-2 cursor-pointer hover:bg-white/5 transition-colors font-light text-xs"
                  @click="sortByField('name')">
                  <div class="flex items-center group">
                    <span class="group-hover:text-white transition-colors">Currency</span>
                    <Icon icon="radix-icons:caret-sort"
                      class="ml-2 w-3 h-3 text-white/60 group-hover:text-white/80 transition-colors" />
                    <Icon icon="radix-icons:arrow-up"
                      v-if="filtersStore.getSortField === 'name' && filtersStore.getSortDirection === 'asc'"
                      class="ml-1 w-3 h-3 text-white" />
                    <Icon icon="radix-icons:arrow-down"
                      v-else-if="filtersStore.getSortField === 'name' && filtersStore.getSortDirection === 'desc'"
                      class="ml-1 w-3 h-3 text-white" />
                  </div>
                </TableHead>
                <TableHead
                  class="text-right w-[120px] px-3 py-2 cursor-pointer hover:bg-white/5 transition-colors font-light text-xs"
                  @click="sortByField('price')">
                  <div class="flex items-center justify-end group">
                    <span class="group-hover:text-white transition-colors">Price</span>
                    <Icon icon="radix-icons:caret-sort"
                      class="ml-2 w-3 h-3 text-white/60 group-hover:text-white/80 transition-colors" />
                    <Icon icon="radix-icons:arrow-up"
                      v-if="filtersStore.getSortField === 'price' && filtersStore.getSortDirection === 'asc'"
                      class="ml-1 w-3 h-3 text-white" />
                    <Icon icon="radix-icons:arrow-down"
                      v-else-if="filtersStore.getSortField === 'price' && filtersStore.getSortDirection === 'desc'"
                      class="ml-1 w-3 h-3 text-white" />
                  </div>
                </TableHead>
                <TableHead
                  class="text-right w-[120px] px-3 py-2 cursor-pointer hover:bg-white/5 transition-colors font-light text-xs"
                  @click="sortByField('change')">
                  <div class="flex items-center justify-end group">
                    <span class="group-hover:text-white transition-colors">Change</span>
                    <Icon icon="radix-icons:caret-sort"
                      class="ml-2 w-3 h-3 text-white/60 group-hover:text-white/80 transition-colors" />
                    <Icon icon="radix-icons:arrow-up"
                      v-if="filtersStore.getSortField === 'change' && filtersStore.getSortDirection === 'asc'"
                      class="ml-1 w-3 h-3 text-white" />
                    <Icon icon="radix-icons:arrow-down"
                      v-else-if="filtersStore.getSortField === 'change' && filtersStore.getSortDirection === 'desc'"
                      class="ml-1 w-3 h-3 text-white" />
                  </div>
                </TableHead>
                <TableHead
                  class="text-right w-[120px] px-3 py-2 cursor-pointer hover:bg-white/5 transition-colors font-light text-xs"
                  @click="sortByField('volume')">
                  <div class="flex items-center justify-end group">
                    <span class="group-hover:text-white transition-colors">Volume</span>
                    <Icon icon="radix-icons:caret-sort"
                      class="ml-2 w-3 h-3 text-white/60 group-hover:text-white/80 transition-colors" />
                    <Icon icon="radix-icons:arrow-up"
                      v-if="filtersStore.getSortField === 'volume' && filtersStore.getSortDirection === 'asc'"
                      class="ml-1 w-3 h-3 text-white" />
                    <Icon icon="radix-icons:arrow-down"
                      v-else-if="filtersStore.getSortField === 'volume' && filtersStore.getSortDirection === 'desc'"
                      class="ml-1 w-3 h-3 text-white" />
                  </div>
                </TableHead>
                <TableHead class="text-right w-[120px] px-3 py-2 font-light text-xs text-white">Volume (USD)</TableHead>
                <TableHead class="text-right w-[140px] px-3 py-2 font-light text-xs text-white">Best Prices</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <MarketItem v-for="market in filteredMarketData" :key="market.pair.primary" :market="market" />
            </TableBody>
          </Table>
        </div>

        <div
          class="lg:hidden bg-white/10 backdrop-blur-md px-3 py-2 text-center text-xs text-white/70 border-t border-white/20">
          <span class="inline-flex items-center">
            <Icon icon="radix-icons:arrow-left" class="w-3 h-3 mr-2" />
            Swipe to view all columns
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useMarketStore } from '../store/market'
import { useFiltersStore } from '../store/filters'
import { storeToRefs } from 'pinia'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Icon } from '@iconify/vue'
import Search from './Search.vue'
import Filter from './Filter.vue'
import MarketItem from './MarketItem.vue'

const marketStore = useMarketStore()
const filtersStore = useFiltersStore()

const { marketData, filteredMarketData, loading, error } = storeToRefs(marketStore)

onMounted(async () => {
  await marketStore.fetchAllData()

  if (marketStore.dataReady) {
    marketStore.startPolling(30000)
  }
})

onUnmounted(() => {
  marketStore.stopPolling()
})

function sortByField(field: 'name' | 'price' | 'volume' | 'change') {
  filtersStore.toggleSortDirection(field)
  marketStore.applyFiltersAndSort()
}

function getSortFieldLabel(field: string) {
  const labels: Record<string, string> = {
    name: 'Name',
    price: 'Price',
    volume: 'Volume',
    change: 'Change'
  }

  return labels[field] ?? field
}
</script>
