import {isEscapeKey} from './util.js';
import {sendPhoto} from './api.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';
import {resetEffects} from './effects.js';

const HASHTAG_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const previewImage = form.querySelector('.img-upload__preview img');
const effectPreviews = form.querySelectorAll('.effects__preview');

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error'
});

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  form.reset();
  uploadInput.value = '';
  pristine.reset();
  resetEffects();

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

const stopEscPropagation = (evt) => evt.stopPropagation();

hashtagInput.addEventListener('keydown', stopEscPropagation);
commentInput.addEventListener('keydown', stopEscPropagation);

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((ext) => fileName.endsWith(ext));

  if (matches) {
    const imageURL = URL.createObjectURL(file);
    previewImage.src = imageURL;
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${imageURL})`;
    });

    openForm();
  }
});

closeButton.addEventListener('click', closeForm);

const normalizeHashtags = (value) =>
  value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

const validateHashtagFormat = (value) =>
  normalizeHashtags(value).every((tag) => HASHTAG_PATTERN.test(tag));

const validateHashtagCount = (value) =>
  normalizeHashtags(value).length <= HASHTAG_MAX_COUNT;

const validateHashtagUniqueness = (value) => {
  const tags = normalizeHashtags(value);
  return tags.length === new Set(tags).size;
};

pristine.addValidator(
  hashtagInput,
  validateHashtagFormat,
  'Хэштег должен начинаться с # и содержать только буквы и цифры'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagCount,
  `Нельзя указывать больше ${HASHTAG_MAX_COUNT} хэштегов`
);

pristine.addValidator(
  hashtagInput,
  validateHashtagUniqueness,
  'Хэштеги не должны повторяться'
);

const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(
  commentInput,
  validateComment,
  `Комментарий не должен превышать ${COMMENT_MAX_LENGTH} символов.`
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  const submitButton = form.querySelector('.img-upload__submit');
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';

  sendPhoto(new FormData(form))
    .then(() => {
      closeForm();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = 'Опубликовать';
    });
});
