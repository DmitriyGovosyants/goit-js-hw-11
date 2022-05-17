import { getRefs } from './get-refs';
const refs = getRefs();

function loadMoreBtnHidden() {
    refs.loadMoreBtn.classList.add('is-hidden');
}

function loadMoreBtnVisible() {
    refs.loadMoreBtn.classList.remove('is-hidden');
}

export { loadMoreBtnHidden, loadMoreBtnVisible };