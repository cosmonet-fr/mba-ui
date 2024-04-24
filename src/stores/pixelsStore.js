import { defineStore } from 'pinia';

export const usePixelsStore = defineStore('pixels', {
    state: () => ({
        pixels: [],
        currentPage: 1,
        isLoading: false,
        loadingPage: true,
        hasMore: true // indique s'il y a plus de pixels à charger
    }),
    actions: {
        loadPixels() {
            if (!this.hasMore) return; // Arrête le chargement si tout est chargé

            this.isLoading = true;
            fetch(`${import.meta.env.VITE_HOST_API}/wall?page=${this.currentPage}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0) {
                        this.hasMore = false; // Plus de données à charger
                    }
                    this.pixels = [...this.pixels, ...data];
                    this.isLoading = false;
                    this.loadingPage = false;
                })
                .catch(error => {
                    console.error('Error fetching pixels:', error);
                    this.isLoading = false;
                });
        },
        loadMorePixels() {
            if (!this.isLoading && this.hasMore) {
                this.currentPage++;
                this.loadPixels();
            }
        },
        clearPixels() {
            this.pixels = [];
            this.hasMore = true; // Réinitialiser lors du nettoyage
        }
    }
});
