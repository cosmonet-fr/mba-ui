<script setup>
import { ref, onMounted } from 'vue'
import NavMyAccount from '../components/NavMyAccount.vue';
import { useAuthStore } from '@/stores/auth'


const authStore = useAuthStore();

const inProgress = ref([]);
const historical = ref([]);

const idUser = sessionStorage.getItem('id')
const token = sessionStorage.getItem('token')

if (token) {
    const headers = {
        Authorization: `Bearer ${token}`
    }

    fetch(`${import.meta.env.VITE_HOST_API}/loc/${idUser}`, { headers })
        .then(response => response.json())
        .then(data => {
            inProgress.value = data.inProgress
            historical.value = data.historical
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
        const response = await fetch(`${import.meta.env.VITE_HOST_API}/loc/${option}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ locId: id })
        });
        const result = await response.json();
        if (response.ok) {
            // Mettre à jour le statut localement et obtenir une copie de l'élément
            const updatedStatus = option === 'confirm' ? 2 : 1;
            const updatedItem = { ...inProgress.value[index], status: updatedStatus, apiResponse: result.message };

            // Ajouter à historical
            historical.value.push(updatedItem);

            // Retirer de inProgress
            inProgress.value.splice(index, 1);
        } else {
            myData.value[index].apiResponse = result.message;
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

        <div class="sale" v-if="inProgress.length > 0 || historical.length > 0">
            <div class="inProgress" v-if="inProgress.length > 0">
                <h1>Current sales:</h1>
                <div v-for="(item, index) in inProgress" :key="index">
                    <div class="current" v-if="item.status === 0">
                        <p>
                            Pixels N° {{ item.pixelID }}
                        </p>
                        <p>Date : {{ formatDate(item.createdAt) }}</p>
                        <p>Price : {{ item.amountExpected }} STSH</p>
                        <button @click="check(item.btcAddress)">
                            Verify transaction on blockcypher
                        </button>
                        <button v-if="!item.apiResponse" @click="confirmOrCanceled('confirm', item.id, index)">Confirm
                            the
                            transaction</button>
                        <button v-if="!item.apiResponse" @click="confirmOrCanceled('cancel', item.id, index)">Cancel the
                            transaction</button>
                        <p v-if="item.apiResponse">{{ item.apiResponse }}</p>
                    </div>
                </div>

            </div>
            <div class="historical" v-if="historical.length > 0">
                <h1>Sales history:</h1>
                <div v-for="(item, index) in historical" :key="index">
                    <div v-if="item.status !== 0">
                        <p>{{ formatDate(item.createdAt) }} - {{ item.amountExpected }} S - <span
                                v-if="item.status === 2" style="color: greenyellow;">Confirmed</span><span
                                v-if="item.status === 1" style="color: red;">Canceled</span></p>
                    </div>
                </div>
            </div>

        </div>
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