export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://user26614.requestly.tech/test',
  useProxy: import.meta.env.DEV || import.meta.env.VITE_USE_PROXY === 'true',

  endpoints: {
    currency: '/api/currency',
    market: '/api/market'
  }
}


export function buildApiUrl(endpoint: string): string {
  const url = API_CONFIG.useProxy
    ? `/api${endpoint}`
    : `${API_CONFIG.baseURL}${endpoint}`

  return url
}

export function getCurrencyEndpoint(): string {
  return buildApiUrl(API_CONFIG.endpoints.currency)
}

export function getMarketEndpoint(): string {
  return buildApiUrl(API_CONFIG.endpoints.market)
}
