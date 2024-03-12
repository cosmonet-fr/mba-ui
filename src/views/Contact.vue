<script setup>
import { ref } from 'vue';
import router from '../router';
import { useAuthStore } from '@/stores/auth'


// const authStore = useAuthStore();

const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');
const errorMsg = ref(null);

const sendContactForm = () => {
    fetch(`${import.meta.env.VITE_HOST_API}/contact`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(err => {
                    throw new Error(err.error);
                });
            }
        })
        .then(() => {
            router.push({ name: "home" });
        })
        .catch(error => {
            console.error(error);
            errorMsg.value = error.message;
        });
};
// authStore.authChecker();
</script>

<template>
    <div class="page">
        <h1>Contact Us</h1>
        <form @submit.prevent="sendContactForm">
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" v-model="name" />

            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" v-model="email" />

            <label for="subject">Subject</label>
            <select id="subject" v-model="subject">
                <option disabled value="">Please select one</option>
                <option value="Report a Bug or Issue">Report a Bug or Issue</option>
                <option value="Issues with Buying a Pixel">Issues with Buying a Pixel</option>
                <option value="User Account Issues">User Account Issues</option>
                <option value="Feature request">Feature request</option>
                <option value="Partnership Inquiry">Partnership Inquiry</option>
                <option value="Press Contact">Press Contact</option>
                <option value="I want to delete my account">I want to delete my account</option>
                <option value="I want to report copyright infringement">I want to report copyright infringement</option>
                <option value="I want to report a violation of the terms of use. (incitement to violence, racism, etc.)">I want to report a violation of the terms of use. (incitement to violence, racism, etc.)</option>
                <option value="Other">Other</option>
            </select>

            <label for="message">Message</label>
            <textarea id="message" placeholder="Your Message" rows="5" v-model="message"></textarea>

            <input type="submit" value="Send Message" />
            <p v-if="errorMsg">{{ errorMsg }}</p>
        </form>
    </div>
</template>
