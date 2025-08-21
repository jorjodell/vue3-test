<template>
  <div :class="[iconSize, 'rounded-full overflow-hidden flex-shrink-0']">
    <img v-if="iconSrc" :src="iconSrc" :alt="alt" class="w-full h-full object-cover" />

    <div v-else
      class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center">
      <span :class="[fallbackTextSize, 'text-white font-bold']">{{ fallbackText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  icon?: string
  alt: string
  fallbackText?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  fallbackText: '',
  size: 'md'
})

function isValidBase64(str: string) {
  try {
    return /^[A-Za-z0-9+/]*={0,2}$/.test(str) && str.length > 0
  } catch (err) {
    return false
  }
}

function getImageSrc(base64Data: string) {
  if (base64Data.startsWith('iVBORw0KGgo')) {
    return `data:image/png;base64,${base64Data}`
  } else if (base64Data.startsWith('/9j/')) {
    return `data:image/jpeg;base64,${base64Data}`
  } else if (base64Data.startsWith('R0lGODlh') || base64Data.startsWith('R0lGODdh')) {
    return `data:image/gif;base64,${base64Data}`
  } else if (base64Data.startsWith('PHN2Zy') || base64Data.startsWith('PD94bWw')) {
    return `data:image/svg+xml;base64,${base64Data}`
  } else {
    return `data:image/svg+xml;base64,${base64Data}`
  }
}

const iconSrc = computed(() => {
  if (props.icon && isValidBase64(props.icon)) {
    return getImageSrc(props.icon)
  }
  return null
})

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-4 h-4'
    case 'lg': return 'w-8 h-8'
    default: return 'w-6 h-6'
  }
})

const fallbackTextSize = computed(() => {
  switch (props.size) {
    case 'sm': return 'text-xs'
    case 'lg': return 'text-sm'
    default: return 'text-xs'
  }
})
</script>
