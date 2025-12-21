import {isEscapeKey} from './util.js';

const showMessage = (templateId, buttonClass) => {
  const template = document.querySelector(templateId).content.cloneNode(true);
  const message = template.querySelector('section');

  document.body.append(message);

  function remove () {
    message.remove();
    document.removeEventListener('keydown', onEsc);
  }

  function onEsc (evt) {
    if (isEscapeKey(evt)) {
      remove();
    }
  }

  message.addEventListener('click', (evt) => {
    if (
      evt.target.classList.contains(buttonClass) ||
      evt.target === message
    ) {
      remove();
    }
  });

  document.addEventListener('keydown', onEsc);
};

const showSuccessMessage = () => showMessage('#success', 'success__button');
const showErrorMessage = () => showMessage('#error', 'error__button');

export { showSuccessMessage, showErrorMessage };
