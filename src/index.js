import PixabayApiService from './js/apiService';
import galleryTemplate from './templates/gallery-template.hbs';
import './sass/main.scss';

const refs = {
  input: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const pixabayApiService = new PixabayApiService();

refs.input.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearImagesContainer();
  pixabayApiService.query = e.currentTarget.elements.query.value;
  pixabayApiService.resetPage();

  return pixabayApiService
    .fetchImages()
    .then(renderPage)
    .catch(error => console.log(error));
}

function scrollToButton() {
  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function onLoadMore() {
  return pixabayApiService
    .fetchImages()
    .then(renderPage)
    .then(scrollToButton)
    .catch(error => console.log(error));
}

function renderPage(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryTemplate(hits));
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}
