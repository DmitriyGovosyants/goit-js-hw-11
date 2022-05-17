import './sass/main.scss';
import { noFindMessage, galleryEndMessage, totalImgMessage } from './js/notify-message';
import { ImgsSearchApiService } from './js/search-imgs-api-service';
import { getRefs } from './js/get-refs';
import { renderGallery, resetGallery } from './js/render-gallery';
import { loadMoreBtnHidden, loadMoreBtnVisible } from './js/load-more-btn';

const imgAPI = new ImgsSearchApiService();
const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
loadMoreBtnHidden();

function onSearch(e) {
    e.preventDefault();

    const currentRequest = e.currentTarget.elements.searchQuery.value.trim();
    loadMoreBtnHidden();
    resetGallery();
    imgAPI.resetPage();
    imgAPI.setSearchParams(currentRequest);
    
    imgAPI.fetchImgs()
        .then(data => {
            if (data.total === 0) {
                return noFindMessage();
            }
            renderGallery(data);
            loadMoreBtnVisible();
            totalImgMessage(data);
            checkGalleryEndPoint(data);
        });
}

function onLoadMore() {
    loadMoreBtnHidden()
    imgAPI.fetchImgs().then(data => {
        renderGallery(data);
        loadMoreBtnVisible();
        checkGalleryEndPoint(data);
    });
}

function checkGalleryEndPoint(data) {
    if (imgAPI.currentGalleryPoint >= data.totalHits) {
        galleryEndMessage();
        loadMoreBtnHidden();
    }
}