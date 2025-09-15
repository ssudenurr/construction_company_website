<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import servicesData from '../FakeData/Services.json'

const services = ref(servicesData.services || [])
const { t } = useI18n();

const sliderIndex = ref(Array(services.value.length).fill(0))
const intervalTime = 4000
let intervals = []

const slideNext = (idx, total) => {
  sliderIndex.value[idx] = (sliderIndex.value[idx] + 1) % total
}

onMounted(() => {
  services.value.forEach((service, idx) => {
    const intv = setInterval(() => {
      slideNext(idx, service.images.length)
    }, intervalTime)
    intervals.push(intv)
  })
})

onBeforeUnmount(() => {
  intervals.forEach((intv) => clearInterval(intv))
});
</script>

<template>
<section
  id="services"
  class="py-24 relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
>
  <!-- Decorative backgrounds -->
  <div class="absolute -top-32 -left-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
  <div class="absolute -bottom-32 -right-20 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-3xl animate-pulse-slow"></div>

  <div class="max-w-7xl mx-auto px-6 text-center relative z-10">
    <h2 class="text-4xl md:text-5xl font-extrabold mb-6 text-white" data-aos="fade-up">
      {{ t('header.services') }}
    </h2>
    <p class="max-w-3xl mx-auto text-lg text-gray-300 mb-16" data-aos="fade-up" data-aos-delay="150">
      {{ t('services.subtitle') }}
    </p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div
        v-for="(service, idx) in services"
        :key="idx"
        class="relative rounded-3xl overflow-hidden group hover:scale-103 transform transition duration-1000
               shadow-2xl bg-gray-900/60 border border-gray-700 backdrop-blur-sm"
        data-aos="zoom-in-up"
        :data-aos-delay="idx * 200"
      >
        <!-- Slider -->
        <div class="overflow-hidden relative h-[340px]">
          <div
            class="flex transition-transform duration-700 ease-in-out w-full h-full"
            :style="{ transform: `translateX(-${sliderIndex[idx] * 100}%)` }"
          >
            <div
              v-for="(img, i) in service.images"
              :key="i"
              class="flex-shrink-0 w-full h-full relative"
            >
              <img :src="img" class="w-full h-full object-cover transform transition duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            </div>
          </div>

          <!-- Indicators -->
          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            <span
              v-for="(img, i) in service.images"
              :key="i"
              @click="sliderIndex[idx] = i"
              :class="[
                'w-3 h-3 rounded-full cursor-pointer transition',
                sliderIndex[idx] === i
                  ? 'bg-yellow-500 scale-110'
                  : 'bg-gray-300 hover:bg-yellow-400'
              ]"
            ></span>
          </div>
        </div>

        <!-- Service content -->
        <div class="absolute bottom-0 inset-x-0 p-6 text-left z-20">
          <div class="flex items-center gap-2 mb-2">
            <Icon :icon="service.icon" class="w-7 h-7 text-yellow-400" />
            <h3 class="text-2xl font-bold text-white drop-shadow-md">
              {{ t(`services.${service.key}.title`) }}
            </h3>
          </div>
          <p class="text-gray-200 text-sm mb-4 leading-relaxed">
            {{ t(`services.${service.key}.text`) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

</template>

<style scoped>
@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}
.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}
</style>
