export interface Currency {
  "code": string,
  "sort_order": number,
  "ticker": string,
  "type": string,
  "decimals_places": number,
  "icon": string
}

export interface MarketData {
  "pair": {
    "primary": string,
    "secondary": string
  },
  "price": {
    "last": string,
    "bestBid": string,
    "bestOffer": string,
    "change": {
      "direction": string,
      "percent": string,
      "amount": string
    }
  },
  "volume": {
    "primary": string,
    "secondary": string
  },
  "priceHistory": string[]
}

export interface FilterOptions {
  search: string
  priceRange: { min: number; max: number }
  volumeRange: { min: number; max: number }
  changeRange: { min: number; max: number }
}

export interface SortOptions {
  field: 'name' | 'price' | 'volume' | 'change'
  direction: 'asc' | 'desc'
}

export interface MarketStoreState {
  currencies: Currency[]
  currenciesMap: Record<string, Currency>
  marketData: MarketData[]
  filteredMarketData: MarketData[]
  loading: boolean
  error: string
  dataReady: boolean
  pollingInterval: number | null
  isPolling: boolean
  pollingIntervalMs: number
}