<script setup>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Projects from '@/FakeData/FakeData.json'
import HeaderSection from '@/components/Header-section.vue'
import { ref, computed } from 'vue'

const { t } = useI18n()
const route = useRoute()
const projectId = Number(route.params.id)
const projectsData = ref(Projects.projects || [])
// Filter → sadece only matching IDs
const filteredProjects = computed(() => {
  if (!projectsData.value) return []
  return projectsData.value.filter(p => p.id === projectId)
});


</script>

<template>
  <div>
    <HeaderSection class="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
    <section class="py-4">
      <div class="max-w-6xl mx-auto px-6">
        <div v-if="filteredProjects.length">
          <div v-for="project in filteredProjects" :key="project.id">
            <!-- Hero Image -->
            <div class="relative h-[28rem] md:h-[34rem] w-full overflow-hidden mb-4">
              <img
                :src="project.image"
                :alt="t('project.imageAlt', { title: project.title })"
                class="w-full h-full object-cover rounded-2xl shadow-lg"
                data-aos="zoom-in"
                data-aos-duration="1000"
              />
              <div class="absolute bottom-6 left-6 bg-black/60 text-white px-4 py-2 rounded-lg">
                {{ project.title }} — {{ project.location }}
              </div>
            </div>

            <!-- Content -->
            <div class="bg-white rounded-2xl shadow p-2" data-aos="fade-right" data-aos-duration="1000">
              <h1 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {{ project.title }}
              </h1>
              <p class="text-lg text-gray-700 leading-relaxed mb-6">
                {{ project.description }}
              </p>

              <!-- Features -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <div
                  v-for="(value, key) in {
                    status: project.status,
                    area: project.area,
                    units: project.units,
                    floors: project.floors
                  }"
                  :key="key"
                  class="bg-gray-100 rounded-xl p-4 text-center"
                >
                  <p class="text-sm text-gray-500">{{ t(`project.${key}`) }}</p>
                  <p class="font-semibold capitalize">{{ value }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <p class="text-center text-gray-500 text-lg">{{ t('project.notFound') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
