<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { usePixelsStore } from '@/stores/pixelsStore';
import { useCartStore } from '@/stores/cart';
import LoadingMore from '@/components/LoadingMore.vue';

const pixelsStore = usePixelsStore();
const cartStore = useCartStore();
const loadingMoreRef = ref(null);

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 15) { // Si proche du bas
    pixelsStore.loadMorePixels();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});



function selectPix(pixel) {
  if (pixel.transactionInProgress == 1) {
    alert('A transaction is already in progress. Choose another pixel');
  } else {
    if (pixel.forSale == 1 && pixel.urls != null) {
      cartStore.addToCart(pixel);
    } else if (pixel.forSale == 1 && pixel.urls == null) {
      cartStore.addToCart(pixel);
    } else if (pixel.forSale == 0 && pixel.urls != null) {
      window.location.href = pixel.urls;
    } else {
      alert('Sorry, this pixel is not for sale.');
    }
  }
}

function isPixelInCart(pixelId) {
  return cartStore.cart.some(item => item.id === pixelId);
}

function getBackgroundColor(pixel) {
  if (pixel.transactionInProgress) {
    return '#FDD835';
  }
  if (pixel.forSale) {
    if (pixel.specificity === 'bronze') {
      return '#cd7f32';
    } else if (pixel.specificity === 'silver') {
      return '#f5f5f5';
    } else if (pixel.specificity === 'gold') {
      return '#ffd700';
    } else if (pixel.specificity === 'diamond') {
      return '#00ffff';
    } else {
      return pixel.user.pseudonym == 'eos' ? '#4CAF50' : '#2196F3';
    }
  }
}
</script>

<template>
  <div class="wallContainer">
    <div class="wall">
      <div class="pixels nopic" v-for="pixel in pixelsStore.pixels" :key="pixel.numbers"
        :class="{ added: isPixelInCart(pixel.numbers) }" :style="{ background: getBackgroundColor(pixel) }"
        @click="selectPix(pixel)">
        <img v-if="pixel.icons !== null" :src="pixel.icons" :alt="pixel.numbers">
        <!-- <img v-else src="@/assets/cadre.webp" alt="cadre"> -->
        <img v-else class="dotted" src="@/assets/dotted.svg" alt="cadre">
      </div>
    </div>
    <LoadingMore ref="loadingMoreRef" />
  </div>
</template>



<style scoped lang="scss">

.wall {
  width: 100vw;
  max-width: 832px;
  display: flex;
  flex-wrap: wrap;
  
}

.pixels {
  width: 7.67vw;
  height: 7.67vw;
  max-width: 64px;
  max-height: 64px;
}


</style>
