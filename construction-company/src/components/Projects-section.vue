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
const visibleCards = ref(2) 
const cardPercent = ref(100 / visibleCards.value)
const totalPages = computed(() => Math.max(1, projects.value.length - visibleCards.value + 1))

// overlay state 
const activeOverlay = ref(null)

// Responsive logic
function updateVisibleCards() {
  const w = window.innerWidth
  visibleCards.value = w < 640 ? 1 : 2
  cardPercent.value = 100 / visibleCards.value
}

onMounted(() => {
  updateVisibleCards()
  window.addEventListener('resize', updateVisibleCards)
  document.addEventListener('click', handleDocClick)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVisibleCards)
  document.removeEventListener('click', handleDocClick)
})

// Jump to specific slide when dot is clicked
function goToSlide(index) {
  projectIndex.value = index
}

// Drag + swipe support
let isDragging = false
let startX = 0

function getEventX(event) {
  return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX
}

function startDrag(event) {
  isDragging = true
  startX = getEventX(event)
  if (sliderContainer.value) sliderContainer.value.classList.add('cursor-grabbing')
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
  if (sliderContainer.value) sliderContainer.value.classList.remove('cursor-grabbing')
}

// Overlay toggle: only toggle via click on mobile & tablet (width < 1024)
// Desktop (>=1024) will rely on CSS hover (group-hover)
function toggleOverlay(id) {
  const w = window.innerWidth
  const tabletBreakpoint = 1024 // <= this value => treat as mobile/tablet for clicks
  if (w <= tabletBreakpoint) {
    activeOverlay.value = activeOverlay.value === id ? null : id
  }
}

// Close overlay when clicking outside slider (mobile/tablet)
function handleDocClick(e) {
  const w = window.innerWidth
  const tabletBreakpoint = 1024
  if (w > tabletBreakpoint) return // only close on mobile/tablet
  const container = sliderContainer.value
  if (!container) return
  if (!container.contains(e.target)) {
    activeOverlay.value = null
  }
}
</script>

<template>
  <section id="projects" class="py-18">
    <div class="max-w-8xl mx-auto px-6">
      <!-- Section title -->
      <h2 class="text-3xl md:text-4xl uppercase font-extrabold text-center mb-12 text-gray-900">
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
            :style="{ width: `${cardPercent}%`, padding: '0.75rem' }">
            
            <div class="bg-white rounded-3xl shadow-lg overflow-hidden relative group/card">
              
              <!-- Project image -->
              <img
                :src="project.image"
                class="w-full h-[28rem] md:h-[34rem] object-cover"
                :alt="t('projects.imageAlt', { title: project.title })"
                @click.stop="toggleOverlay(project.id)" 
              />

              <!-- Overlay: visible on hover (desktop) OR when activeOverlay === id (mobile/tablet click) -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-yellow-500/50 to-transparent 
                      transition-opacity duration-500 flex flex-col justify-center items-center p-5 text-center
                      opacity-0 group-hover/card:opacity-100 pointer-events-none"
                :class="{ 'opacity-100 pointer-events-auto': activeOverlay === project.id }">
                <h3 class="font-extrabold text-3xl md:text-5xl mb-2 text-white">{{ project.title }}</h3>
                <router-link
                  :to="`/project-detail/${project.id}`"
                  class="bg-white text-yellow-600 font-semibold px-4 py-2 rounded 
                        hover:bg-yellow-400 hover:text-white transition transform duration-150">
                  {{ t('projects.viewDetails') }}
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation dots -->
        <div class="flex justify-center gap-2 mt-6">
          <button
            v-for="(_, idx) in totalPages"
            :key="idx"
            @click="goToSlide(idx)"
            :class="[ 'w-3 h-3 rounded-full transition',
              projectIndex === idx ? 'bg-yellow-500' : 'bg-gray-300 hover:bg-yellow-400'
            ]">
          </button>
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
