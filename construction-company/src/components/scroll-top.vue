5<script setup>
import { ref,onMounted, } from 'vue'
import { Icon } from '@iconify/vue';
const isVisible = ref(false);

const handleScroll = () =>{
    isVisible.value = window.scrollY > 300;
}
const scrollToTop = ()  => {
    window.scrollTo({top:0, behavior:'smooth'});
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

</script>
<template>
    <button v-show="isVisible" @click="scrollToTop" 
    class="fixed bottom-4 right-4 bg-yellow-600 text-white p-2 rounded-full hover:scale-110 active:scale-88 transition-transform duration-400 shadow-3xl z-50">
        <Icon icon="mdi:arrow-up" class="w-6 h-6"/>
    </button>
</template>