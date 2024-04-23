<script setup>
import { onMounted, ref, computed } from 'vue';
import router from '../router';
import { useRoute } from 'vue-router';
import { DatePicker } from 'v-calendar';
import { formatISO, parseISO } from 'date-fns';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
authStore.authChecker();

const route = useRoute();
const minDate = new Date();
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 90);

const reservedDates = ref([]);

// Conversion des dates de l'API au format requis
const convertDatesFromAPI = (dates) => {
    return dates.filter(date => date.status !== 1)  // Filtrer les dates où status !== 1
        .map(date => ({
            start: parseISO(date.beginning),
            end: parseISO(date.end)
        }));
};

const message = ref('');
const price = ref(route.params.price);

// Récupération des dates réservées depuis l'API
const fetchReservedDates = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_HOST_API}/loc/pixel/${route.params.pixelId}`);
        const data = await response.json();
        reservedDates.value = convertDatesFromAPI(data);
    } catch (error) {
        console.error("Erreur lors de la récupération des dates réservées:", error);
    }
};

onMounted(() => {
    fetchReservedDates();
});

const attributes = computed(() => [
    {
        key: 'reserved',
        dates: reservedDates.value,
        highlight: 'red',
        popover: {
            label: 'Reserved',
        },
        selectable: false,
    },
]);

const idUser = sessionStorage.getItem('id');
const dateRange = ref({ start: null, end: null });
const beginningTime = ref('00:00');
const endTime = ref('23:59');

// Calcul du nombre de jours sélectionnés
const daysCount = computed(() => {
    if (dateRange.value.start && dateRange.value.end) {
        const diff = new Date(dateRange.value.end).getTime() - new Date(dateRange.value.start).getTime();
        return diff / (1000 * 3600 * 24) + 1; // Inclut le jour de début dans le comptage
    }
    return 0;
});


// Calcul du prix total
const totalPrice = computed(() => price.value * daysCount.value);

const validate = () => {
    if (dateRange.value.start && beginningTime.value && dateRange.value.end && endTime.value) {
        try {
            const parsedBeginningDate = new Date(dateRange.value.start);
            const parsedEndDate = new Date(dateRange.value.end);
            const [beginningHours, beginningMinutes] = beginningTime.value.split(':');
            parsedBeginningDate.setHours(parseInt(beginningHours), parseInt(beginningMinutes), 0, 0);
            const [endHours, endMinutes] = endTime.value.split(':');
            parsedEndDate.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

            if (!idUser) {
                console.error("ID utilisateur manquant.");
                return;
            }

            const payload = {
                beginning: parsedBeginningDate.toISOString(),
                end: parsedEndDate.toISOString(),
            };

            fetch(`${import.meta.env.VITE_HOST_API}/loc/${idUser}/${route.params.pixelId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }).then(response => response.json())
                .then(data => message.value = data.message)
                .catch(error => message.value = error.message);
        } catch (error) {
            console.error("Erreur lors de la manipulation des dates:", error);
        }
    } else {
        console.log("Une ou plusieurs valeurs de date/heure sont manquantes.");
    }
};
</script>

<template>
    <div class="page">
        <h1>Rent a plot</h1>
        <form @submit.prevent="validate">
            <p>Price of the day: {{ price }} STSH</p>
            <p>Total price: {{ totalPrice }} STSH</p>
            <div class="item">
                <h2>Select the rental period</h2>
                <DatePicker transparent borderless is-dark="{ selector: ':root', darkClass: 'dark' }"
                    v-model="dateRange" :min-date="minDate" :max-date="maxDate" :attributes="attributes" is-range />
            </div>
            <!-- <div class="item">
                <h2>Start time</h2>
                <input type="time" required v-model="beginningTime" />
            </div> -->
            <!-- <div class="item">
                <h2>End time</h2>
                <input type="time" required v-model="endTime" />
            </div> -->
            <input type="submit" value="Validate the rental" />
        </form>
        <div v-if="message" class="api-message">{{ message }}</div>
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
