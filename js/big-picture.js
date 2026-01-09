import {isEscapeKey} from './util.js';

const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const descriptionElement = bigPictureElement.querySelector('.social__caption');

const commentsCountBlock = bigPictureElement.querySelector('.social__comment-count');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

commentsCountBlock.innerHTML = '';

const shownCountElement = document.createElement('span');
shownCountElement.classList.add('social__comment-shown-count');

const totalCountElement = document.createElement('span');
totalCountElement.classList.add('social__comment-total-count');

commentsCountBlock.append(
  shownCountElement,
  document.createTextNode(' из '),
  totalCountElement,
  document.createTextNode(' комментариев')
);

const commentTemplate = commentsListElement.querySelector('.social__comment');

let currentComments = [];
let shownCommentsCount = 0;

const clearComments = () => {
  commentsListElement.innerHTML = '';
};

const updateCommentsCounter = () => {
  shownCountElement.textContent = shownCommentsCount;
  totalCountElement.textContent = currentComments.length;
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();

  const commentsToRender = currentComments.slice(
    shownCommentsCount,
    shownCommentsCount + COMMENTS_PER_PORTION
  );

  commentsToRender.forEach(({ avatar, name, message }) => {
    const commentElement = commentTemplate.cloneNode(true);

    const avatarElement = commentElement.querySelector('.social__picture');
    const textElement = commentElement.querySelector('.social__text');

    avatarElement.src = avatar;
    avatarElement.alt = name;
    textElement.textContent = message;

    fragment.appendChild(commentElement);
  });

  commentsListElement.appendChild(fragment);

  shownCommentsCount += commentsToRender.length;
  updateCommentsCounter();

  if (shownCommentsCount >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = ({ url, description, likes, comments }) => {
  bigPictureImgElement.src = url;
  bigPictureImgElement.alt = description;

  likesCountElement.textContent = likes;
  descriptionElement.textContent = description;

  currentComments = comments;
  shownCommentsCount = 0;

  clearComments();
  renderComments();

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  clearComments();
  document.removeEventListener('keydown', onDocumentKeydown);
}

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
closeButtonElement.addEventListener('click', closeBigPicture);

export {openBigPicture};
