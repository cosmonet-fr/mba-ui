import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '../router';

export const useDropdownFunctions = defineStore('dropdownFunctions', () => {
    const dropDown = ref(false);
    const dropDownUser = ref(false);
    
    function getDropDown() {
        if (dropDownUser.value) {
            dropDownUser.value = false
        }
        dropDown.value = !dropDown.value;
    }

    function directToLogin() {
        router.push({
            name: "login"
        });
    }

    function getDropDownUser() {
        if (dropDown.value) {
            dropDown.value = false
        }
        dropDownUser.value = !dropDownUser.value;
    }

    return { dropDown, dropDownUser, getDropDown, directToLogin, getDropDownUser };
});
