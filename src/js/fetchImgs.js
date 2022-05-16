const BASE_URL = "https://pixabay.com/api";
const API_KEY = "27444041-6ebfb7763dac999969343312e";

const searchParams = new URLSearchParams({
    key: API_KEY,
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true"
});

function fetchImgs() {
    return fetch(`${BASE_URL}/?${searchParams}`)
        .then(response => response.json())
}

export { fetchImgs, searchParams };