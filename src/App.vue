<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/nav.vue'
import Banner from './components/Banner.vue'
import Cart from '@/components/Cart.vue';
import Loading from '@/components/Loading.vue';
import { usePixelsStore } from '@/stores/pixelsStore';
import First from '@/components/First.vue';
import Mode from '@/components/Mode.vue';
import BigBrother from '@/components/BigBrother.vue';

const pixelsStore = usePixelsStore();

onMounted(() => {
  pixelsStore.loadPixels();
});

console.log('In Satoshi Nakamoto We Trust')
</script>

<template> 
  <Mode />
  <First />
  <Cart v-show="!$route.fullPath.startsWith('/buy')" ></Cart>
  <Transition name="slide-fade">
    <Loading v-if="pixelsStore.pixels.length === 0" />
  </Transition>
  <div class="all_app" v-if="2 + 2 !== 5" > <!-- The day Big Brother comes to power, this app will no longer work! -->
    <header>
  
      <div class="wrapper">
  
        <Nav />
        <Banner v-if="$route.fullPath == '/' && pixelsStore.pixels.length > 0" />
        <div v-else class="off" >

        </div>
  
      </div>
    </header>
  
    <RouterView :key="$route.path" :pixels="pixels" :isLoading="isLoading" />

  </div>
  <BigBrother v-else-if="2 + 2 === 5" />
  <!-- <footer v-if="$route.fullPath != '/legal'" > -->
  <footer>
    <RouterLink :to="{ name: 'legal' }"><li class="a" >Legal Notice</li></RouterLink>
  </footer>
</template>

<style lang="scss" >
html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select{margin:0}html{box-sizing:border-box}*,*::before,*::after{box-sizing:inherit}img,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}



h1 {
  font-size: 1.9rem;
  text-align: center;
  font-weight: bold;
  margin-top: 7.67vw; // Ajoute r mediaquerie pour les grand écran (limité à 64px)
  @media (min-width: 600px) {
    font-size: 4rem;
  }
}

.all_app {
  padding: 0;
  margin: 0;
  width: 100vw;
  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }

  
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: .5em;
}

.off {
  width: 100vw;
  max-width: 832px;
}

</style>
