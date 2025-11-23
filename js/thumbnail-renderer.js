import {createPhotos} from './data.js';

const picturesContener = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photos = createPhotos();
const picturesFragment = document.createDocumentFragment();

photos.forEach(({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments;
  picturesFragment.appendChild(pictureElement);
});

picturesContener.appendChild(picturesFragment);
