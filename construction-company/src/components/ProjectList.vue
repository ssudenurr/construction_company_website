<script setup>
import { ref, computed } from 'vue'
import Projects from '@/FakeData/FakeData.json'
import { useI18n } from 'vue-i18n'
import scrollTop from './scroll-top.vue';
const { t } = useI18n();

const props = defineProps({
  type: {
    type: String,
    default: 'all' // all, ongoing, new, completed
  }
});

const projectsData = ref(Projects.projects || [])

const filteredProjects = computed(() => {
  if (props.type === 'all') return projectsData.value
  return projectsData.value.filter(p => p.status === props.type)
});
</script>

<template>
  <section class="py-16 text-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="relative overflow-hidden shadow-lg transition-transform duration-800 ease-in-out group hover:scale-98">
          <!-- image -->
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-140 object-cover"
          />

          <!-- Yellow overlay only when hovering -->
          <div
            class="absolute inset-0 bg-transparent group-hover:bg-yellow-500/90 transition-colors duration-700 ease-in-out"
          ></div>

          <!-- Overlay: Text -->
          <div
            class="absolute top-0 left-0 w-full px-6 pt-6 flex flex-col items-start transition-all duration-700 ease-in-out
                  group-hover:translate-y-16">
            <h3
              class="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.7)] mb-2 transition-all duration-1000 
                    ease-in-out group-hover:text-[2.4rem] group-hover:text-black">
              {{ project.title }}
            </h3>
            <router-link
              :to="`/project-detail/${project.id}`"
              class="bg-white text-yellow-600 font-semibold px-4 py-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out mt-5"
            >
              {{ t('projects.viewDetails') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <scrollTop />
  </section>
</template>

<style scoped>
.h-140 { height: 35rem; } 
</style>
