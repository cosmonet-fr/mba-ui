<script setup>
import { ref } from 'vue'
import router from '../router'
import { useRoute } from 'vue-router';
const route = useRoute();

const idUser = sessionStorage.getItem('id')
const beginningDate = ref(null);
const beginningTime = ref('00:00');
const endDate = ref(null);
const endTime = ref('00:00');

const validate = () => {
    const beginning = `${beginningDate.value}T${beginningTime.value}:00.000Z`
    const end = `${endDate.value}T${endTime.value}:00.000Z`
    console.log(beginning)
    console.log(end)
    console.log(route.params.pixelId)

    fetch(`${import.meta.env.VITE_HOST_API}/loc/${idUser}/${route.params.pixelId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "beginning": beginning,
            "end": end
        })
    })
}

</script>

<template>
    <div class="page">
        <h1>Rent a plot</h1>
        <form @submit.prevent="validate">
            <div class="item">
                <h2>Start date and time</h2>
                <input id="firstname" type="date" required v-model="beginningDate" />
                <input id="firstname" type="time" required v-model="beginningTime" />

            </div>
            <div class="item">
                <h2>End date and time</h2>
                <input id="lastname" type="date" required v-model="endDate" />
                <input id="lastname" type="time" required v-model="endTime" />

            </div>


            <input type="submit" value="Validate the rental" />

        </form>
        <p v-if="errorMsg">{{ errorMsg }}</p>

    </div>
    <TermsOfUseModal :openCloasTermsOfUse="openCloasTermsOfUse" v-if="termsOfUseModal" />
    <TermsOfSalesModal :openCloasTermsOfSales="openCloasTermsOfSales" v-if="termsOfSalesModal" />
</template>

<style scoped lang="scss">
.item {
    margin: 1em 0;
    padding: 1em;
    background: #1f1e24;
}
h2{
    font-size: 1.5em;
}
</style>
