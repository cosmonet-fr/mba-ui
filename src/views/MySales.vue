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

    fetch(`${import.meta.env.VITE_HOST_API}/transactions/sales-list/${idUser}`, { headers })
        .then(response => response.json())
        .then(data => {
            // Convertir les valeurs de forSale en booléen et ajouter la propriété message
            myData.value = data.map(item => ({
                ...item,
                forSale: item.forSale === 1 ? true : false,
                message: "",
                apiResponse: "" 
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

const confirmOrCanceled = async (option, id, index) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST_API}/transactions/${option}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ transactionId: id })
        });
        const result = await response.json();
        myData.value[index].apiResponse = result.message;

        if (response.ok) {
            myData.value[index].status = option === 'confirm' ? 2 : 1; // Mettre à jour le statut
        }
    } catch (error) {
        console.error('Error:', error);
        myData.value[index].apiResponse = "An error occurred.";
    }
};

const check = (address) => {
    window.open(`https://live.blockcypher.com/btc/address/${address}`, '_blank');
};

authStore.authChecker();
</script>

<template>
    <NavMyAccount></NavMyAccount>
    <div class="page">
        <!-- Affichage des ventes en cours -->
        <div v-if="myData.length > 0">
            <h2>Current sales:</h2>
            <div v-for="(item, index) in myData" :key="index">
                <div class="current" v-if="item.status === 0">
                    <p>Pixel N° {{ item.pixelId }}</p>
                    <p>ID : {{ item.id }}</p>
                    <p>Date : {{ formatDate(item.createdAt) }}</p>
                    <p>Price : {{ item.amountExpected }} S</p>
                    <p>Address : {{ item.btcAddress }}</p>
                    <button @click="check(item.btcAddress)">
                        Verify transaction on blockcypher
                    </button>
                    <!-- Afficher les boutons uniquement si la transaction est en attente -->
                    <button v-if="!item.apiResponse" @click="confirmOrCanceled('confirm', item.id, index)">Confirm the
                        transaction</button>
                    <button v-if="!item.apiResponse" @click="confirmOrCanceled('cancel', item.id, index)">Cancel the
                        transaction</button>
                    <!-- Afficher le message de retour de l'API -->
                    <p v-if="item.apiResponse">{{ item.apiResponse }}</p>
                </div>
            </div>
            <!-- Historique des ventes -->
            <h2>Sales history:</h2>
            <div v-for="(item, index) in myData" :key="index">
                <div v-if="item.status !== 0">
                    <p>{{ formatDate(item.createdAt) }} - {{ item.amountExpected }} S - <span
                            v-if="item.status === 2">Confirmed</span><span v-if="item.status === 1">Canceled</span></p>
                </div>
            </div>
        </div>
        <!-- Message si aucune vente n'est enregistrée -->
        <div v-else>
            <h1>You haven't sold any pixels yet</h1>
        </div>
    </div>
</template>


<style scoped lang="scss" >
.current {
    background: #1f1e24;
    margin: 5px 0;
    padding: 8px;
    border-radius: 5px;
}
</style>