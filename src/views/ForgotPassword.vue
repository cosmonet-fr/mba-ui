<script setup>
import { ref } from 'vue'

const email = ref('');
const errorMsg = ref(null)

const forgotPass = () => {
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

</script>

<template>
    <div class="page" >
        <h1>I forgot my pass</h1>
        <form @submit.prevent="forgotPass">
            <label>E-mail</label>
            <input type="email" name="email" id="email" placeholder="E-mail" v-model="email"/>
            <input type="submit" value="Change pass" v-if="!errorMsg" />
            <p v-if="errorMsg">{{ errorMsg }}</p>
        </form>

    </div>
</template>