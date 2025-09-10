<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute} from 'vue-router'
import { useI18n } from 'vue-i18n'
import Projects from '@/FakeData/FakeData.json'
import HeaderSection from '@/components/Header-section.vue'
import FooterSection from '@/components/Footer-section.vue'

const { t } = useI18n()
const route = useRoute()

// DON'T coerce too early — compare as strings to avoid type mismatch
const project = computed(() =>
  (Projects && Projects.projects
    ? Projects.projects.find(p => String(p.id) === String(route.params.id))
    : null)
)

// gallery / thumbs
const activeImage = ref('')
const thumbs = ref([])

onMounted(() => {
  if (project.value) {
    thumbs.value = (project.value.gallery && project.value.gallery.length) ? project.value.gallery : [project.value.image]
    activeImage.value = thumbs.value[0] || project.value.image || ''
  }
})
// styling helper for status
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
  <div>
    <div class="bg-white min-h-screen text-gray-800">
      <HeaderSection class="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 w-full" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-12">
        <div v-if="project" class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          <!-- main content -->
          <main class="lg:col-span-8 space-y-6">
            <div class="rounded-2xl overflow-hidden shadow-lg">
              <div class="relative">
                <img 
                  :src="activeImage || project.image" 
                  :alt="project.title" 
                  class="w-full aspect-[16/9] md:aspect-[21/9] object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/25 pointer-events-none"></div>
              </div>

              <!-- thumbnails -->
              <div class="p-3 sm:p-4 bg-white flex gap-3 overflow-x-auto">
                <button
                  v-for="(img, idx) in thumbs"
                  :key="idx"
                  @click="activeImage = img"
                  class="flex-none w-24 h-16 sm:w-28 sm:h-20 rounded-md overflow-hidden border-2 transition-transform"
                  :class="img === activeImage ? 'border-blue-500 scale-105' : 'border-gray-200'"
                >
                  <img :src="img" class="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            <!-- project info -->
            <div class="w-full bg-white border rounded-2xl p-4 sm:p-6 text-gray-700 shadow-lg">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                
                <!-- Status -->
                <div class="flex items-center gap-3">
                  <div class="text-sm text-gray-500">{{ t('project.status','Status') }}</div>
                  <div
                    :class="`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border font-medium ${statusStyle(project.status)}`"
                    :aria-label="`Project status: ${project.status}`"
                    role="status">
                    <span>{{ project.status }}</span>
                  </div>
                </div>

                <!-- Project metrics -->
                <div class="grid grid-cols-3 gap-4 w-full sm:w-auto">
                  <div class="flex flex-col items-start sm:items-center">
                    <div class="text-sm text-gray-500">m²</div>
                    <div class="text-md font-semibold text-gray-900">{{ project.area || '-' }}</div>
                  </div>
                  <div class="flex flex-col items-start sm:items-center">
                    <div class="text-sm text-gray-500">Floors</div>
                    <div class="text-md font-semibold text-gray-900">{{ project.floors || '-' }}</div>
                  </div>
                  <div class="flex flex-col items-start sm:items-center">
                    <div class="text-sm text-gray-500">Units</div>
                    <div class="text-md font-semibold text-gray-900">{{ project.units || '-' }}</div>
                  </div>
                </div>

              </div>
            </div>
          </main>

          <!-- aside -->
          <aside class="lg:col-span-4">
            <div class="sticky top-24 space-y-6">
              <article class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 class="text-xl md:text-2xl font-bold text-gray-900">{{ project.title }}</h2>
                <p class="text-sm text-gray-500 mt-1">{{ project.location }}</p>
                <p class="text-base text-gray-700 leading-relaxed mt-4">{{ project.description }}</p>
              </article>
            </div>
          </aside>
        </div>

        <!-- not found -->
        <div v-else class="text-center py-16">
          <p class="text-gray-500">{{ t('project.notFound','Project not found') }}</p>
        </div>
      </div>
    </div>
    <FooterSection />
  </div>
</template>
