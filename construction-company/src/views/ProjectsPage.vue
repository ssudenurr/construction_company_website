<template>
  <div>
    <HeaderSection class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-3xl" />
    <ProjectsList :type="$route.params.type" />  <!-- Pass the type param to filter projects -->
  </div>
</template>

<script setup>
import ProjectsList from '@/components/ProjectList.vue'
import HeaderSection from '@/components/Header-section.vue';
</script>
