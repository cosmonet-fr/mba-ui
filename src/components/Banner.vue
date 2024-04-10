<script setup>
import { ref, onMounted } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import BannerPic from '../assets/BannerPic.vue';
import { RouterLink } from 'vue-router';

const banners = ref([]);

onMounted(() => {
    fetch(`${import.meta.env.VITE_HOST_API}/banners`)
        .then(response => response.json())
        .then(data => {
            banners.value = data;
        })
        .catch(error => {
            console.error('Error fetching banners:', error);
        });
});
</script>

<template>
    <div class="bannerContainer" v-if="banners.length">
        <Splide
            :options="{ type: 'loop', autoplay: true, interval: 4000, pauseOnHover: false, arrows: false, pagination: false }">
            <SplideSlide>
                <div v-if="banners.length > 0 && banners[0].banner">
                    <BannerPic :url="banners[0].banner" :link="banners[0].link" />
                </div>
                <div class="else" v-else>
                    <h1>The Million Bitcoin App !</h1>
                    <h2>In Satoshi Nakamoto We Trust</h2>
                    <!-- <RouterLink>Buy this banner with pixel #20280</RouterLink> -->
                    <RouterLink :to="{
                        name: 'buy',
                        params: {
                            arrayId: JSON.stringify([{ id: 20280, price: 33554432000 }])
                        }
                    }">
                        <li class="a">Buy this banner with pixel #20280</li>
                    </RouterLink>

                </div>
            </SplideSlide>
            <SplideSlide>
                <div v-if="banners.length > 1 && banners[1].banner">
                    <BannerPic :url="banners[1].banner" :link="banners[1].link" />
                </div>
                <div class="else" v-else>
                    <h2>Buy your pixel plots !</h2>
                    <RouterLink :to="{
                        name: 'buy',
                        params: {
                            arrayId: JSON.stringify([{ id: 12174, price: 32768000 }])
                        }
                    }">
                        <li class="a">Buy this banner with pixel #12174</li>
                    </RouterLink>
                </div>
            </SplideSlide>
            <SplideSlide>
                <div v-if="banners.length > 2 && banners[2].banner">
                    <BannerPic :url="banners[2].banner" :link="banners[2].link" />
                </div>
                <div class="else" v-else>
                    <h2>Communicate with your image and your link !</h2>
                    <RouterLink :to="{
                        name: 'buy',
                        params: {
                            arrayId: JSON.stringify([{ id: 8116, price: 1024000 }])
                        }
                    }">
                        <li class="a">Buy this banner with pixel #8116</li>
                    </RouterLink>
                </div>
            </SplideSlide>
            <SplideSlide>
                <div v-if="banners.length > 3 && banners[3].banner">
                    <BannerPic :url="banners[3].banner" :link="banners[3].link" />
                </div>
                <div class="else" v-else>
                    <h2>And resell your plot on the secondary market at the price of your choice !</h2>
                    <RouterLink :to="{
                        name: 'buy',
                        params: {
                            arrayId: JSON.stringify([{ id: 4058, price: 32000 }])
                        }
                    }">
                        <li class="a">Buy this banner with pixel #4058</li>
                    </RouterLink>
                </div>
            </SplideSlide>
        </Splide>
    </div>
</template>

<style lang="scss" scoped>
h1 {
    margin: 0;
}

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

.splide__slide {
    width: 100vw;
    max-width: 832px;
    // background: red;
    min-height: 165px;
    height: 43.1vw;
    max-height: 360px;
    display: flex;
    justify-content: center;
    align-items: center;
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
.else {
    width: 100%;
}
.a{
    position: fixed;
    bottom: 0;
    // left: 0;
    width: 500px;
    text-align: left;
}
</style>