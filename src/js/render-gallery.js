import { getRefs } from './get-refs';
const refs = getRefs();

function renderGallery({ hits }) {
    const imgsMarkup = hits
        .map((el) => {
            const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = el;
            return `
                <div class="photo-card">
                    <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${downloads}
                        </p>
                    </div>
                </div>
            `
        })
        .join('');
    
    refs.gallery.insertAdjacentHTML('beforeend', imgsMarkup);
}

function resetGallery() {
    refs.gallery.innerHTML = "";
}

export { renderGallery, resetGallery };