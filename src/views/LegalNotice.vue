<script setup>
import Version from "../components/Version.vue";
import { ref } from "vue";

const redpill = ref(-3)

const myData = ref([]); // initialize myData as an empty array

fetch(`${import.meta.env.VITE_HOST_API}`)
    .then((response) => response.json())
    .then(data => {
        let transformedData;

        // Test si la réponse est déjà un tableau
        if (Array.isArray(data)) {
            transformedData = data.map(item => ({
                ...item,
                forSale: item.forSale === 1 ? true : false,
                message: "" // Initialisation de la propriété message à une chaîne vide
            }));
        } else {
            // Transforme la réponse unique en un tableau contenant cet élément unique
            transformedData = [data].map(item => ({
                ...item,
                forSale: item.forSale === 1 ? true : false,
                message: "" // Initialisation de la propriété message à une chaîne vide
            }));
        }

        // Remplace la valeur existante de myData par la nouvelle version transformée
        myData.value = transformedData;
    }).catch(error => {
        console.error("Erreur lors de la transformation des données API :", error);
    });
</script>

<template>
    
    <Version v-if="redpill > 0"/>
    <div class="page" >
        <h1>Legal Notice</h1>
	<div class="item" >
	<h2>Author</h2>
	<p>
	      App published by Morphée213
	      <RouterLink :to="{ name: 'contact' }">Contact here</RouterLink>
	</p>
	</div>

        <div class="item" >
            <h2>Hosting</h2>
            <ul>
                <li>name:                     <span>OVH</span></li>
                <li>address:                       <span>2 Rue Kellermann</span></li>
                <li>city:                       <span>59100 ROUBAIX</span></li>
                <li>country:                       <span>FR</span></li>
                <li>phone:                         <span>+33.899701761</span></li>
                <li>fax-no:                        <span>+33.320200958</span></li>
                <li>e-mail:                        <span>support@ovh.net</span></li>
                <li>website:                       <span>http://www.ovh.com</span></li>

            </ul>
        </div>
        <div class="item" >
            <h2>API infos</h2>
            <ul>
                <li>version: <span @click="redpill ++" >{{ myData[0].version }}</span> </li>
                <li>codename: <span @click="redpill ++" >{{ myData[0].codename }}</span> </li>
            </ul>
        </div>
        <div class="item" >
            <h2>APP / UI infos</h2>
            <ul>
                <li>version: <span @click="redpill ++" >0.1.0A-2</span> </li>
                <li> <a href="https://github.com/cosmonet-fr/mba-ui/">source code</a> </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.item {
    padding: 2em;
    background: #1f1e24;
    margin: 1em 0;
}
p, h2 {
    margin: .5em 0;
}
h2 {
    font-size: 1.4rem;
    font-weight: bold;
}
li {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>
