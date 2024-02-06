<script setup>
import { ref, onMounted } from 'vue'
import NavMyAccount from '../components/NavMyAccount.vue';
import { useAuthStore } from '@/stores/auth'

const history = ref(false)
const authStore = useAuthStore();

const MyData = ref([]);

const idUser = sessionStorage.getItem('id')
const token = sessionStorage.getItem('token')

if (token) {
    const headers = {
        Authorization: `Bearer ${token}`
    }

    fetch(`${import.meta.env.VITE_HOST_API}/transactions/shopping-list/${idUser}`, { headers })
        .then(response => response.json())
        .then(data => {
            // Convertir les valeurs de forSale en booléen et ajouter la propriété message
            MyData.value = data.map(item => ({
                ...item,
                forSale: item.forSale === 1 ? true : false,
                message: "" // Initialiser la propriété message à une chaîne vide
            }))
        })
        .catch(error => {
            console.error('Error fetching user:', error)
        })
}
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

authStore.authChecker();
</script>
<template>
    <NavMyAccount></NavMyAccount>
    <div class="page" >
        <div v-if="MyData.length > 0" >
            <div v-show="!history" >
                <h1>Purchase in progress</h1>
                <div v-for="item in MyData" >
                    <div v-if="item.status == 0" >
                        <p>
                            You have started purchasing pixel {{ item.pixelId }}, send {{ item.amountExpected }} STSH to the address <em>{{ item.btcAddress }}</em> to finalize your purchase.
                        </p>
                    </div>
                </div>
                <button @click="history = !history" >see history</button>

            </div>
            <div v-show="history" >
                <h1>Past purchase</h1>
                <div v-for="item in MyData" >
                    <div v-if="item.status != 0" >
                        <p>{{ formatDate(item.createdAt) }} {{ item.amountExpected }} S <span v-if="item.status == 2" >confirmed</span> <span v-if="item.status == 1" >canceled</span> </p>
                    </div>
                </div>
                <button @click="history = !history" >view current transactions</button>
            </div>
        </div>
        <div v-else >
            <h1>You haven't purchased pixels yet</h1>
        </div>
    </div>

</template>

<style lang="scss" scoped>
p {
    margin: 1em 0;
    em {
        font-weight: bold;
        color: #2094f0;
    }
}
</style>