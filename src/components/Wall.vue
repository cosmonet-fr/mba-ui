<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { usePixelsStore } from '@/stores/pixelsStore';
import { useCartStore } from '@/stores/cart';
import LoadingMore from '@/components/LoadingMore.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const pixelsStore = usePixelsStore();
const cartStore = useCartStore();
const loadingMoreRef = ref(null);
const showRentModal = ref(false);
const modalPixel = ref(null)

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
    if (pixel.forSale == 1) {
      cartStore.addToCart(pixel);
    } else if (pixel.forSale == 1 && pixel.urls == null && !pixel.forRent) {
      cartStore.addToCart(pixel);
    } else if (pixel.forSale == 0 && pixel.urls != null && !pixel.forRent) {
      window.location.href = pixel.urls;
    } else if (pixel.forSale == 0 && pixel.urls == null && pixel.forRent) {
      router.push(`/rent/${pixel.numbers}/${pixel.prices}`)
    } else if (pixel.forSale == 0 && pixel.urls != null && pixel.forRent) {
      // Modal
      getChois(pixel)
    } else {
      alert('Sorry, this pixel is not for sale.');
    }
  }
}

function getChois(pixel) {
  showRentModal.value = true
  modalPixel.value = pixel
}

function rentPlot() {
  router.push(`/rent/${modalPixel.value.numbers}/${modalPixel.value.prices}`);
  showModal.value = false;
}

function visitLink() {
  window.location.href = modalPixel.value.urls;
  showModal.value = false;
}

function isPixelInCart(pixelId) {
  return cartStore.cart.some(item => item.id === pixelId);
}

function getBackgroundColor(pixel) {
  //Loc => #6aa8f8
  if (pixel.forRent) {
    return '#FF69B4';
  }
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
  <div class="modal_contenaire" v-if="showRentModal" @click="showRentModal = false">
    <div class="modal">
      <h1>
        What do you want to do ?
      </h1>
      <p>
        This parcel of pixels is for rent and offers a hyperlink. What do you want to do ?
      </p>
      <div class="dashModal" >
        <button @click="visitLink">Visit the link</button>
        <button @click="rentPlot">Rent the plot</button>
      </div>
    </div>
  </div>
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

.dashModal {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  button {
    font-size: 1rem;
  }
}


</style>
