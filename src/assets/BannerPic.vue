<script setup>
import { ref } from 'vue'

defineProps({
    url: String,
    linke: String,
    h1: String,
    text: String
})

</script>

<template>
    <img :src="url" :alt="h1">

</template>

<style lang="scss" scoped>
img {
    width: 100vw;
    max-width: 832px;
}

</style>