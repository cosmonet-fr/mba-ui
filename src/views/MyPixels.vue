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
    } else if (pixel.forSale) {
        return '#2196F3';
    } else {
        return '#c2185b';

    }
}

authStore.authChecker();
</script>

<template>
    <NavMyAccount></NavMyAccount>
    <div class="page">
        <div v-if="myData.length > 0" >
            <div class="item" v-for="item in myData" :key="item.numbers">
                <div class="icon" :style="{background: getBackgroundColor(item)}">
                    <img :src="item.icons" :alt="item.numbers" v-if="item.icons">
                </div>
                <p>number: {{ item.numbers }}</p>
                <RouterLink :to="`/my-pixels/${item.numbers}`" class="myMenu">
                    <button>Edit</button>
                </RouterLink>
            </div>
        </div>
        <div v-else >
            <h1>Currently you have no pixels</h1>
        </div>
    </div>
</template>

<style scoped lang="scss" >

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    margin: .5em 0;
    background-color: #1f1e24;
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

</style>