<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import NavMyAccount from '../components/NavMyAccount.vue';
import { useAuthStore } from '@/stores/auth'
import { usePixelsStore } from '@/stores/pixelsStore';

const pixelsStore = usePixelsStore();

const upForSale = true
const authStore = useAuthStore();

const route = useRoute();

// Déclarations des variables réactives
const myData = ref([]);
let url = ref(null);
const state = ref("nada");
let price = ref(null);
let btcAdress = ref(null);
let selectedFile = ref(null); // Pour gérer le fichier sélectionné
const message = ref('');
const btcRent = ref(null)
// let forSale = ref(false);
// const forRent = ref(false);

// Récupération des données de session
const idUser = sessionStorage.getItem('id');
const token = sessionStorage.getItem('token');

// Récupération des données initiales
if (token) {
    const headers = {
        Authorization: `Bearer ${token}`
    };
    fetch(`${import.meta.env.VITE_HOST_API}/wall/pub/${route.params.id}`, { headers }) 
        .then(response => response.json())
        .then(data => {
            myData.value = data;
            url.value = data.urls;
            price.value = data.prices;

            // Ici, nous appelons stateChecker avec les bonnes valeurs directement après avoir mis à jour les autres valeurs.
            stateChecker(data.forSale, data.forRent);
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
}


// Fonction pour gérer la mise à jour
const update = () => {
    const formData = new FormData();

    // Ajouter les champs, sauf s'ils sont null
    if (url.value !== null) formData.append("newUrl", url.value);
    if (btcAdress.value !== null) formData.append("btc", btcAdress.value);
    if (btcRent.value !== null) formData.append("btcRent", btcRent.value);

    // Gérer l'ajout de l'image
    if (selectedFile.value) {
        // Si un nouveau fichier est sélectionné, l'ajouter au formulaire
        formData.append("pic", selectedFile.value);
    } else if (myData.value.icons) {
        // Si aucun fichier n'est sélectionné mais qu'une image existe déjà, envoyer son URL
        formData.append("existingIcon", myData.value.icons);
    }

    fetch(`${import.meta.env.VITE_HOST_API}/wall/update/loc/${route.params.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to connect to server, server response: " + response.status);
            }
        })
        .then(data => {
            message.value = "Update successful!";
            pixelsStore.clearPixels();
            pixelsStore.loadPixels();
        })
        .catch(error => {
            console.error(error);
            message.value = "Update failed: " + error.message;
        });
};

// Fonction pour gérer le changement de fichier
const handleFileUpload = (event) => {
    selectedFile.value = event.target.files[0];
};
authStore.authChecker();
</script>


<template>
    <NavMyAccount></NavMyAccount>
    <div class="page">
        <div>

            <form @submit.prevent="update()">
                <!-- {{ forSale }} -->
                <div class="item">
                    <label for="icon">Icon Image</label>
                    <input type="file" id="icon" @change="handleFileUpload">
                </div>
                <div class="item" >
                    <label>Link</label>
                    <input type="url" name="url" id="url" placeholder="https://..." v-model="url"/>

                </div>
                <input type="submit" value="Update" />
                <div v-if="message">
                    {{ message }} 
                </div>


            </form>
        </div>
    </div>
</template>

<style scoped lang="scss" >
h2 {
    text-align: center;
    font-size: 1.2em;
}
img {
    width: 32px;
}

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    margin: .5em 0;
    background-color: #1f1e24;
    input {
        margin: 0 15px!important;
        max-width: 200px;
    }
}
</style>