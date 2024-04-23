<script setup>
import { ref, onMounted } from 'vue'
import NavMyAccount from '../components/NavMyAccount.vue';
import { useAuthStore } from '@/stores/auth'

// const history = ref(false)
const authStore = useAuthStore();

const inProgress = ref([]);
const historical = ref([]);

const idUser = sessionStorage.getItem('id')
const token = sessionStorage.getItem('token')

if (token) {
    const headers = {
        Authorization: `Bearer ${token}`
    }

    fetch(`${import.meta.env.VITE_HOST_API}/transactions/shopping-list/${idUser}`, { headers })
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

authStore.authChecker();
</script>
<template>
    <NavMyAccount></NavMyAccount>
    <div class="page">
        <div class="shop" v-if="inProgress.length > 0 || historical.length > 0">
            <div class="inProgress" v-if="inProgress.length > 0">
                <h1>Purchase in progress</h1>
                <div v-for="itemInProgress in inProgress">
                    <p>
                        You have started purchasing pixel plots :
                    <ul>
                        <li v-for="pixel in itemInProgress.pixelId">{{ pixel }}</li>
                    </ul>
                    Send {{
                    itemInProgress.amountExpected }} STSH
                    to
                    the address: <em>{{ itemInProgress.btcAddress }}</em> to finalize your purchase.
                    </p>

                </div>

            </div>
            <div class="historical" v-if="historical.length > 0">
                <h1>Past purchase</h1>
                <div v-for="itemHistorical in historical">
                    <p>{{ formatDate(itemHistorical.createdAt) }} {{ itemHistorical.amountExpected }} STSH <span
                            style="color: greenyellow;" v-if="itemHistorical.status == 2">confirmed</span>
                        <span style="color: red;" v-if="itemHistorical.status == 1">canceled</span>
                    </p>
                </div>

            </div>

        </div>
        <div v-else>
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
        font-size: .8rem;
    }
}
.shop {
    min-height: 100vh;
}
li {
    list-style: inside;
}
</style>