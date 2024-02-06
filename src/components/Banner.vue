<script setup>
import { ref } from 'vue'
import BannerPic from '../assets/BannerPic.vue';

const count = ref(16);
const banners = ref(null)
fetch(`${import.meta.env.VITE_HOST_API}/banners`)
    .then(response => response.json())
    .then(data => {
        banners.value = data;
    })
    .catch(error => {
        console.error('Error fetching pixels:', error);
    });

function decrementCounter() {
    setInterval(() => {
        if (count.value > 1) {
            count.value--;
        } else {
            count.value = 16;
        }
    }, 1000);
}

decrementCounter();
</script>

<template>
    <div class="bannerContainer" v-if="banners" >
        <!-- <Transition name="bounce"> -->
            <div id="banner4" class="banner" v-show="count > 0 && count < 5" >
                <div v-if="banners[3].banner" >
                    <BannerPic :url="banners[3].banner" :link="banners[3].link" />
                </div>
                <div v-else>
                        <h2>
                            And resell your plot on the secondary market at the price of your choice !
                        </h2>
                </div>
            </div>

        <!-- </Transition>
        <Transition name="bounce"> -->
            <div id="banner3" class="banner" v-show="count > 4 && count < 9" >
                <div v-if="banners[2].banner" >
                    <BannerPic :url="banners[2].banner" :link="banners[2].link" />
                </div>
                <div v-else>
                        <h2>
                            Communicate with your image and your link !
                        </h2>
                </div>
            </div>

        <!-- </Transition>
        <Transition name="bounce"> -->
            <div id="banner2" class="banner" v-show="count > 8 && count < 13" >
                <div v-if="banners[1].banner" >
                    <BannerPic :url="banners[1].banner" :link="banners[1].link" />
                </div>
                <div v-else>
                        <h2>
                            Buy your pixel plots !
                        </h2>
                </div>
            </div>

        <!-- </Transition>
        <Transition name="bounce"> -->
            <div id="banner1" class="banner" v-show="count > 12 && count < 17" >
                <div v-if="banners[0].banner" >
                    <BannerPic :url="banners[0].banner" :link="banners[0].link" />
    
                </div>
                <div v-else>
                    <h1>
                        The Million Bitcoin App !
                    </h1>
                    <h2>
                        In Satoshi Nakamoto We Trust
                    </h2>
                </div>
            </div>

        <!-- </Transition> -->
    </div>

</template>

<style lang="scss" scoped>
h2 {
    @media (min-width: 600px) {
        font-size: 2rem;
    }
}
.bannerContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    width: 100vw;
    height: 50.33vw;
    max-width: 832px;
    max-height: 424px;
    //height: 180px;
    //background: black;
    @media (max-width: 800px) { 
        padding: 7.5vw 0 0 0;

     }
     @media (min-width: 801px) { 
        padding: 64px 0 0 0;

     }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
// .bounce-leave-active {
//   animation: bounce-in 0.5s reverse;
// }
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>