<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import projectsData from '../FakeData/FakeData.json'

const { t } = useI18n()
const projects = ref(projectsData.projects.filter(p => p.status === 'completed') || [])

// Slider state
const projectIndex = ref(0)
const slider = ref(null)
const sliderContainer = ref(null)
const visibleCards = ref(2) // Default 2 cards (desktop)
const cardPercent = ref(100 / visibleCards.value)
const totalPages = computed(() => projects.value.length - visibleCards.value + 1)

// Responsive logic (1 card on small screens)
function updateVisibleCards() {
  const w = window.innerWidth
  visibleCards.value = w < 640 ? 1 : 2
  cardPercent.value = 100 / visibleCards.value
}

onMounted(() => {
  updateVisibleCards()
  window.addEventListener('resize', updateVisibleCards)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVisibleCards)
})

// Jump to specific slide when dot is clicked
function goToSlide(index) {
  projectIndex.value = index
}

// Drag and touch support
let isDragging = false
let startX = 0

function getEventX(event) {
  return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX
}

function startDrag(event) {
  isDragging = true
  startX = getEventX(event)
  sliderContainer.value.classList.add('cursor-grabbing')
}

function onDrag(event) {
  if (!isDragging) return
  const currentX = getEventX(event)
  const diff = startX - currentX

  if (Math.abs(diff) > 50) {
    if (diff > 0 && projectIndex.value < projects.value.length - visibleCards.value) projectIndex.value++
    else if (diff < 0 && projectIndex.value > 0) projectIndex.value--
    isDragging = false
  }
}

function endDrag() {
  isDragging = false
  sliderContainer.value.classList.remove('cursor-grabbing')
}
</script>

<template>
  <section id="projects" class="py-18">
    <div class="max-w-8xl mx-auto px-6">
      <!-- Section title -->
      <h2 class="text-3xl md:text-4xl uppercase font-extrabold text-center mb-12 text-gray-900" data-aos="fade-up" data-aos-delay="100">
        {{ t('projects.completedProjects') }}
      </h2>

      <!-- Slider container -->
      <div
        ref="sliderContainer"
        class="relative overflow-hidden group mb-6"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="endDrag"
      >
        <!-- Slider track -->
        <div
          ref="slider"
          class="flex transition-transform duration-500 ease-in-out cursor-grab"
          :style="{ transform: `translateX(-${projectIndex * cardPercent}%)` }">
          <!-- Slider cards -->
          <div
            v-for="(project, index) in projects"
            :key="index"
            class="flex-shrink-0"
            :style="{ width: `${cardPercent}%`, padding: '0.75rem' }"
            data-aos="zoom-in-up"
            data-aos-delay="400">
            <div
              class="bg-white rounded-3xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-101 
              hover:shadow-3xl relative">
              <!-- Project image -->
              <img
                :src="project.image"
                class="w-full h-[32rem] md:h-[38rem] object-cover transition-transform duration-700"
                :alt="t('projects.imageAlt', { title: project.title })"
              />

              <!-- Hover overlay + View Details -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-yellow-500/40 to-transparent opacity-0 hover:opacity-100 
                transition-opacity duration-500 flex flex-col justify-center items-center p-5 text-center" >
                <h3 class="font-extrabold text-5xl mb-2 text-white">{{ project.title }}</h3>
                <router-link
                  :to="`/project-detail/${project.id}`"
                  class="bg-white text-yellow-600 font-semibold px-4 py-2 rounded 
                        hover:bg-yellow-400 hover:text-white hover:-translate-y-0.5 
                        active:scale-97 transition transform duration-150">
                  {{ t('projects.viewDetails') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Slider navigation dots -->
        <div class="flex justify-center gap-2 mt-6">
          <button
            v-for="(_, idx) in totalPages"
            :key="idx"
            @click="goToSlide(idx)"
            :class="[
              'w-3 h-3 rounded-full transition',
              projectIndex === idx ? 'bg-yellow-500' : 'bg-gray-300 hover:bg-yellow-400'
            ]"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cursor-grab {
  cursor: grab;
}
.cursor-grabbing {
  cursor: grabbing;
}
.hover-overlay {
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.5s ease;
}
</style>
