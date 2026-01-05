import {getPhotos} from './api.js';
import {renderPictures} from './pictures.js';
import {initFilters} from './filters.js';
import {showAlert} from './util.js';
import {initForm} from './form.js';
import {initEffects} from './effects.js';

const showDataError = () => {
  let errorBlock = document.querySelector('.data-error');
  if (!errorBlock) {
    errorBlock = document.createElement('div');
    errorBlock.classList.add('data-error');
    errorBlock.textContent = 'Не удалось загрузить фотографии';
    document.body.prepend(errorBlock);
  }
  errorBlock.classList.remove('visually-hidden');

  showAlert('Не удалось загрузить фотографии');
};

initForm();
initEffects();

getPhotos()
  .then((photos) => {
    renderPictures(photos);
    initFilters(photos);
  })
  .catch(() => {
    showDataError();
  });
