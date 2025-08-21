import { defineStore } from 'pinia'
import type { MarketData, Currency, MarketStoreState } from './types'
import { useFiltersStore } from './filters'
import { getCurrencyEndpoint, getMarketEndpoint } from '@/config/api'

export const useMarketStore = defineStore('market', {
  state: (): MarketStoreState => {
    return {
      currencies: [],
      currenciesMap: {},
      marketData: [],
      filteredMarketData: [],
      loading: false,
      error: '',
      dataReady: false,
      pollingInterval: null,
      isPolling: false,
      pollingIntervalMs: 30000
    }
  },
  getters: {
    getCurrencyByCode: (state) => (code: string): Currency | null => {
      return state.currenciesMap[code] || null
    }
  },
  actions: {
    async fetchAllData() {
      this.loading = true
      this.error = ''
      this.dataReady = false

      try {
        const [currenciesResponse, marketResponse] = await Promise.all([
          fetch(getCurrencyEndpoint()),
          fetch(getMarketEndpoint())
        ])

        if (!currenciesResponse.ok || !marketResponse.ok) {
          throw new Error('Ошибка загрузки данных')
        }

        const [currencies, marketData] = await Promise.all([
          currenciesResponse.json(),
          marketResponse.json()
        ])

        this.currencies = currencies
        this.marketData = marketData
        this.filteredMarketData = marketData

        this.currenciesMap = currencies.reduce((acc: Record<string, Currency>, currency: Currency) => {
          acc[currency.code] = currency
          return acc
        }, {})

        this.dataReady = true

      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Неизвестная ошибка'
      } finally {
        this.loading = false
      }
    },

    applyFiltersAndSort() {
      if (!this.dataReady) return

      const filtersStore = useFiltersStore()
      this.filteredMarketData = filtersStore.applyFiltersAndSort(this.marketData)
    },

    async fetchMarketDataOnly() {
      try {
        const response = await fetch(getMarketEndpoint())
        if (!response.ok) {
          throw new Error('Ошибка загрузки market data')
        }

        const marketData = await response.json()
        this.marketData = marketData
        this.applyFiltersAndSort()

      } catch (error) {
        console.error('Error fetching market data:', error)
      }
    },

    startPolling(intervalMs?: number) {
      if (this.isPolling) return

      const interval = intervalMs || this.pollingIntervalMs

      this.isPolling = true
      this.pollingInterval = window.setInterval(() => {
        this.fetchMarketDataOnly()
      }, interval)
    },

    stopPolling() {
      if (this.pollingInterval) {
        window.clearInterval(this.pollingInterval)
        this.pollingInterval = null
      }
      this.isPolling = false
    },

    setPollingInterval(intervalMs: number) {
      this.pollingIntervalMs = intervalMs

      if (this.isPolling) {
        this.stopPolling()
        this.startPolling()
      }
    }
  },
})