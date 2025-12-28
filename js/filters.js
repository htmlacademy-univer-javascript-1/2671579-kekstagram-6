import {renderPictures} from './pictures.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;
const MAX_RANDOM_PHOTOS = 10;

const filtersContainer = document.querySelector('.img-filters');
const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');

const sortByDiscussed = (photos) =>
  photos.slice().sort((a, b) => b.comments.length - a.comments.length);

const sortByRandom = (photos) =>
  photos.slice().sort(() => Math.random() - 0.5).slice(0, MAX_RANDOM_PHOTOS);

const clearActiveButton = () => {
  filterButtons.forEach((button) =>
    button.classList.remove('img-filters__button--active')
  );
};

const setActiveButton = (button) => {
  clearActiveButton();
  button.classList.add('img-filters__button--active');
};

const debouncedRender = debounce(renderPictures, RERENDER_DELAY);

const initFilters = (photos) => {
  filtersContainer.classList.remove('img-filters--inactive');

  filtersContainer.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');
    if (!button) {
      return;
    }

    setActiveButton(button);

    let filteredPhotos = photos;

    if (button.id === 'filter-random') {
      filteredPhotos = sortByRandom(photos);
    }

    if (button.id === 'filter-discussed') {
      filteredPhotos = sortByDiscussed(photos);
    }

    debouncedRender(filteredPhotos);
  });
};

export {initFilters};
