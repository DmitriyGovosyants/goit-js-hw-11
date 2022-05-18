const axios = require('axios').default; 

class ImgsSearchApiService {
    constructor() {
        this.BASE_URL = "https://pixabay.com/api/";
        this.API_KEY = "27444041-6ebfb7763dac999969343312e";
        this.page = 1;
        this.currentGalleryPoint = 0;
        this.searchParams = new URLSearchParams({
            key: this.API_KEY,
            q: "",
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            page: 1,
            per_page: 40,
        });
    }

    fetchImgs() {
        return axios.get(`${this.BASE_URL}?${this.searchParams}`)
            .then(({data}) => {
                this.checkGalleryPoint();
                this.incrementPage();
                return data;
            })
    }

    incrementPage() {
        this.page += 1;
        this.searchParams.set('page', this.page);
    }

    resetPage() {
        this.page = 1;
        this.searchParams.set('page', this.page);
    }

    setSearchParams(params) {
        this.searchParams.set('q', params);
    }

    checkGalleryPoint() {
        this.currentGalleryPoint = this.page * this.searchParams.get('per_page');
    }
}

export { ImgsSearchApiService };