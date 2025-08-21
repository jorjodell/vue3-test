import { defineStore } from 'pinia'
import type { FilterOptions, SortOptions, MarketData } from './types'

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    filters: {
      search: '',
      priceRange: { min: 0, max: 0 },
      volumeRange: { min: 0, max: 0 },
      changeRange: { min: -100, max: 100 }
    } as FilterOptions,
    sortOptions: {
      field: 'name' as const,
      direction: 'asc' as const
    } as SortOptions
  }),

  getters: {
    getFilters: (state): FilterOptions => state.filters,
    getSortOptions: (state): SortOptions => state.sortOptions,
    getSearch: (state): string => state.filters.search,
    getPriceRange: (state): { min: number; max: number } => state.filters.priceRange,
    getVolumeRange: (state): { min: number; max: number } => state.filters.volumeRange,
    getChangeRange: (state): { min: number; max: number } => state.filters.changeRange,
    getSortField: (state): 'name' | 'price' | 'volume' | 'change' => state.sortOptions.field,
    getSortDirection: (state): 'asc' | 'desc' => state.sortOptions.direction
  },

  actions: {
    setSearch(search: string) {
      this.filters.search = search
    },

    setPriceRange(min: number, max: number) {
      this.filters.priceRange = { min, max }
    },

    setVolumeRange(min: number, max: number) {
      this.filters.volumeRange = { min, max }
    },

    setChangeRange(min: number, max: number) {
      this.filters.changeRange = { min, max }
    },

    setSortOptions(field: 'name' | 'price' | 'volume' | 'change', direction: 'asc' | 'desc') {
      this.sortOptions = { field, direction }
    },

    toggleSortDirection(field: 'name' | 'price' | 'volume' | 'change') {
      if (this.sortOptions.field === field) {
        this.sortOptions.direction = this.sortOptions.direction === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortOptions.field = field
        this.sortOptions.direction = 'asc'
      }
    },

    resetFilters() {
      this.filters = {
        search: '',
        priceRange: { min: 0, max: 0 },
        volumeRange: { min: 0, max: 0 },
        changeRange: { min: -100, max: 100 }
      }
      this.sortOptions = { field: 'name', direction: 'asc' }
    },

    applyFiltersAndSort(marketData: MarketData[]): MarketData[] {
      let filtered = [...marketData]

      if (this.filters.search) {
        const searchLower = this.filters.search.toLowerCase()
        filtered = filtered.filter(market =>
          market.pair.primary.toLowerCase().includes(searchLower) ||
          market.pair.secondary.toLowerCase().includes(searchLower)
        )
      }

      if (this.filters.priceRange.min > 0 || this.filters.priceRange.max > 0) {
        filtered = filtered.filter(market => {
          const price = parseFloat(market.price.last)
          return price >= this.filters.priceRange.min &&
            (this.filters.priceRange.max === 0 || price <= this.filters.priceRange.max)
        })
      }

      if (this.filters.volumeRange.min > 0 || this.filters.volumeRange.max > 0) {
        filtered = filtered.filter(market => {
          const volume = parseFloat(market.volume.primary)
          return volume >= this.filters.volumeRange.min &&
            (this.filters.volumeRange.max === 0 || volume <= this.filters.volumeRange.max)
        })
      }

      if (this.filters.changeRange.min > -100 || this.filters.changeRange.max < 100) {
        filtered = filtered.filter(market => {
          const change = parseFloat(market.price.change.percent)
          return change >= this.filters.changeRange.min && change <= this.filters.changeRange.max
        })
      }

      filtered.sort((a, b) => {
        let aValue: string | number
        let bValue: string | number

        switch (this.sortOptions.field) {
          case 'name':
            aValue = a.pair.primary.toLowerCase()
            bValue = b.pair.primary.toLowerCase()
            break
          case 'price':
            aValue = parseFloat(a.price.last)
            bValue = parseFloat(b.price.last)
            break
          case 'volume':
            aValue = parseFloat(a.volume.primary)
            bValue = parseFloat(b.volume.primary)
            break
          case 'change':
            aValue = parseFloat(a.price.change.percent)
            bValue = parseFloat(b.price.change.percent)
            break
          default:
            aValue = a.pair.primary.toLowerCase()
            bValue = b.pair.primary.toLowerCase()
        }

        if (this.sortOptions.direction === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })

      return filtered
    }
  }
})
