<script setup>
import { ref } from 'vue'
import router from '../router'
import TermsOfUseModal from '../components/TermsOfUseModal.vue';
import TermsOfSalesModal from '../components/TermsOfSalesModal.vue';


const email = ref('');
const password = ref('');
const pseudonym = ref('');
const errorMsg = ref(null)
const firstname = ref('');
const lastname = ref(''); 
const termsOfUse = ref(false)
const termsOfSales = ref(false)
const termsOfUseModal = ref(false)
const termsOfSalesModal = ref(false)

let openCloasTermsOfUse = () => termsOfUseModal.value = !termsOfUseModal.value;
let openCloasTermsOfSales = () => termsOfSalesModal.value = !termsOfSalesModal.value;


const signup = () => {
    fetch(`${import.meta.env.VITE_HOST_API}/users/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email.value,
            "pass": password.value,
            "pseudonym": pseudonym.value,
            "firstname": firstname.value,
            "lastname": lastname.value
            
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                router.push({ name: "login" }); 
            } else {
                errorMsg.value = data.mess;
            }
        })
        .catch(error => errorMsg.value = error);
};
</script>

<template>
    <div class="page" >
        <h1>Signup</h1>
        <form @submit.prevent="signup">
            <label for="">First Name (private)</label>
            <input id="firstname" type="text" v-model="firstname" placeholder="Thomas"  />
            <label for="">Last Name (private)</label>
            <input id="lastname" type="text" v-model="lastname" placeholder="Anderson"  />
            <label for="pseudonym" >Pseudonym (public) *</label>
            <input id="pseudonym" type="text" v-model="pseudonym" placeholder="Neo" required />
            <label for="email" >Email (private) *</label>
            <input id="email" type="email" v-model="email" placeholder="neo@nebuchadnezzar.org" required />
            <label for="password" >Password (private) *</label>
            <input id="password" type="password" v-model="password" placeholder="Password" required />
            <div>
                <p class="a" @click="openCloasTermsOfUse" >Read the terms of use</p>
                <input type="checkbox" id="termsOfUse" v-model="termsOfUse" required />
                <label for="termsOfUse">Accept the terms of use</label>

            </div>
            <div>
                <p class="a" @click="openCloasTermsOfSales" >Read the terms of sales</p>
                <input type="checkbox" id="termsOfSales" v-model="termsOfSales" required />
                <label for="termsOfSales">Accept the terms of sales</label>

            </div>
            <input type="submit" value="Signup" />
            <p>Your password must include at least:
                <ul>
                    <li>14 characters</li>
                    <li>upper and lower case letters</li>
                    <li>a special character (e.g.: #, @, !...)</li>
                    <li>a number</li>

                </ul>
            </p>
            <RouterLink to="/login">Already have an account? Login</RouterLink>
        </form>
        <p v-if="errorMsg">{{ errorMsg }}</p>

    </div>
    <TermsOfUseModal :openCloasTermsOfUse="openCloasTermsOfUse" v-if="termsOfUseModal"/>
    <TermsOfSalesModal :openCloasTermsOfSales="openCloasTermsOfSales" v-if="termsOfSalesModal"/>
</template>

<style scoped lang="scss">
ul{
    list-style: circle;
}
</style>
