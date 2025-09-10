<script setup>
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue';
const { t } = useI18n();
</script>

<template>
  <!-- HERO SECTION -->
  <section
    class="h-screen relative flex items-center justify-end px-6 bg-cover bg-center pt-16">

    <!-- Black overlay -->
    <div class="absolute inset-0 bg-black/50 z-0"></div>

    <!-- Content -->
    <div
      class="relative max-w-5xl text-right text-white fade-up z-20 pb-32"
      data-aos="fade-left"
      data-aos-duration="1000">
      <h1 class="text-2xl md:text-8xl font-bold mb-4 leading-tight">
        {{ t('hero.modernProjects') }},<br />
        {{ t('hero.strongStructures') }}
      </h1>

      <!-- CTA Button -->
      <div class="mt-6 flex justify-end gap-4 flex-wrap">
        <a
          href="#contact"
          class="bg-yellow-500 px-6 py-3 rounded-full text-lg font-semibold shadow-lg 
          hover:bg-yellow-400 transition-transform transform hover:scale-110 flex items-center gap-2">
          {{ t('hero.freeDiscoveryRequest') }}
          <Icon icon="mdi:arrow-right" class="w-6 h-6" />
        </a>
      </div>
      
    </div>
  </section>
</template>
