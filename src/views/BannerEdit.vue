<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const token = sessionStorage.getItem('token');
const bannerUrl = ref(null);
const linkUrl = ref(null);
const selectedBanner = ref(null); // Pour gérer le fichier sélectionné de la bannière
const message = ref('');

// Fonction pour gérer la mise à jour de la bannière
const updateBanner = () => {
    const formData = new FormData();
    formData.append("banner", selectedBanner.value);
    formData.append("link", linkUrl.value);

    fetch(`${import.meta.env.VITE_HOST_API}/banners/${route.params.idBanner}`, {
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
                throw new Error("Échec de la connexion avec le serveur, réponse du serveur: " + response.status);
            }
        })
        .then(data => {
            message.value = "Banner update successful!";
        })
        .catch(error => {
            console.error(error);
            message.value = "Banner update failed: " + error.message;
        });
};

// Fonction pour gérer le changement de fichier de la bannière
const handleBannerUpload = (event) => {
    selectedBanner.value = event.target.files[0];
};
</script>

<template>
    <div class="page">
        <div>
            <form @submit.prevent="updateBanner()">
                <div class="item">
                    <label for="banner">Banner Image</label>
                    <input type="file" id="banner" @change="handleBannerUpload">
                </div>
                <div class="item">
                    <label>Link</label>
                    <input type="text" id="link" placeholder="https://..." v-model="linkUrl" />
                </div>
                <input type="submit" value="Update Banner" />
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
        margin: 0 15px !important;
        max-width: 200px;
    }
}
</style>
