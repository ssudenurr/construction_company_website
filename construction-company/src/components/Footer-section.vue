<script setup>
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { computed, watchEffect } from 'vue'
const { t, locale } = useI18n()

const savedLang = localStorage.getItem('lang') || 'en'
locale.value = savedLang

// Phone Numbers
const phoneNumbers = {
  tr: { number: '+90 (555) 111-22-33', href: 'tel:+905551112233' },
  en: { number: '+44 20 7946 0958', href: 'tel:+442079460958' },
  deu: { number: '+49 30 123456', href: 'tel:+4930123456' }
}

// Active phone number based on selected language
const activePhone = computed(() => phoneNumbers[locale.value] || phoneNumbers.tr)

// Save selected language
watchEffect(() => {
    localStorage.setItem('lang', locale.value)
});

</script>

<template>
  <!-- FOOTER -->
  <footer class="bg-gray-900 text-gray-300 py-16">
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-center gap-12">

      <!-- Logo & Social -->
      <div class="flex flex-col items-center md:w-1/3">
        <img src="@/assets/logo/ironcladLogo4.png" alt="ironclad Logo" class="h-40 mb-4"/>
        <div class="flex space-x-4 mt-6">
          <a href="#" class="text-yellow-500 hover:text-white transition"><Icon icon="mdi:facebook" class="w-6 h-6"/></a>
          <a href="#" class="text-yellow-500 hover:text-white transition"><Icon icon="mdi:instagram" class="w-6 h-6"/></a>
          <a href="#" class="text-yellow-500 hover:text-white transition"><Icon icon="mdi:linkedin" class="w-6 h-6"/></a>
        </div>
      </div>

    <!-- Contact Info -->
    <div class="md:w-1/3 flex flex-col items-center text-center">
      <h3 class="font-extrabold text-lg mb-6 text-yellow-500 tracking-wide uppercase">{{ t('footer.contact') }}</h3>
      <ul class="space-y-6 text-sm">
        <!-- Phone -->
        <li class="flex items-center justify-center space-x-2">
        <Icon icon="mdi:phone" class="w-6 h-6 text-yellow-500"/>
        <a :href="activePhone.href" class="font-semibold hover:text-yellow-500 transition">{{ activePhone.number }}</a>
        </li>

        <!-- Email -->
        <li class="flex items-center justify-center space-x-2">
            <Icon icon="mdi:email" class="w-6 h-6 text-yellow-500 mb-1"/>
            <a href="mailto:info@insaatco.com" class="font-semibold hover:text-yellow-500 transition">info@ironclad.com</a>
        </li>

        <!-- Address -->
        <li class="flex items-center justify-center space-x-2">
            <Icon icon="mdi:map-marker" class="w-6 h-6 text-yellow-500 mb-1"/>
            <span class="font-semibold hover:text-yellow-500 transition cursor-pointer">New York, USA</span>
        </li>
      </ul>
    </div>


      <div class=" flex md:w-1/3 text-md text-gray-300 text-center">
        <h1 class="font-bold mr-3"> © 2025 IRONCLAD.</h1> {{ t('footer.rightsReserved') }}.
      </div>

    </div>
  </footer>
</template>
