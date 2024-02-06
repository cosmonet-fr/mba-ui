<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();

const password = ref('');
const errorMsg = ref(null)

const resetPass = () => {
    fetch(`${import.meta.env.VITE_HOST_API}/users/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "token": route.query.token,
            "newPassword": password.value
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
            errorMsg.value = "You can log in using your new password"
        )
        .catch(error => {
            console.error(error);
            errorMsg.value = error.message;
        });
};

</script>

<template>
    <div class="page">
        <h1>Enter your new pass</h1>
        <form @submit.prevent="resetPass">
            <label>Password</label>
            <input type="password" v-model="password" placeholder="Password" />
            <input type="submit" value="Change pass" />
            <p v-if="errorMsg">{{ errorMsg }}</p>

            <p>Your password must include at least:
                <ul>
                    <li>14 characters</li>
                    <li>upper and lower case letters</li>
                    <li>a special character (e.g.: #, @, !...)</li>
                    <li>a number</li>

                </ul>
            </p>
        </form>

    </div>
</template>