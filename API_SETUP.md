# API Configuration Setup

## Overview
This project supports both development (with proxy) and production (direct API calls) modes.

## Environment Variables

### Development Mode (with proxy) - Default
```bash
# env.local
VITE_API_BASE_URL=https://user26614.requestly.tech/test
VITE_USE_PROXY=true
# or simply leave VITE_USE_PROXY empty/undefined
```

### Production Mode (direct API calls)
```bash
# env.local
VITE_API_BASE_URL=https://user26614.requestly.tech/test
VITE_USE_PROXY=false
```

**Note**: In development mode, the proxy is automatically enabled regardless of the `VITE_USE_PROXY` value.

## Build Commands

### Development Build (with proxy)
```bash
pnpm build:dev
```
This will use proxy configuration for API calls.

### Production Build (direct API calls)
```bash
pnpm build:prod
```
This will make direct API calls without proxy.

### Default Build
```bash
pnpm build
```
Uses the current environment configuration.

## How It Works

1. **Development Mode**: 
   - Automatically detects development environment (`import.meta.env.DEV`)
   - Always uses Vite proxy (`/api` → `https://user26614.requestly.tech/test`)
   - API calls go through `/api/api/currency` → proxy → `https://user26614.requestly.tech/test/api/currency`

2. **Production Mode**:
   - Checks `VITE_USE_PROXY` environment variable
   - If `false`: Direct API calls to `https://user26614.requestly.tech/test/api/currency`
   - If `true` or undefined: Still uses proxy (fallback for compatibility)

## Switching Between Modes

### To switch to production mode (direct API calls):
1. Edit `env.local`
2. Change `VITE_USE_PROXY=true` to `VITE_USE_PROXY=false`
3. Run `pnpm build:prod`

### To switch back to development mode (proxy):
1. Edit `env.local`
2. Change `VITE_USE_PROXY=false` to `VITE_USE_PROXY=true`
3. Run `pnpm build:dev`

**Note**: In development mode (`pnpm dev`), the proxy is always enabled regardless of the `VITE_USE_PROXY` setting.

## API Configuration File

The configuration is centralized in `src/config/api.ts`:
- Automatically detects development vs production mode
- In development: Always uses proxy (`import.meta.env.DEV`)
- In production: Checks `VITE_USE_PROXY` environment variable
- Provides helper functions for building API URLs
- Handles proxy vs direct calls transparently

## Troubleshooting

### If API calls fail in production:
1. Check that `VITE_USE_PROXY=false`
2. Verify `VITE_API_BASE_URL` is correct
3. Ensure the API endpoint is accessible from production environment

### If proxy doesn't work in development:
1. Check that `VITE_USE_PROXY=true`
2. Restart the development server
3. Verify the target URL in `vite.config.ts`
