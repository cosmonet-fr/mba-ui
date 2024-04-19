<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import NavMyAccount from '../components/NavMyAccount.vue';
import { useAuthStore } from '@/stores/auth'

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

    fetch(`${import.meta.env.VITE_HOST_API}/wall/owner/${idUser}/${route.params.pixelId}`, { headers })
        .then(response => response.json())
        .then(data => {
            myData.value = data;
            url.value = data.urls;
            price.value = data.prices;
            // btcAdress.value = data.btc;
            btcRent.value = data.btcRent;

            // Ici, nous appelons stateChecker avec les bonnes valeurs directement après avoir mis à jour les autres valeurs.
            stateChecker(data.forSale, data.forRent);
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
}

// Fonction pour vérifier l'état du pixel
const stateChecker = (sale, rent) => {
    if (sale == 1 && rent == 0) {
        state.value = 'forSale'
    } else if (sale == 0 && rent == 1) {
        state.value = 'forRent'
    } else {
        state.value = 'nada'
    }

}

// Fonction pour gérer la mise à jour
const update = () => {
    let forSale
    let forRent
    if (state.value === 'forSale') {
        forSale = 1;
        forRent = 0;
    } else if (state.value === 'forRent') {
        forSale = 0;
        forRent = 1; 
    } else {
        forSale = 0;
        forRent = 0; 
    }
    const formData = new FormData();

    // Ajouter les champs, sauf s'ils sont null
    if (price.value !== null) formData.append("newPrice", price.value);
    formData.append("forSale", forSale);
    formData.append("forRent", forRent);
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

    fetch(`${import.meta.env.VITE_HOST_API}/wall/update/${route.params.pixelId}`, {
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
                return response.json().then(err => {
                    throw new Error(err.message);
                });
            }
        })
        .then(data => {
            message.value = "Update successful!";
        })
        .catch(error => {
            console.error(error.message);
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
                    <input type="text" name="url" id="url" placeholder="https://..." v-model="url"/>

                </div>
                <!-- <div class="item" v-if="upForSale" >
                    <label for="forSale" >Is for sale ?</label>
                    <input id="forSale" type="checkbox" v-model="forSale">
                </div> -->
                <div v-if="upForSale" >
                    <div class="item" >
                        <input type="radio" id="radio1" name="nade" value="nade" v-model="state" checked />
                        <label for="radio1">I do not want to sell or rent my pixel.</label>

                    </div>
                    <div class="item" >
                        <input type="radio" id="radio2" name="forSale" value="forSale" v-model="state" />
                        <label for="radio2">Put my pixel up for sale.</label>

                    </div>
                    <div class="item" >
                        <input type="radio" id="radio3" name="forRent" value="forRent" v-model="state" />
                        <label for="radio3">Rent my pixel.</label>

                    </div>

                </div>
                <div v-else >
                    <p class="err">
                        The sale of pixels in the secondary market is not yet available in the alpha 1 version of the application.
                    </p>
                </div>
                <div v-if="state === 'forSale'" >
                    <div class="item" >
                        <label for="price">Price</label>
                        <input type="text" id="price" v-model="price" required >

                    </div>
                    <!-- <div class="item" >
                        <label for="price">Bitcoin payment address</label>
                        <input type="text" id="btcAdress" v-model="btcAdress" required >

                    </div> -->

                </div>

                <div v-if="state === 'forRent'" >
                    <div class="item" >
                        <label for="price">Price</label>
                        <input type="text" id="price" v-model="price" required >

                    </div>
                    <div class="item" >
                        <label for="price">Bitcoin payment address</label>
                        <input type="text" id="btcAdress" v-model="btcRent" required >

                    </div>

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