import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {
    const cart = ref([]);

    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart.value = JSON.parse(savedCart);
        }
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart.value));
    }

    watch(cart, saveCart, { deep: true });

    function addToCart(pixel) {
        const index = cart.value.findIndex(item => item.id === pixel.numbers);
        if (index > -1) {
            cart.value.splice(index, 1);
        } else {
            const cartItem = { id: pixel.numbers, price: pixel.prices };
            cart.value.push(cartItem);
        }
    }

    function emptyCart() {
        cart.value = [];
    }

    loadCart();

    // Propriété calculée pour le total
    const total = computed(() => {
        return cart.value.reduce((sum, item) => sum + item.price, 0);
    });

    return { cart, addToCart, emptyCart, total };
});

