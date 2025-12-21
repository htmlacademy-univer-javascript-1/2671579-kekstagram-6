import {getPhotos} from './api.js';
import {renderPictures} from './pictures.js';
import {showAlert} from './util.js';
import './form.js';
import './effects.js';

getPhotos()
  .then((photos) => {
    renderPictures(photos);
  })
  .catch((err) => {
    showAlert(err.message);
  });
