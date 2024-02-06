<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { usePixelsStore } from '@/stores/pixelsStore';

const pixelsStore = usePixelsStore();


</script>

<template>
    <div class="loadingMore" >
        <img src="../assets/loading.svg" alt="Now Loading" v-if="pixelsStore.isLoading" >
        <p v-if="pixelsStore.isLoading" >Loading</p>

    </div>
</template>

<style lang="scss" scoped>
.loadingMore {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 37vw;
        height: 37vw;
    }
}
</style>