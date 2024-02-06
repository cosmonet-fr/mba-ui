<script setup>
import { ref } from 'vue';
import { useDropdownFunctions } from '@/stores/dropdownFuctions';
import router from '../router';

const dropdownFunctions = useDropdownFunctions();

const logout = () => {
    
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");

    router.push({ name: "login" }); 
    dropdownFunctions.getDropDownUser()
};



</script>

<template>
    <div class="dropDown" >
        <ul>
            <RouterLink to="/my-account"><li @click="dropdownFunctions.getDropDownUser()" >My Account</li></RouterLink>
            <li @click="logout" >Logout</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped >
.dropDown{
    z-index: 2001;
    width: 100%;
    max-width: 832px;
    position: fixed;
    text-align: center;
    top: 7.67vw;
    padding: 1em;
    background: #28272de2;
    font-size: 2rem;
    @media (min-width: 800px) {
        top: 64px;
        
    }
    li {
        padding: 1em 0;
    }
}
li {
    cursor: pointer;
}

</style>