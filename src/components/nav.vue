<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useDropdownFunctions } from '@/stores/dropdownFuctions';
import DropDown from '@/components/dropdown.vue';
import DropDownUser from '@/components/dropdownUser.vue';

const pixels = ref([])
const cartStore = useCartStore();
const dropdownFunctions = useDropdownFunctions();
// const dropDown = ref(false)
// const dropDownUser = ref(false)

fetch(`${import.meta.env.VITE_HOST_API}/wall/nav`)
  .then(response => response.json())
  .then(data => {
    pixels.value = data
  })
  .catch(error => {
    console.error('Error fetching pixels:', error)
  })

function selectPix(pixel) {  //// Code dupliqué !!!
  if (pixel.transactionInProgress == 1) {
    alert('A transaction is already in progress. Choose another pixel');
  } else {
    if (pixel.forSale == 1 && pixel.urls != null) {
      // popin
      cartStore.addToCart(pixel); // Utilisez la fonction addToCart de Pinia
    } else if (pixel.forSale == 1 && pixel.urls == null) {
      cartStore.addToCart(pixel);
    } else if (pixel.forSale == 0 && pixel.urls != null) {
      window.location.href = pixel.urls;
    } else {
      alert('Sorry, this pixel is not for sale.');
    }
  }
} 

  function isPixelInCart(pixelId) { //duplication code
  return cartStore.cart.some(item => item.id === pixelId); // Utilisez cart de Pinia
}

function getBackgroundColor(pixel) {  //duplication code
  if (pixel.transactionInProgress) {
    return '#FDD835';
  }
  if (pixel.forSale) {
    return pixel.user.pseudonym == 'eos' ? '#4CAF50' : '#2196F3';
  }
  return ''; // ou une couleur par défaut
}

function userLoggedIn() {
  return !!sessionStorage.getItem("token");
}

function handleUserIconClick() {
  if (userLoggedIn()) {
    dropdownFunctions.getDropDownUser();
  } else {
    dropdownFunctions.directToLogin();
  }
}
function handleIconClick() {
  dropdownFunctions.getDropDown();
  
}
function myAltert(text) {
  alert(text)
}
</script>

<template>
  <DropDown v-show="dropdownFunctions.dropDown"></DropDown>
  <DropDownUser v-if="dropdownFunctions.dropDownUser"></DropDownUser>
  <nav>
    <div class="pixels" v-for="(pixel, index) in pixels" :key="index" :class="{ added: isPixelInCart(pixel.numbers) }"
      :style="{
        background: getBackgroundColor(pixel)
      }" @click="selectPix(pixel)">
      <img v-if="pixel.icons !== null" :src="pixel.icons" :alt="pixel.numbers">
      <!-- <img v-else src="@/assets/cadre.webp" alt="cadre"> -->
      <img v-else class="dotted" src="@/assets/dotted.svg" alt="cadre">

      <!-- <p v-if="pixel.forSale && !pixel.transactionInProgress" > For <br> Sale </p> -->
    </div>
    <div class="pixels pixels-menu" @click="handleUserIconClick"><img src="@/assets/user-solid.svg" alt=""></div>
    <div class="pixels pixels-menu"
      @click="myAltert('The filter feature is not yet available in the Alpha3 version. This feature allows you to filter the pixels according to their states (for sale, for rent, my pixels)')"
      style="cursor: help;">
      <img src="@/assets/filter-solid-in.svg" alt="">
    </div>
    <RouterLink to="/blog">
      <div class="pixels pixels-menu"><img src="@/assets/newspaper-regular.svg" alt=""></div>
    </RouterLink>
    <div class="pixels pixels-menu" @click="handleIconClick"><img src="@/assets/bars-solid.svg" alt=""></div>
  </nav>

</template>

<style scoped lang="scss" >
nav {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    z-index: 2001;
    position: fixed;
    top:0;
    background: #1f1e24;

}


.pixels-menu {
  background: none;
  //background: #2196F3;
  transform: scale(0.98);
  img {
    width: 5vw;
    height: 5vw;
    @media (min-width: 800px) { 
      max-width: 41px;
      max-height: 41px;
      
    }
    //margin: 2px;
  }
}

.pixels {
  width: 7.67vw;
  height: 7.67vw;
  max-width: 64px;
  max-height: 64px;
}

</style>