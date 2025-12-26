import {isEscapeKey} from './util.js';
import {sendPhoto} from './api.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';
import {resetEffects} from './effects.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const HASHTAG_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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

const previewImage = form.querySelector('.img-upload__preview img');
const effectPreviews = form.querySelectorAll('.effects__preview');

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

const stopEscPropagation = (evt) => {
  evt.stopPropagation();
};

hashtagInput.addEventListener('keydown', stopEscPropagation);
commentInput.addEventListener('keydown', stopEscPropagation);

closeButton.addEventListener('click', closeForm);

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const tags = value.trim().toLowerCase().split(/\s+/);
  const hashtagPattern = /^#[a-zа-я0-9]{1,19}$/i;

  if (tags.length > HASHTAG_MAX_COUNT) {
    return false;
  }

  if (tags.some((tag) => !hashtagPattern.test(tag))) {
    return false;
  }

  const uniqueTags = new Set(tags);
  if (uniqueTags.size !== tags.length) {
    return false;
  }

  return true;
};

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Неверный формат хэштегов. Пример: #Cat. Максимум 5 тегов.'
);

const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(
  commentInput,
  validateComment,
  'Комментарий не должен превышать 140 символов.'
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
