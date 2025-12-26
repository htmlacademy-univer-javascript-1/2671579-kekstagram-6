import {getPhotos} from './api.js';
import {renderPictures} from './pictures.js';
import {initFilters} from './filters.js';
import {showAlert} from './util.js';
import './form.js';
import './effects.js';

getPhotos()
  .then((photos) => {
    renderPictures(photos);
    initFilters(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });
