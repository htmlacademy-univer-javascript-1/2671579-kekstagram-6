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
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'pristine-error'
});

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  commentInput.removeAttribute('maxlength');

  resetEffects();
  document.addEventListener('keydown', onFormEscKeydown);
};

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  form.reset();
  uploadInput.value = '';
  pristine.reset();
  resetEffects();

  document.removeEventListener('keydown', onFormEscKeydown);
};

function onFormEscKeydown(evt) {
  if (isEscapeKey(evt) && !document.querySelector('.error, .success')) {
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

const getHashtagError = (value) => {
  if (!value.trim()) {
    return '';
  }

  const tags = value.trim().toLowerCase().split(/\s+/);

  if (tags.length > HASHTAG_MAX_COUNT) {
    return `Нельзя указать больше ${HASHTAG_MAX_COUNT} хэштегов`;
  }

  if (new Set(tags).size !== tags.length) {
    return 'Хэштеги не должны повторяться';
  }

  for (const tag of tags) {
    if (tag[0] !== '#') {
      return 'Хэштег должен начинаться с #';
    }

    if (tag === '#') {
      return 'Хэштег не может состоять только из #';
    }

    if (!HASHTAG_PATTERN.test(tag)) {
      return 'Хэштег содержит недопустимые символы';
    }
  }

  return '';
};

pristine.addValidator(
  hashtagInput,
  (value) => !getHashtagError(value),
  getHashtagError
);

const validateComment = (value) => value.length <= COMMENT_MAX_LENGTH;

pristine.addValidator(
  commentInput,
  validateComment,
  `Комментарий не должен превышать ${COMMENT_MAX_LENGTH} символов.`
);

hashtagInput.addEventListener('input', () => {
  pristine.validate(hashtagInput);
});

commentInput.addEventListener('input', () => {
  pristine.validate(commentInput);
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate(commentInput);

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

const initForm = () => {};
export {initForm};
