<template>
  <TableRow class="hover:bg-white/5 transition-colors">
    <TableCell class="w-[200px] px-3 py-2">
      <div class="flex items-center space-x-3">
        <Icon :icon="currencyIcon ?? undefined" :alt="market.pair.primary"
          :fallback-text="market.pair.primary.charAt(0)" size="sm" />
        <div class="min-w-0 flex-1">
          <div class="font-light text-white truncate text-sm">{{ market.pair.primary }}</div>
          <div class="text-xs text-white/70 truncate">{{ market.pair.secondary }}</div>
        </div>
      </div>
    </TableCell>

    <TableCell class="text-right w-[120px] px-3 py-2">
      <div class="font-light text-white text-sm">${{ formatPrice(parseFloat(market.price.last)) }}</div>
    </TableCell>

    <TableCell class="text-right w-[120px] px-3 py-2">
      <div :class="getChangeClass(parseFloat(market.price.change.percent))" class="text-sm">
        {{ formatChange(parseFloat(market.price.change.percent)) }}
      </div>
    </TableCell>

    <TableCell class="text-right w-[120px] px-3 py-2">
      <div class="text-white text-sm">{{ formatVolume(parseFloat(market.volume.primary)) }}</div>
      <div class="text-xs text-white/70">{{ market.pair.primary }}</div>
    </TableCell>

    <TableCell class="text-right w-[120px] px-3 py-2">
      <div class="text-white text-sm">${{ formatVolume(parseFloat(market.volume.secondary)) }}</div>
    </TableCell>

    <TableCell class="text-right w-[140px] px-3 py-2">
      <div class="text-xs">
        <div class="text-green-400">${{ formatPrice(parseFloat(market.price.bestBid)) }}</div>
        <div class="text-red-400">${{ formatPrice(parseFloat(market.price.bestOffer)) }}</div>
      </div>
    </TableCell>
  </TableRow>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MarketData } from '../store/types'
import { useMarketStore } from '../store/market'
import { TableCell, TableRow } from '@/components/ui/table'
import Icon from './Icon.vue'

const props = defineProps<{
  market: MarketData
}>()

const marketStore = useMarketStore()

const currencyIcon = computed(() => {
  const currency = marketStore.getCurrencyByCode(props.market.pair.primary)
  return currency?.icon ?? null
})

function formatPrice(price: number): string {
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })
}

function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(2)}%`
}

function getChangeClass(change: number): string {
  return change >= 0 ? 'text-green-400 font-light' : 'text-red-400 font-light'
}

function formatVolume(volume: number): string {
  if (volume >= 1e9) {
    return (volume / 1e9).toFixed(2) + 'B'
  } else if (volume >= 1e6) {
    return (volume / 1e6).toFixed(2) + 'M'
  } else if (volume >= 1e3) {
    return (volume / 1e3).toFixed(2) + 'K'
  }
  return volume.toLocaleString()
}
</script>