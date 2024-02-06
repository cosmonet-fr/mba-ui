<script setup>
import Wall from '../components/Wall.vue'
defineProps({
  pixels: Array,
  isLoading: Boolean
})
</script>

<template>
  <main>
    <Wall :pixels="pixels" :isLoading="isLoading" />
  </main>
</template>
