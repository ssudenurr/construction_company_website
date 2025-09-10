<script setup>
import { ref, computed } from 'vue'
import Projects from '@/FakeData/FakeData.json'
import { useI18n } from 'vue-i18n'
import scrollTop from './scroll-top.vue'

const { t } = useI18n()

const props = defineProps({
  type: {
    type: String,
    default: 'all' // all, ongoing, new, completed
  }
})

const projectsData = ref(Projects.projects || [])

const filteredProjects = computed(() => {
  if (props.type === 'all') return projectsData.value
  return projectsData.value.filter(p => p.status === props.type)
});
function statusStyle(status) {
switch ((status || '').toLowerCase()) {
case 'ongoing': return 'bg-gray-100 text-indigo-700'
case 'new': return 'bg-gray-100 text-yellow-700'
case 'completed': return 'bg-gray-100 text-green-700'
default: return 'bg-gray-50 text-gray-700'
}
}
</script>

<template>
  <section class="py-20 bg-white text-gray-900">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="project in filteredProjects"
          :key="project.id"
          class="group relative rounded-2xl overflow-hidden shadow-2xl transform transition duration-700 hover:scale-[1.02] 
          hover:shadow-[0_30px_80px_rgba(2,6,23,0.7)] bg-slate-50"
          aria-labelledby="`project-${project.id}-title`"
        >
          <!-- Image / Visual -->
          <div class="relative w-full aspect-[4/4] bg-gray-100">
            <img
              :src="project.image"
              :alt="project.title"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <!-- gradient overlay to give premium mood -->
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>

            <!-- Status badge -->
            <span :class="`absolute uppercase font-semibold left-4 top-4 px-3 py-1.5 text-sm rounded-full ${statusStyle(project.status)}`">
            {{ project.status }}
            </span>

            <!-- subtle decorative corner */ -->
            <div class="absolute right-4 bottom-4 opacity-80 text-xs text-gray-500 bg-white/20 rounded-full px-2 py-1">{{ project.year || '' }}</div>
          </div>

          <!-- Content (glass) -->
          <div class="p-6 -mt-2 relative z-10 transition-all duration-500 group-hover:mt-0">
            <h3 :id="`project-${project.id}-title`" class="text-xl sm:text-2xl font-bold leading-tight mb-2 group-hover:text-yellow-600 transition-colors">
              {{ project.title }}
            </h3>

            <p class="text-sm text-gray-600 mb-4 line-clamp-3">{{ project.description || project.excerpt || '' }}</p>

            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-2 flex-wrap">
                <span v-for="tag in (project.tags || []).slice(0,3)" :key="tag" class="text-xs px-2 py-1 rounded-md bg-gray-200 border border-gray-300">{{ tag }}</span>
              </div>

              <router-link
                :to="`/project-detail/${project.id}`"
                class="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg border border-gray-300 bg-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors"
                aria-label="View project details"
              >
                {{ t('projects.viewDetails') }}
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </router-link>
            </div>
          </div>
        </article>
      </div>

    </div>

    <scrollTop />
  </section>
</template>

<style scoped>
.h-140 { height: 35rem; }
@media (prefers-reduced-motion: reduce) {
  .group, img, .group * { transition: none !important; animation: none !important; }
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
