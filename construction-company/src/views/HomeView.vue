<template>
  <div class="">

    <div class="h-screen w-full aspect-[16/9] bg-black/50 bg-cover bg-center" 
        :style="{ backgroundImage: `url(${heroImg})` }">
      <Header />
      <Hero/>
    </div>
    <AboutUs />
    <OurServices />
    <Projects />
    <Cta />
    <Contact v-if="showContact" />
    <Footer v-if="showFooter" />
    <scrollTop />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Header from '../components/Header-section.vue'
import Hero from '../components/Hero-section.vue'
import Cta from '@/components/Cta-section.vue'; 
import Contact from '@/components/Contact-section.vue';
import Footer from '@/components/Footer-section.vue';
import Projects from '@/components/Projects-section.vue';
import OurServices from '@/components/Our-services.vue';
import AboutUs from '@/components/About-us.vue';
import scrollTop from '@/components/scroll-top.vue';

import 'aos/dist/aos.css'; 
import Aos from 'aos';

const heroImg = '/images/construction2.webp';


const showFooter = ref(false);
const showContact = ref(false);

onMounted(() => {
  setTimeout(() => Aos.init({ duration: 1000 }), 0); 

  showContact.value = true;
  showFooter.value = true;
});
</script>
