<script setup>
import { ref } from 'vue';

// Initialisation de la référence réactive pour contrôler l'affichage de la fenêtre modale
const showModal = ref(localStorage.getItem('doNotShowModal') !== 'true');

// Gestionnaire d'événement pour le bouton "Reopen this window on my next visit"
function handleReopen() {
    localStorage.setItem('doNotShowModal', 'false');
    showModal.value = false;
}

// Gestionnaire d'événement pour le bouton "Ok, don't show me this window again"
function handleDoNotShowAgain() {
    localStorage.setItem('doNotShowModal', 'true');
    showModal.value = false;
}
</script>
<template>
    <div class="modal_contenaire" v-if="showModal">
        <div class="modal">
            <h1>
                Is this your first visit? Welcome!
            </h1>
            <p>
                Here, you can buy pixel parcels on the primary market or, buy and sell on the secondary market. Each
                parcel you purchase allows you to display an image with a hyperlink. Transactions are made in bitcoins.
            </p>
            <div class="item">
                <div class="pixels for_sale">
                    <img class="dotted" src="@/assets/dotted.svg" alt="cadre">
                </div>
                <p>
                    parcel of pixels for sale in primary market
                </p>

            </div>
            <div class="item">
                <div class="pixels">
                    <img class="dotted" src="@/assets/dotted.svg" alt="cadre">
                </div>
                <p>
                    parcel of pixels already sold
                </p>

            </div>
            <div class="item">
                <div class="pixels for_sale2">
                    <img class="dotted" src="@/assets/dotted.svg" alt="cadre">
                </div>
                <p>
                    parcel of pixels for sale in the secondary market
                </p>

            </div>
            <div class="item">
                <div class="pixels in_progress">
                    <img class="dotted" src="@/assets/dotted.svg" alt="cadre">
                </div>
                <p>
                    sale in progress, impossible to buy
                </p>

            </div>
            <div class="item">
                <div class="pixels for_rent">
                    <img class="dotted" src="@/assets/dotted.svg" alt="cadre">
                </div>
                <p>
                    plot of pixels available for rental
                </p>

            </div>
            <div class="validate">
                <button @click="handleReopen">Reopen this window on my next visit</button>
                <button @click="handleDoNotShowAgain">Ok, don't show me this window again</button>
            </div>
        </div>

    </div>

</template>

<style lang="scss" scoped >
.item {
    width: 100%;
    min-height: 66px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin: .5em 0;
    p {
        width: 73%;
    }
    .pixels {
        width: 32px;
        height: 32px;
        cursor: auto;
    }
    .for_sale {
        background: #4CAF50;
    }
    .for_sale2 {
        background: #2196F3;
    }
    .in_progress {
        background-color: #FDD835;
    }
    .for_rent {
        background: #ff69b4;
    }
}

.validate {
    display: flex;
    flex-direction: column;
    button {
        font-size: 1em;
    }
}
</style>