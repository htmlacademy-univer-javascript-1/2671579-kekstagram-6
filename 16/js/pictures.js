import {renderBigPicture} from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (photos) => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const picture = pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments.length;

    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      renderBigPicture(photo);
    });

    fragment.appendChild(picture);
  });

  picturesContainer.appendChild(fragment);
};

export {renderPictures};
