<script setup>
import { ref, computed } from 'vue';
import router from '../router';
import { useRoute } from 'vue-router';
import { DatePicker } from 'v-calendar';
import { formatISO, setHours, setMinutes, addDays } from 'date-fns';

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

const idUser = sessionStorage.getItem('id');
// Mettre à jour pour utiliser une seule référence pour la plage de dates
const dateRange = ref({ start: null, end: null });
const beginningTime = ref('00:00');
const endTime = ref('23:59');

const validate = () => {
    if (dateRange.value.start && beginningTime.value && dateRange.value.end && endTime.value) {
        try {
            // Parsez les valeurs de date en objets Date
            const parsedBeginningDate = new Date(dateRange.value.start);
            const parsedEndDate = new Date(dateRange.value.end);

            // Ajoutez le temps à vos objets Date
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
        <form @submit.prevent="validate">
            <div class="item">
                <h2>Select the rental period</h2>
                <!-- Configurer pour la sélection de la plage de dates -->
                <DatePicker transparent borderless is-dark="{ selector: ':root', darkClass: 'dark' }"
                    v-model="dateRange" :min-date="minDate" :max-date="maxDate" :attributes="attributes" is-range />
            </div>
            <div class="item">
                <h2>Start time</h2>
                <input type="time" required v-model="beginningTime" />
            </div>
            <div class="item">
                <h2>End time</h2>
                <input type="time" required v-model="endTime" />
            </div>
            <input type="submit" value="Validate the rental" />
        </form>
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
