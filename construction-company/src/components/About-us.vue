<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

</script>
<template>
  <section class="relative bg-white py-20" id="aboutUs">
    <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-28 px-8 items-center">
      <!-- Left side -->
      <div class="relative">
        <img 
          src="/images/construction4.webp" 
          alt="İronclad Construction Team at Work"
          class="rounded-lg shadow-lg"
          data-aos="fade-down-right"
        />
      </div>

      <!-- Right side -->
      <div data-aos="fade-up-left" data-aos-duration="1000">
        <p class="text-yellow-600 font-bold uppercase tracking-wide">Ironclad {{t('aboutUs.construction')}}</p>
        <h2 class="text-4xl font-extrabold text-gray-900 mt-2 mb-6">{{ t('aboutUs.title') }}</h2>

        <p class="text-gray-700 leading-relaxed mb-4" v-html="t('aboutUs.paragraph1')"></p>
        <p class="text-gray-700 leading-relaxed mb-6" v-html="t('aboutUs.paragraph2')"></p>
        <p class="text-gray-700 leading-relaxed mb-6" v-html="t('aboutUs.paragraph3')"></p>
        <!-- Number box -->
        <div class="flex items-center mt-8">
          <div class="border-4 border-yellow-500 px-6 py-4 text-center">
            <span class="text-4xl font-extrabold text-gray-900">15</span>
          </div>
          <span class="ml-4 text-xl font-medium text-gray-800">{{t('aboutUs.yearsOfExperience')}}</span>
        </div>
      </div>
    </div>
  </section>
</template>
