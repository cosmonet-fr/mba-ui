<script setup>
import { ref } from 'vue'
import router from '../router'

const email = ref('');
const password = ref('');
const errorMsg = ref(null)

const login = () => {
    fetch(`${import.meta.env.VITE_HOST_API}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email.value,
            "pass": password.value
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
        .then(data => {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("id", data.userId);
            router.push({
                name: "home"
            });
        })
        .catch(error => {
            console.error(error);
            errorMsg.value = error.message;
        });
};

const reactivate = () => {
    fetch(`${import.meta.env.VITE_HOST_API}/users/reactivate`, {
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
        }
    })
    errorMsg.value = null
}
</script>


<template>
    <div class="page" >
        <h1>Login</h1>
        <form @submit.prevent="login">
            <label>E-mail</label>
            <input type="email" name="email" id="email" placeholder="E-mail" v-model="email"/>
            <label>Password</label>
            <input type="password" name="password" id="password" placeholder="Password" v-model="password"/>
            <input type="submit" value="Login" />
            <p v-if="errorMsg">{{ errorMsg }}</p>
            <p class="a" @click="reactivate" v-if="errorMsg == 'Your account is not activated. You can activate it by clicking on the link received in your e-mail box.'" >Receive the activation email again</p>
            <RouterLink to="/signup">Create an account</RouterLink>
            <RouterLink to="/forgot-pass">I forgot my pass</RouterLink>
        </form>

    </div>
</template>