<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
const router = useRouter();

function redirectToBuy() {
    router.push(`/buy/${JSON.stringify(cartStore.cart)}`);
}

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

const formattedPrice = computed(() => {
    const conversion = getUnitConversion(cartStore.total);
    return conversion.value.toFixed(conversion.precision) + ' ' + conversion.unit;
});

const formattedCart = computed(() => {
    const conversion = getUnitConversion(cartStore.total);
    return cartStore.cart.map(item => ({
        ...item,
        formattedPrice: (item.price / conversion.value).toFixed(conversion.precision) + ' ' + conversion.unit
    }));
});
</script>

<template>
    <div class="cartContenair" >
        <div class="cartBox" v-if="cartStore.cart.length > 0">
            <p class="price">{{ formattedPrice }}</p>
            <div class="cart">
                <img src="@/assets/cart.svg" alt="Cart">
                <p>{{ cartStore.cart.length }}</p>
            </div>
            <button @click="redirectToBuy">Buy Now</button>
            <button @click="cartStore.emptyCart">Empty the Cart</button>
        </div>

    </div>
</template>





<style lang="scss" scoped>
.cartContenair {
    display: flex;
    justify-content: center;
}
.cartBox {
    z-index: 2001;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    min-height: 100px;
    background: #1f1e24;
    max-width: 832px;
}

.cart {
    width: 64px;
    height: 64px;

    img {
        width: 100%;
    }

    p {
        position: relative;
        bottom: 50px;
        left: 32px;
        color: rgb(255, 0, 0);
        font-weight: bold;
    }
}

.price {
    font-size: 1.7rem;
    position: fixed;
    left: 4px;
    bottom: 0;
    text-align: center;
    width: 100%;
}
button {
    font-size: 1.2rem;
}
</style>
