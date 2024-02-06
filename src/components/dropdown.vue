<script setup>
import { ref } from 'vue';
import { useDropdownFunctions } from '@/stores/dropdownFuctions';

const dropdownFunctions = useDropdownFunctions();
</script>

<template>
    <div class="dropDown" >
        <ul>
            <RouterLink :to="{name: 'home'}"><li @click="dropdownFunctions.getDropDown()" >Home</li></RouterLink>
            <RouterLink :to="{name: 'my-pixels'}"><li @click="dropdownFunctions.getDropDown()" >My Pixels</li></RouterLink>
            <RouterLink :to="{name: 'about'}"><li @click="dropdownFunctions.getDropDown()" >About</li></RouterLink>
            <RouterLink :to="{ name: 'contact' }"><li @click="dropdownFunctions.getDropDown()" >Contact</li></RouterLink>
        </ul>
    </div>
</template>

<style lang="scss" scoped >
.dropDown{
    z-index: 2001;
    width: 100%;
    max-width: 832px;
    position: fixed;
    top: 7.67vw;
    padding: 1em;
    text-align: center;
    background: #28272de2;
    font-size: 2rem;
        @media (min-width: 800px) {
        top: 64px;
        
    }
    li {
        padding: 1em 0;
    }
}

</style>