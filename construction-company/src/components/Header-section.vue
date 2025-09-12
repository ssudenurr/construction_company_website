<script setup>
import { ref, computed, watchEffect } from "vue"
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'

const isMenuOpen = ref(false)
const closeMenu = () => { isMenuOpen.value = false }

const { t, locale } = useI18n()
const savedLang = localStorage.getItem('lang') || 'en'
locale.value = savedLang

const phoneNumbers = {
  tr: { number: '+90 (555) 111-22-33', href: 'tel:+905551112233' },
  en: { number: '+44 20 7946 0958', href: 'tel:+442079460958' },
  de: { number: '+49 30 123456', href: 'tel:+4930123456' }
}
const activePhone = computed(() => phoneNumbers[locale.value] || phoneNumbers.tr)

watchEffect(() => {
  localStorage.setItem('lang', locale.value)
})

const languages = [
  { code: 'tr', label: 'Türkçe', flag: 'twemoji:flag-turkey' },
  { code: 'en', label: 'English', flag: 'twemoji:flag-united-kingdom' },
  { code: 'deu', label: 'Deutsch', flag: 'twemoji:flag-germany' }
]

const navLinks = computed(() => [
  { name: t('header.home'), href: '/' },
  { name: t('header.aboutUs'), href: '/#aboutUs' },
  { name: t('header.services'), href: '/#services' },
  { name: t('header.contact'), href: '/#contact' }
])

const projectLinks = [
  { label: t('header.allProjects'), value: 'all' },
  { label: t('header.completedProjects'), value: 'completed' },
  { label: t('header.ongoingProjects'), value: 'ongoing' },
  { label: t('header.newProjects'), value: 'new' }
]

// If you don't want to translate the site into different languages, use it.
// const navLinks = [
//   {
//     name: header.home,
//     href: '/'
//   },
//   {
//     name: header.aboutUs,
//     href: '/#aboutUs'
//   },
//   {
//     name: header.services,
//     href: '/#services'
//   },
//   {
//     name: header.contact,
//     href: '/#contact'
//   }
// ]
// const projectLinks = [
//   {
//     label: header.allProjects,
//     value: 'all'
//   },
//   {
//     label: header.completedProjects,
//     value: 'completed'
//   },
//   {
//     label: header.ongoingProjects,
//     value: 'ongoing'
//   },
//   {
//     label: header.newProjects,
//     value: 'new'
//   }
// ]


// Separate states
const langMenuOpenDesktop = ref(false)
const langMenuOpenMobile = ref(false)

const toggleLangDesktop = () => { langMenuOpenDesktop.value = !langMenuOpenDesktop.value }
const toggleLangMobile = () => { langMenuOpenMobile.value = !langMenuOpenMobile.value }

// If you want to translate the site into different languages, use it.
// const setLanguage = (code) => {
//   locale.value = code
//   langMenuOpenDesktop.value = false
//   langMenuOpenMobile.value = false
// };

const projectMenuOpenMobile = ref(false)

const toggleProjectMobile = () => {
  projectMenuOpenMobile.value = !projectMenuOpenMobile.value
};

</script>


