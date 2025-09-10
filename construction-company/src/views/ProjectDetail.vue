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
    case 'ongoing': return 'bg-blue-50 text-blue-700 border-blue-100'
    case 'new': return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    case 'completed': return 'bg-gray-50 text-gray-700 border-gray-100'
    default: return 'bg-white text-gray-700 border-gray-100'
  }
}
</script>

<template>
  <div>
  <div class="bg-white min-h-screen text-gray-800">
    <HeaderSection class="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 w-full" />
    <div class="max-w-8xl mx-auto px-24 py-10">
      <div v-if="project" class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <!-- main content  -->
        <main class="lg:col-span-8 space-y-6">
          <div class="rounded-2xl overflow-hidden shadow-lg">
            <div class="relative">
              <img :src="activeImage || project.image" :alt="project.title" class="sm:w-[80rem] md:w-[100rem] lg:w-[110rem] xl:w-[120rem] 2xl:w-[120rem] h-[420px] md:h-[520px] lg:h-[540px] xl:h-[650px] 2xl:h-[780px] object-cover" />
              <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/25 pointer-events-none"></div>
            </div>

            <div class="p-4 bg-white flex gap-3 overflow-x-auto">
              <button
                v-for="(img, idx) in thumbs"
                :key="idx"
                @click="activeImage = img"
                class="flex-none w-28 h-20 rounded-md overflow-hidden border-2"
                :class="img === activeImage ? 'border-blue-500 scale-105' : 'border-gray-200'"
              >
                <img :src="img" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>
          <div class="w-full bg-white border rounded-2xl p-4 sm:p-5 text-gray-700 shadow-2xl">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <!-- Status -->
              <div class="flex items-center gap-3 min-w-0">
                <div class="text-sm text-gray-500 truncate">{{ t('project.status','Status') }}</div>
                <div
                  :class="`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border font-medium ${statusStyle(project.status)}`"
                  :aria-label="`Project status: ${project.status}`"
                  role="status">
                  <span class="truncate">{{ project.status }}</span>
                </div>
              </div>

              <!-- Project metrics -->
              <div class="grid grid-cols-3 gap-4 w-full sm:w-auto">
                <div class="flex flex-col items-start sm:items-center">
                  <div class="text-sm text-gray-500">m²</div>
                  <div class="text-md font-semibold text-gray-900 truncate">{{ project.area || '-' }}</div>
                </div>
                <div class="flex flex-col items-start sm:items-center">
                  <div class="text-sm text-gray-500">Floors</div>
                  <div class="text-md font-semibold text-gray-900 truncate">{{ project.floors || '-' }}</div>
                </div>
                <div class="flex flex-col items-start sm:items-center">
                  <div class="text-sm text-gray-500">Units</div>
                  <div class="text-md font-semibold text-gray-900 truncate">{{ project.units || '-' }}</div>
                </div>
              </div>

            </div>
          </div>
        </main>
        <!-- aside -->
        <aside class="lg:col-span-4">
          <div class="sticky top-24 space-y-6 rounded-2xl p-8">
              <article class="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-900">{{ project.title }}</h2>
                <p class="text-sm text-gray-500 mt-1">{{ project.location }}</p>
                <p class="text-base text-gray-700 leading-relaxed mt-4">{{ project.description }}</p>
              </article>
          </div>
        </aside>
      </div>
      <div v-else class="text-center py-16">
        <p class="text-gray-500">{{ t('project.notFound','Project not found') }}</p>
      </div>
    </div>
  </div>
  <FooterSection />
  </div>
</template>
