import './sass/main.scss';
import { noFindMessage, galleryEndMessage, totalImgMessage } from './js/notify-message';
import { ImgsSearchApiService } from './js/search-imgs-api-service';
import { getRefs } from './js/get-refs';
import { loadMoreBtnHidden, loadMoreBtnVisible } from './js/load-more-btn';
import { smoothScroll } from './js/smooth-scroll';
import galleryMarkup from './template/gallery.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const imgAPI = new ImgsSearchApiService();
const refs = getRefs();
const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

loadMoreBtnHidden();

async function onSearch(e) {
    e.preventDefault();

    const currentRequest = e.currentTarget.elements.searchQuery.value.trim();
    loadMoreBtnHidden();
    resetGallery();
    imgAPI.resetPage();
    imgAPI.setSearchParams(currentRequest);
    
    try {
        const data = await imgAPI.fetchImgs();

        if (data.total === 0) {
            return noFindMessage();
        }

        renderGallery(data);
        loadMoreBtnVisible();
        totalImgMessage(data);
        checkGalleryEndPoint(data);
        lightbox.refresh();
    } catch (error) {
        console.log(error.message);
    }
}

async function onLoadMore() {
    loadMoreBtnHidden();

    try {
        const data = await imgAPI.fetchImgs();

        renderGallery(data);
        smoothScroll();
        checkGalleryEndPoint(data);
        lightbox.refresh();
    } catch (error) {
        console.log(error.message);
    }

    loadMoreBtnVisible();
}

function checkGalleryEndPoint(data) {
    if (imgAPI.currentGalleryPoint >= data.totalHits) {
        galleryEndMessage();
        loadMoreBtnHidden();
    }
}

function renderGallery({ hits }) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup(hits));
}

function resetGallery() {
    refs.gallery.innerHTML = "";
}