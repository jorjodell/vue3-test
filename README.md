# Crypto Market Tracker

A modern, real-time cryptocurrency market tracking application built with Vue 3, TypeScript, and Tailwind CSS. This application provides live cryptocurrency data with advanced filtering, sorting, and search capabilities.

## 🚀 Features

- **Real-time Market Data**: Live cryptocurrency prices, volumes, and market changes
- **Advanced Filtering**: Filter by price range, volume, and percentage change
- **Smart Search**: Search across all cryptocurrency pairs
- **Sortable Tables**: Sort by name, price, volume, or change percentage
- **Auto-updating**: Configurable polling intervals for real-time data
- **Responsive Design**: Modern, mobile-friendly interface with dark theme
- **Type Safety**: Full TypeScript support for robust development

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with custom animations
- **State Management**: Pinia
- **UI Components**: Custom component library with Radix Icons
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 📦 Dependencies

### Core Dependencies
- `vue` ^3.5.18 - Progressive JavaScript framework
- `@tanstack/vue-table` ^8.21.3 - Powerful table component
- `@vueuse/core` ^13.7.0 - Vue composition utilities
- `pinia` ^3.0.3 - State management for Vue
- `lucide-vue-next` ^0.540.0 - Beautiful icons

### UI & Styling
- `tailwindcss` ^4.1.12 - Utility-first CSS framework
- `class-variance-authority` ^0.7.1 - Component variant management
- `clsx` ^2.1.1 - Conditional className utility
- `reka-ui` ^2.4.1 - Modern UI component system

## 🚀 Getting Started

### Prerequisites
- Node.js ^20.19.0 or >=22.12.0
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test-vue3
```

2. Install dependencies:
```bash
pnpm install
```

3. Start development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `pnpm dev` - Start development server with hot-reload
- `pnpm build` - Build for production (uses current environment config)
- `pnpm build:dev` - Build for development (with proxy)
- `pnpm build:prod` - Build for production (direct API calls)
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier
- `pnpm type-check` - Run TypeScript type checking

## 🏗️ Project Structure

```
src/
├── components/          # Vue components
│   ├── ui/             # Reusable UI components
│   │   ├── button/     # Button components
│   │   ├── input/      # Input components
│   │   └── table/      # Table components
│   ├── CryptoData.vue  # Main crypto data display
│   ├── Filter.vue      # Filtering controls
│   ├── Search.vue      # Search functionality
│   └── MarketItem.vue  # Individual market item
├── store/               # Pinia stores
│   ├── market.ts       # Market data management
│   ├── filters.ts      # Filter state management
│   └── types.ts        # TypeScript interfaces
├── lib/                 # Utility functions
└── assets/              # Static assets
```

## 🎨 UI Components

The application features a comprehensive set of reusable UI components:

- **Table System**: Sortable, filterable data tables with responsive design
- **Search Component**: Real-time search with debounced input
- **Filter Controls**: Advanced filtering options for market data
- **Button Components**: Consistent button styling with variants
- **Input Components**: Form inputs with validation support

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast development and building. Configuration can be found in `vite.config.ts`.

### API Configuration
The application automatically handles API calls based on the environment:
- **Development**: Automatically uses Vite proxy for API calls
- **Production**: Configurable between proxy and direct API calls via `VITE_USE_PROXY`
- Configuration is managed through environment variables in `env.local`
- See `API_SETUP.md` for detailed configuration instructions

### Tailwind CSS
Custom Tailwind configuration in `tailwind.config.js` with extended color schemes and animations.

### TypeScript
Strict TypeScript configuration with Vue 3 support and modern ES features.

## 🌟 Key Features Explained

### Real-time Data Polling
The application automatically updates market data at configurable intervals, ensuring users always have the latest information.

### Advanced Filtering System
Users can filter cryptocurrencies by:
- Price ranges (minimum/maximum)
- Volume thresholds
- Percentage change limits
- Search terms across all fields

### Responsive Table Design
The data table automatically adjusts to different screen sizes and provides horizontal scrolling on mobile devices.

### Dark Theme
Modern dark theme with glassmorphism effects and subtle animations for an engaging user experience.


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

