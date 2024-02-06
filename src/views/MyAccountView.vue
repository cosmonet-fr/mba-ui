<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'


const authStore = useAuthStore();

const toWrite = ref(true)
const myData = ref(null)
const firstname = ref(null)
const lastname = ref(null)
const pseudonym = ref(null)
const email = ref(null)
const btc = ref(null)
const errorMsg = ref(null)

const idUser = sessionStorage.getItem('id')

// Récupérer le token depuis le sessionStorage
const token = sessionStorage.getItem('token')

// Vérifier si le token existe
if (token) {
    // Envoyer le token dans les en-têtes de la requête fetch
    const headers = {
        Authorization: `Bearer ${token}`
    }

    // Effectuer la requête fetch avec les en-têtes
    fetch(`${import.meta.env.VITE_HOST_API}/users/${idUser}`, { headers })
        .then(response => response.json())
        .then(data => {
            myData.value = data
            firstname.value = data.res.firstname
            lastname.value = data.res.lastname
            pseudonym.value = data.res.pseudonym
            email.value = data.res.email
        })
        .catch(error => {
            console.error('Error fetching user:', error)
        })
}

const switchScreen = () => {
    toWrite.value = !toWrite.value
}

const update = () => {
    fetch(`${import.meta.env.VITE_HOST_API}/users/update/${idUser}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            "firstname": firstname.value,
            "lastname": lastname.value,
            "pseudonym": pseudonym.value,
            "email": email.value,
            "avatar": null
        })
    })
        .then(response => {
            if (response.ok) {
                toWrite.value = !toWrite.value
                return response.json();
            } else {
                throw new Error("Échec de la connexion");
            }
        })
        .then(data => {
            //sessionStorage.setItem("token", data.token);
            //sessionStorage.setItem("id", data.userId);
            // Continuer avec le traitement après une connexion réussie
        })
        .catch(error => {
            console.error(error);
            errorMsg.value = error
            // Gérer l'erreur de connexion
        });

};

const updatePass = () => {
    fetch(`${import.meta.env.VITE_HOST_API}/users/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email.value
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(err => {
                    throw new Error(err);
                });
            }
        })
        .then(
            errorMsg.value = "An email containing a link allowing you to create a password has just been sent to you. If you haven't received anything, check your SPAM"
        )
        .catch(error => {
            console.error(error);
            errorMsg.value = error.message;
        });
};
authStore.authChecker();
</script>

<template>
    <!-- <NavMyAccount></NavMyAccount> -->
    <div class="page">
        <div>
            <h1>My Account</h1>
            <div class="perso" v-if="myData">
                <div v-show="!toWrite">
                    <ul>
                        <li v-if="firstname">Firstname: {{ firstname }}</li>
                        <li v-if="lastname">Lastname: {{ lastname }}</li>
                        <li>Pseudonym: {{ pseudonym }}</li>
                        <li>email: {{ email }}</li>
                    </ul>
                    <button @click="switchScreen()">Edit</button>
                </div>
                <form @submit.prevent="update" v-show="toWrite">
                    <label>Firstname</label>
                    <input type="text" name="firstname" id="firstname" placeholder="Firstname" v-model="firstname" />
                    <label>Lastname</label>
                    <input type="text" name="lastname" id="lastname" placeholder="lastname" v-model="lastname" />
                    <label>Pseudonym</label>
                    <input type="text" name="pseudonym" id="pseudonym" placeholder="pseudonym" v-model="pseudonym" />
                    <label>email</label>
                    <input type="text" name="email" id="email" placeholder="email" v-model="email" />
                    <input type="submit" value="Update" />

                </form>
                <p class="a" @click="updatePass" v-if="!errorMsg" >I want to update my pass</p>
                <p v-if="errorMsg" >{{ errorMsg }}</p>
            </div>
            <p>
                If you want to delete your account, send us a message via the <RouterLink to="contact">contact form</RouterLink>.
            </p>
        </div>

    </div>
</template>
