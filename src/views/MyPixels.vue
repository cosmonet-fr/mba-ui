<script setup>
import { ref, onMounted } from 'vue'
import NavMyAccount from '../components/NavMyAccount.vue';
import { useAuthStore } from '@/stores/auth'


const authStore = useAuthStore();

const myData = ref([]);

const idUser = sessionStorage.getItem('id')
const token = sessionStorage.getItem('token')

if (token) {
    const headers = {
        Authorization: `Bearer ${token}`
    }

    fetch(`${import.meta.env.VITE_HOST_API}/wall/${idUser}`, { headers })
        .then(response => response.json())
        .then(data => {
            // Convertir les valeurs de forSale en booléen et ajouter la propriété message
            myData.value = data.map(item => ({
                ...item,
                forSale: item.forSale === 1 ? true : false,
                message: "" // Initialiser la propriété message à une chaîne vide
            }))
        })
        .catch(error => {
            console.error('Error fetching user:', error)
        })
}

onMounted(() => {
    if (myData.value !== null) {
        myData.value.forEach(item => {
            item.forSale === 1 ? (item.forSale = true) : (item.forSale = false)
        })
    }
})


function getBackgroundColor(pixel) {
    if (pixel.transactionInProgress) {
        return '#FDD835';
    } else if (pixel.forRent) {
        return '#FF69B4'
    } else if (pixel.forSale) {
        return '#2196F3';
    } else {
        return '#c2185b';

    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}


authStore.authChecker();
</script>

<template>
    <NavMyAccount></NavMyAccount>
    <div class="page">
        <div v-if="myData.length > 0" >
            <div class="item-box" v-for="item in myData" :key="item.numbers">
                <div class="item">
                    <div class="date"  >
                    </div>
                    <div class="icon" :style="{background: getBackgroundColor(item)}">
                        <img :src="item.icons" :alt="item.numbers || item.pixelId  " v-if="item.icons">
                    </div>
                    <div>
                        <p>number: {{ item.numbers || item.pixelId }}</p>
                    </div>
                    <RouterLink :to="`/my-pixels/${item.numbers  }`" class="myMenu" v-if="item.pixel_id">
                        <button>Edit</button>
                    </RouterLink>
                    <RouterLink :to="`/my-pixels/${item.numbers  }`" class="myMenu" v-else>
                        <button>000</button>
                    </RouterLink>
                </div>
                <p class="text-loc" v-if="item.pixelId">You have this pixel for rent until {{ formatDate(item.end) }}</p>
            </div>
        </div>
        <div v-else >
            <h1>Currently you have no pixels</h1>
        </div>
    </div>
</template>

<style scoped lang="scss" >
.item-box {
    background-color: #1f1e24;

}
.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    margin: .5em 0;
}
.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    img {
        width: 32px;
    }
}
button {
    //height: 32px;
    font-size: 1rem;
    margin: 0!important;
}
.text-loc{
    padding: 3px;
    font-size: .8em;
    text-align: center;
    background-color: #FF69B4;

}

</style>