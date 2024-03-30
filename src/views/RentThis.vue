<script setup>
import { ref, computed } from 'vue';
import router from '../router'
import { useRoute } from 'vue-router';
import { DatePicker } from 'v-calendar';
import { formatISO, setHours, setMinutes, addDays } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const route = useRoute();


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

const idUser = sessionStorage.getItem('id')
const beginningDate = ref(null);
const beginningTime = ref('00:00');
const endDate = ref(null);
const endTime = ref('23:59');
const timeZone = 'UTC';

const validate = () => {
    if (beginningDate.value && beginningTime.value && endDate.value && endTime.value) {
        try {
            // Parsez les valeurs de date en objets Date
            const parsedBeginningDate = new Date(beginningDate.value);
            const parsedEndDate = new Date(endDate.value);

            // Ajoutez le temps à vos objets Date
            const [beginningHours, beginningMinutes] = beginningTime.value.split(':');
            parsedBeginningDate.setHours(parseInt(beginningHours), parseInt(beginningMinutes), 0, 0);

            const [endHours, endMinutes] = endTime.value.split(':');
            parsedEndDate.setHours(parseInt(endHours), parseInt(endMinutes), 0, 0);

            // Convertissez les dates au format ISO UTC
            const formattedBeginningDate = parsedBeginningDate.toISOString();
            const formattedEndDate = parsedEndDate.toISOString();

            if (!idUser) {
                console.error("ID utilisateur manquant.");
                return;
            }

            const payload = {
                beginning: formattedBeginningDate,
                end: formattedEndDate,
            };

            fetch(`${import.meta.env.VITE_HOST_API}/loc/${idUser}/${route.params.pixelId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }).then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
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
        <p>
{{ beginningDate }}
        </p>
        <p>
{{ endDate }}
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
