import { defineStore } from 'pinia';

export const usePixelsStore = defineStore('pixels', {
    state: () => ({
        pixels: [],
        currentPage: 1,
        isLoading: false
    }),
    actions: {
        loadPixels() {
            this.isLoading = true;
            fetch(`${import.meta.env.VITE_HOST_API}/wall?page=${this.currentPage}`)
                .then(response => response.json())
                .then(data => {
                    this.pixels = [...this.pixels, ...data];
                    this.isLoading = false;
                })
                .catch(error => {
                    console.error('Error fetching pixels:', error);
                    this.isLoading = false;
                });
        },
        loadMorePixels() {
            if (!this.isLoading) {
                this.currentPage++;
                this.loadPixels();
            }
        }
    }
});
