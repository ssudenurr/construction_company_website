<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

const router = useRouter()
const { t } = useI18n()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center 
              bg-gradient-to-bl from-gray-900 via-gray-800 to-gray-900 text-white">
    <!-- Code + Icon -->
    <div class="flex flex-col items-center gap-6 max-w-xl">
      <div class="flex items-center gap-3">
        <div class="rounded-full bg-red-600/20 p-4">
          <Icon icon="mdi:alert-circle-outline" class="w-8 h-8 text-red-600" />
        </div>
        <h1 class="text-6xl md:text-7xl font-extrabold tracking-tight text-white">404</h1>
      </div>

      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-white">
          {{ t('notFound.title') }}
        </h2>
        <p class="mt-3 text-gray-300 text-base md:text-lg leading-relaxed">
          {{ t('notFound.message') }}
        </p>
      </div>

      <!-- Button -->
      <div>
        <button @click="goHome"
                class="px-6 py-3 rounded-xl bg-red-600 text-white font-medium shadow-lg hover:bg-red-700 transition">
          {{ t('notFound.button', 'Go Back to Home') }}
        </button>
      </div>
    </div>
  </div>
</template>
