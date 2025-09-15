<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue"
import { useI18n } from 'vue-i18n'
import { useSeo } from "@/composables/useSeo"
import seoData from '../Datas/seoData.js'

useSeo(seoData.home.cta);
const { t } = useI18n()

// Dynamic meter data
const counters = reactive([
  { key: "projects", value: 0, target: 24, label: "ctaCounters.projects" },
  { key: "area", value: 0, target: 25890, label: "ctaCounters.area" },
  { key: "families", value: 0, target: 365, label: "ctaCounters.families" },
])

const duration = 1500 //  animation duration
const ctaSection = ref(null)
let observer = null

// Counter animation
function startCounting() {
  const start = performance.now()

  function animate(time) {
    const progress = Math.min((time - start) / duration, 1)

    counters.forEach(counter => {
      counter.value = Math.floor(progress * counter.target)
    })

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

// When the CTA appears, start the counter
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting()
      }
    })
  }, { threshold: 0.5 }) // Start at 50% visibility

  if (ctaSection.value) {
    observer.observe(ctaSection.value)
  }
})

onBeforeUnmount(() => {
  if (observer && ctaSection.value) {
    observer.unobserve(ctaSection.value)
  }
});
</script>

<template>
  <!-- CTA -->
  <section 
    class="bg-yellow-600 text-white py-20 text-center px-5" 
    ref="ctaSection">
    <h2 class="text-2xl mb-6 fade-up leading-relaxed" v-html="t('cta.title')"></h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto mt-12">
      <div v-for="counter in counters" :key="counter.key">
        <h3 class="text-5xl font-extrabold">{{ counter.value }}</h3>
        <p class="text-lg mt-2">{{ t(counter.label) }}</p>
      </div>
    </div>
  </section>
</template>

