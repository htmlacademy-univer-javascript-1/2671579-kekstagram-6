const form = document.querySelector('.img-upload__form');
const previewImage = form.querySelector('.img-upload__preview img');

const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControlValue = form.querySelector('.scale__control--value');

const effectLevelContainer = form.querySelector('.img-upload__effect-level');
const effectLevelSlider = form.querySelector('.effect-level__slider');
const effectLevelInput = form.querySelector('.effect-level__value');
const effectsRadio = form.querySelectorAll('.effects__radio');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

let currentScale = SCALE_DEFAULT;
let slider = null;

const EFFECTS = {
  none: { min: 0, max: 0, step: 0, filter: () => '' },
  chrome: { min: 0, max: 1, step: 0.1, filter: (value) => `grayscale(${value})` },
  sepia: { min: 0, max: 1, step: 0.1, filter: (value) => `sepia(${value})` },
  marvin: { min: 0, max: 100, step: 1, filter: (value) => `invert(${value}%)` },
  phobos: { min: 0, max: 3, step: 0.1, filter: (value) => `blur(${value}px)` },
  heat: { min: 1, max: 3, step: 0.1, filter: (value) => `brightness(${value})` },
};

const updateScale = (value) => {
  previewImage.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

const resetScale = () => {
  currentScale = SCALE_DEFAULT;
  updateScale(currentScale);
};

scaleControlSmaller.addEventListener('click', () => {
  currentScale = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
  updateScale(currentScale);
});

scaleControlBigger.addEventListener('click', () => {
  currentScale = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
  updateScale(currentScale);
});

const destroySlider = () => {
  if (slider) {
    slider.destroy();
    slider = null;
  }
};

const applyEffect = (effect) => {
  destroySlider();

  if (effect === 'none') {
    effectLevelContainer.classList.add('hidden');
    previewImage.style.filter = '';
    effectLevelInput.value = '';
    return;
  }

  effectLevelContainer.classList.remove('hidden');

  const { min, max, step, filter } = EFFECTS[effect];

  slider = noUiSlider.create(effectLevelSlider, {
    range: { min, max },
    start: max,
    step,
    connect: 'lower',
  });

  effectLevelInput.value = max;

  slider.on('update', ([value]) => {
    const numericValue = Number(value);
    previewImage.style.filter = filter(numericValue);
    effectLevelInput.value = numericValue;
  });
};

effectsRadio.forEach((radio) => {
  radio.addEventListener('change', () => {
    applyEffect(radio.value);
  });
});

const resetEffects = () => {
  effectsRadio.forEach((radio) => {
    radio.checked = radio.value === 'none';
  });

  applyEffect('none');
  resetScale();
};

const initEffects = () => {
  resetEffects();
};

export {resetEffects, initEffects};
