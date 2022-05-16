import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImgs, searchParams } from './js/fetchImgs';

const refs = {
    searchForm: document.querySelector('#search-form'),
}

refs.searchForm.addEventListener('submit', onClick);

function onClick(e) {
    e.preventDefault();

    const currentRequest = e.currentTarget.elements.searchQuery.value.trim();
    searchParams.set('q', currentRequest);

    fetchImgs().then(data => {
        if (!data.total) {
            return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        return data;
    })
}

