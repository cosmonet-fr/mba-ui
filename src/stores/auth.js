import { defineStore } from 'pinia';
import router from '../router'

export const useAuthStore = defineStore('auth', () => {

    function authChecker() {
        const token = sessionStorage.getItem("token");

        if (token) {
            //console.log("token")
        } else if (!token) {
            router.push({ name: 'login' });
        }
    }

    return { authChecker };
});
