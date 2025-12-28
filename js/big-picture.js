import { isEscapeKey } from './util.js';

const COMMENT_PER_PORTION = 5;

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

let currentComments = [];
let shownCommentsCount = 0;

let shownCountSpan = commentCountBlock.querySelector('.social__comment-shown-count');
let totalCountSpan = commentCountBlock.querySelector('.social__comment-total-count');

if (!shownCountSpan) {
  shownCountSpan = document.createElement('span');
  shownCountSpan.classList.add('social__comment-shown-count');
  commentCountBlock.prepend(shownCountSpan, document.createTextNode(' из '));
}

if (!totalCountSpan) {
  totalCountSpan = document.createElement('span');
  totalCountSpan.classList.add('social__comment-total-count');
  commentCountBlock.append(totalCountSpan, document.createTextNode(' комментариев'));
}

const clearComments = () => {
  commentsListElement.innerHTML = '';
};

const renderCommentsPortion = () => {
  const fragment = document.createDocumentFragment();
  const nextPortion = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENT_PER_PORTION);

  nextPortion.forEach(({ avatar, name, message }) => {
    const commentElement = commentTemplate.cloneNode(true);

    const img = commentElement.querySelector('.social__picture');
    const text = commentElement.querySelector('.social__text');

    img.src = avatar;
    img.alt = name;
    text.textContent = message;

    fragment.appendChild(commentElement);
  });

  commentsListElement.appendChild(fragment);

  shownCommentsCount += nextPortion.length;

  shownCountSpan.textContent = shownCommentsCount;
  totalCountSpan.textContent = currentComments.length;

  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

commentsLoader.addEventListener('click', () => {
  renderCommentsPortion();
});

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

  currentComments = comments;
  shownCommentsCount = 0;
  clearComments();

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  renderCommentsPortion();

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
