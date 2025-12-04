import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureLikesElement = bigPictureElement.querySelector('.likes-count');
const bigPictureCommentsCountElement = bigPictureElement.querySelector('.comments-count');
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');

const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentTemplate = commentsListElement.querySelector('.social__comment');

const commentCountBlock = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');

const closeButton = bigPictureElement.querySelector('.big-picture__cancel');

const clearComments = () => {
  commentsListElement.innerHTML = '';
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach(({ avatar, name, message }) => {
    const commentElement = commentTemplate.cloneNode(true);

    const img = commentElement.querySelector('.social__picture');
    const text = commentElement.querySelector('.social__text');

    img.src = avatar;
    img.alt = name;
    text.textContent = message;

    fragment.appendChild(commentElement);
  });

  commentsListElement.appendChild(fragment);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function renderBigPicture({ url, description, likes, comments }) {
  bigPictureImgElement.src = url;
  bigPictureImgElement.alt = description;

  bigPictureLikesElement.textContent = likes;
  bigPictureCommentsCountElement.textContent = comments.length;
  bigPictureDescriptionElement.textContent = description;

  clearComments();
  renderComments(comments);

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  clearComments();

  document.removeEventListener('keydown', onDocumentKeydown);
}

closeButton.addEventListener('click', () => {
  closeBigPicture();
});

export {renderBigPicture};
