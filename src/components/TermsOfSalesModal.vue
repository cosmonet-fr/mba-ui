<script setup>
defineProps({
    openCloasTermsOfSales: Function
})
</script>
<template>
    <div class="modal_contenaire" >
        <div class="modal" >
            <h1>General Terms and Conditions of Sale (GTCS)</h1>

        <h2>1. Introduction</h2>
        <p>These General Terms and Conditions of Sale govern the sale of advertising spaces on the application developed by Morphée213. The use of the application implies unconditional acceptance of these terms.</p>

        <h2>2. Service Description</h2>
        <p>Morphée213 offers an application for the purchase and sale of 32x32 pixel advertising spaces (for a screen width of 416 pixels). These spaces are sold on a primary market and can be resold on a secondary market. Special spaces offer additional advertising opportunities.</p>

        <h2>3. Prices and Payment</h2>
        <ul>
            <li>The prices of the spaces are indicated in μBTC and vary according to their location.</li>
            <li>Payment is accepted in bitcoins.</li>
            <li>Transaction validation may not be automatic in Alpha 1 version.</li>
        </ul>

        <h2>4. Purchase and Use of Spaces</h2>
        <ul>
            <li>The buyer has the right to display an image and a hyperlink on their space.</li>
            <li>The resale of spaces is possible on the secondary market (disabled in Alpha 1 version).</li>
        </ul>

        <h2>5. Special Offers and Promotions</h2>
        <p>Buyers during the Alpha 1 version benefit from a discount on future purchases.</p>

        <h2>6. Buyer's Responsibilities</h2>
        <ul>
            <li>The buyer is responsible for the content displayed on their space.</li>
            <li>The buyer must comply with the laws and regulations in force regarding advertising content.</li>
        </ul>

        <h2>7. Technical Limitations and Liability</h2>
        <p>Morphée213 disclaims any responsibility for slowdowns due to servers. Morphée213 reserves the right to perform updates and technical modifications.</p>

        <h2>8. Modifications to the General Terms and Conditions of Sale</h2>
        <p>Morphée213 reserves the right to modify these GTCS at any time.</p>

            <button @click="openCloasTermsOfSales" >Close</button>
        </div>

    </div>
</template>