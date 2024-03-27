<script setup>
import { ref, computed } from 'vue';
import { DatePicker } from 'v-calendar';
import { addDays, formatISO } from 'date-fns';

const minDate = new Date();
const maxDate = addDays(new Date(), 90);

// Exemple de dates déjà réservées
const reservedDates = ['2024-04-15', '2024-04-16', '2024-05-01'];

const attributes = computed(() => [
    {
        key: 'reserved',
        dates: reservedDates,
        highlight: {
            backgroundColor: '#ff6961',
        },
        popover: {
            label: 'Reserved',
        },
        selectable: false,
    },
]);

const beginningDate = ref(null);
const beginningTime = ref('00:00');
const endDate = ref(null);
const endTime = ref('23:59');

const validate = () => {
    const beginning = `${beginningDate.value}T${beginningTime.value}:00.000Z`
    const end = `${endDate.value}T${endTime.value}:00.000Z`

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
        <p>
            {{ beginningDate }}
        </p>
        <form @submit.prevent="validate">
            <div class="item">
                <h2>Start date and time</h2>
                <DatePicker transparent borderless is-dark="{ selector: ':root', darkClass: 'dark' }" v-model="beginningDate" :min-date="minDate" :max-date="maxDate" :attributes="attributes" />
                <input type="time" required v-model="beginningTime" />
            </div>
            <div class="item">
                <h2>End date and time</h2>
                <DatePicker transparent borderless is-dark="{ selector: ':root', darkClass: 'dark' }" v-model="endDate" :min-date="minDate" :max-date="maxDate" :attributes="attributes" />
                <input type="time" required v-model="endTime" />
            </div>
            <input type="submit" value="Validate the rental" />
        </form>
        <p v-if="errorMsg">{{ errorMsg }}</p>
    </div>
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

.vc-pane {
    background: black!important;
}
</style>
