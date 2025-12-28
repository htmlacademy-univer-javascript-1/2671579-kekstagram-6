import {isEscapeKey} from './util.js';

const showMessage = (templateId, buttonClass) => {
  const template = document.querySelector(templateId).content.cloneNode(true);
  const message = template.querySelector('section');

  message.style.position = 'fixed';
  message.style.top = '50%';
  message.style.left = '50%';
  message.style.transform = 'translate(-50%, -50%)';
  message.style.zIndex = '1000';
  message.style.display = 'flex';
  message.style.justifyContent = 'center';
  message.style.alignItems = 'center';
  message.style.minWidth = '300px';
  message.style.minHeight = '100px';
  message.style.textAlign = 'center';

  document.body.append(message);

  const onEsc = (evt) => {
    if (isEscapeKey(evt)) {
      remove();
    }
  };

  function remove () {
    message.remove();
    document.removeEventListener('keydown', onEsc);
  }

  message.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(buttonClass) || evt.target === message) {
      remove();
    }
  });

  document.addEventListener('keydown', onEsc);
};

const showSuccessMessage = () => showMessage('#success', 'success__button');
const showErrorMessage = () => showMessage('#error', 'error__button');

export {showSuccessMessage, showErrorMessage};
