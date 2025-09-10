<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

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
          <svg class="w-10 h-10 text-red-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M11.001 14h2v2h-2z" fill="currentColor"/>
            <path d="M11 6h2v6h-2z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8C7.588 4 4 7.588 4 12s3.588 8 8 8 8-3.588 8-8-3.588-8-8-8z" fill="currentColor"/>
          </svg>
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
