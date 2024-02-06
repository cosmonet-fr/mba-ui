<script setup>
import { ref, computed } from 'vue';
import { useRoute } from "vue-router";
import { useCartStore } from '@/stores/cart';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const cartStore = useCartStore();

const route = useRoute();
const idUser = sessionStorage.getItem('id');
const token = sessionStorage.getItem('token');
const decodedParams = decodeURIComponent(route.params.arrayId);
const data = JSON.parse(decodedParams);
let total = ref(0);

const getTotal = () => {
    total.value = data.reduce((sum, item) => sum + item.price, 0);
};
getTotal();

const getUnitConversion = (price) => {
    if (price >= 100000000) {
        return { value: price / 100000000, unit: 'BTC', precision: 8 };
    } else if (price >= 1000000) {
        return { value: price / 1000000, unit: 'cBTC', precision: 5 };
    } else if (price >= 100000) {
        return { value: price / 100000, unit: 'mBTC', precision: 2 };
    } else if (price >= 100) {
        return { value: price / 100, unit: 'μBTC', precision: 2 };
    } else {
        return { value: price, unit: 'Satoshi', precision: 0 };
    }
};

const formattedTotal = computed(() => {
    const conversion = getUnitConversion(total.value);
    return conversion.value.toFixed(conversion.precision) + ' ' + conversion.unit;
});

const formattedData = computed(() => {
    const conversion = getUnitConversion(total.value);
    return data.map(item => ({
        ...item,
        formattedPrice: (item.price / total.value * conversion.value).toFixed(conversion.precision) + ' ' + conversion.unit
    }));
});

const transformedData = data.map(item => ({
    buyerId: idUser,
    pixelId: item.id.toString()
}));

const isPurchaseConfirmed = ref(false);
const btcAddresses = ref([]);

const sendDataToApi = () => {
    if (token) {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };

        fetch(`${import.meta.env.VITE_HOST_API}/transactions/create`, {
            method: "POST",
            headers,
            body: JSON.stringify(transformedData)
        })
            .then(response => response.json())
            .then(apiResponse => {
                isPurchaseConfirmed.value = true;
                btcAddresses.value = apiResponse.map(transaction => ({
                    address: transaction.btcAddress,
                    amount: transaction.amountExpected
                }));
                cartStore.emptyCart();
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }
};

authStore.authChecker();
</script>

<template>
    <div class="page">
        <h1>My Cart</h1>
        <div class="tableBox">
            <p>You have {{ data.length }} pixel<em v-if="data.length > 1">s</em> in your cart.</p>
            <table>
                <thead>
                    <tr>
                        <th>Pixel ID</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in formattedData" :key="item.id" :class="{ evenNumber: index % 2 === 0 }">
                        <td>{{ item.id }}</td>
                        <td>{{ item.formattedPrice }}</td>
                    </tr>
                </tbody>
            </table>

            <p class="total">Total: {{ formattedTotal }}</p>
        </div>
        <div class="validate" v-if="!isPurchaseConfirmed">
            <button @click="sendDataToApi()">Confirm purchase</button>
        </div>
        <div class="purchaseConfirmation" v-if="isPurchaseConfirmed">
            <p>Your purchase request has been sent to the seller. Payment is not yet automatic. You must make the payment to
                the following Bitcoin addresses with the specified amounts:</p>
            <ul>
                <li v-for="btc in btcAddresses" :key="btc.address">
                    Address: {{ btc.address }}, Amount: {{ btc.amount }} STSH
                </li>
            </ul>
        </div>
    </div>
</template>



<style lang="scss" scoped >
.page{
    // min-height: 100vh;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
}
em {
    font-style: normal;
}
.tableBox {
    margin: 2em 0;
}
table,
th,
td {
    padding: 1em;
}
table {
    width: 100%;
    margin-bottom: 2em;
}
.evenNumber{
background: black;
}
.total{
    font-size: 2em;
}
.validate {
    text-align: center;
}
li {
    margin: 1em 0;
}
</style>