import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImgs, searchParams } from './js/fetchImgs';

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
}

refs.searchForm.addEventListener('submit', onClick);

function onClick(e) {
    e.preventDefault();

    const currentRequest = e.currentTarget.elements.searchQuery.value.trim();
    searchParams.set('q', currentRequest);

    fetchImgs()
        .then(data => {
            if (!data.total) {
                return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }
            console.log(data.hits)
            renderImgs(data);
        })
}

function renderImgs({hits}) {
    const imgsMarkup = hits
        .map((el) => {
            const { webformatURL, tags, likes, views, comments, downloads } = el;
            return `
                <div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
    refs.gallery.innerHTML = imgsMarkup;
}