<template>
  <!-- HEADER -->
  <header class="top-0 left-0 w-full z-50 ">
    <div class="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-2">
      <!-- Left Side-->
      <nav class="hidden xl:flex space-x-4 ml-10 text-md font-semibold text-white justify-start">
        <router-link
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          class="hover:text-yellow-400 transition uppercase"
        >
          {{ link.name }}
        </router-link>


        <!-- Desktop Dropdown -->
        <div class="relative group">
          <button class="uppercase hover:text-yellow-400 transition flex items-center">
            {{ t('header.projects') }}
            <Icon icon="mdi:chevron-down" class="w-4 h-4 ml-1" />
          </button>

          <div class="absolute left-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg z-50
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transition-all duration-200">
            <ul class="py-2">
              <li v-for="link in projectLinks" :key="link.value">
                <router-link
                  :to="{ name: 'projects', params: { type: link.value } }"
                  class="block px-4 py-2 hover:scale-102 hover:text-yellow-500"
                >
                  {{ link.label }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <!-- Logo -->
      <div class="flex justify-center md:justify-center flex-1">
        <a href="/" aria-label="Home">
          <img src="/logo/ironcladLogo4.webp" alt="Logo" class="w-40 h-auto md:w-42" />
        </a>
      </div>


      <!-- Right Menu -->
      <div class="flex justify-end items-center space-x-4 md:space-x-6 flex-1">
        <!-- Telephone -->
        <a :href="activePhone.href"
          class="hidden xl:flex items-center bg-yellow-500 text-white px-3 md:px-5 py-2 rounded-full shadow hover:bg-yellow-400 transition-transform transform hover:scale-105">
          <Icon icon="mdi:phone" class="w-5 h-5 mr-2" />
          {{ activePhone.number }}
        </a>

        <!-- Desktop Language Selector -->
        <div class="relative hidden xl:block">
          <button @click="toggleLangDesktop" class="flex items-center bg-gray-800 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition">
            <Icon :icon="languages.find(l => l.code === locale)?.flag" class="w-5 h-5 mr-2" />
            {{ locale.toUpperCase() }}
            <Icon icon="mdi:chevron-down" class="w-4 h-4 ml-1" />
          </button>

          <div v-if="langMenuOpenDesktop" class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <ul class="py-2">
              <li v-for="lang in languages" :key="lang.code" @click="setLanguage(lang.code)" class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800">
                <Icon :icon="lang.flag" class="w-5 h-5 mr-2" />
                {{ lang.label }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>


    <!-- Hamburger Button (mobile) -->
    <button 
      @click="isMenuOpen = !isMenuOpen" 
      class="xl:hidden absolute top-10 right-5 text-white z-50 text-2xl focus:outline-none">
      <Icon :icon="isMenuOpen ? 'mdi:close' : 'mdi:menu'" class="w-11 h-11" />
    </button>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="xl:hidden bg-gray-900 text-white px-6 py-4 space-y-4 mt-12">
      <!-- Links -->
      <div v-for="link in navLinks" :key="link.href">
        <a
          :to="link.href"
          class="block hover:text-yellow-400 transition uppercase"
          @click="closeMenu"
        >
          {{ link.name }}
        </a>
      </div>

      <!-- Projects Dropdown (Mobile) -->
      <div>
        <button
          @click="toggleProjectMobile"
          class="flex items-center w-full text-white uppercase px-3 py-2 hover:text-yellow-400 transition"
        >
          {{ t('header.projects') }}
          <Icon icon="mdi:chevron-down" class="w-4 h-4 ml-1" />
        </button>

        <div v-if="projectMenuOpenMobile" class="pl-4 mt-2 space-y-1">
          <div v-for="link in projectLinks" :key="link.value">
            <router-link
              :to="{ name: 'projects', params: { type: link.value } }"
              class="block hover:text-yellow-400 transition"
              @click="closeMenu"
            >
              {{ link.label }}
            </router-link>
          </div>
        </div>
      </div>


      <!-- Telephone -->
      <div class="pt-4">
        <a :href="activePhone.href" class="flex items-center text-yellow-400 hover:text-yellow-500 transition">
          <Icon icon="mdi:phone" class="w-5 h-5 mr-2" /> {{ activePhone.number }}
        </a>
      </div>

      <!-- Mobil Language Selectors -->
      <div class="pt-4">
        <button
          @click="toggleLangMobile"
          class="flex items-center w-full bg-gray-800 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition"
        >
          <Icon :icon="languages.find(l => l.code === locale)?.flag" class="w-5 h-5 mr-2" />
          {{ languages.find(l => l.code === locale)?.label }}
          <Icon icon="mdi:chevron-down" class="w-4 h-4 ml-1" />
        </button>

        <div v-if="langMenuOpenMobile" class="mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <ul class="py-2">
            <li v-for="lang in languages" :key="lang.code" @click="setLanguage(lang.code)"
              class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800"
            >
              <Icon :icon="lang.flag" class="w-5 h-5 mr-2" />
              {{ lang.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>


  </header>
</template>
