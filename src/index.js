import './sass/main.scss';
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
        return data;
    })
}

