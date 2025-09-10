<template>
  <div class="">

  <div class="h-screen bg-cover bg-center"
  :style="{ backgroundImage: `url(${heroImg})` }" >
    <Header class="bg-black/50" />
    <Hero />
  </div>
    <AboutUs />
    <OurServices />
    <Projects />
    <Cta />
    <Contact />
    <Footer />
    <scrollTop />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Header from '../components/Header-section.vue'
import Hero from '../components/Hero-section.vue'
import Cta from '@/components/Cta-section.vue'; 
import Contact from '@/components/Contact-section.vue';
import Footer from '@/components/Footer-section.vue';
import Projects from '@/components/Projects-section.vue';
import OurServices from '@/components/Our-services.vue';
import AboutUs from '@/components/About-us.vue';
import scrollTop from '@/components/scroll-top.vue';

import Aos from 'aos';
import 'aos/dist/aos.css';
import heroImg from '@/assets/images/construction2.png';

onMounted(() => {
  Aos.init();
});

</script>
