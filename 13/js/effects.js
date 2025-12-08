const form = document.querySelector('.img-upload__form');
const previewImage = form.querySelector('.img-upload__preview img');

const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControlValue = form.querySelector('.scale__control--value');

let currentScale = 55;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const updateScale = (value) => {
  previewImage.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

scaleControlSmaller.addEventListener('click', () => {
  currentScale = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
  updateScale(currentScale);
});

scaleControlBigger.addEventListener('click', () => {
  currentScale = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
  updateScale(currentScale);
});

updateScale(currentScale);

const effectLevelSliderContainer = form.querySelector('.effect-level__slider');
const effectLevelInput = form.querySelector('.effect-level__value');
const effectsRadio = form.querySelectorAll('.effects__radio');

let currentEffect = 'none';
let slider;

const EFFECTS = {
  none: { min: 0, max: 0, step: 0, unit: '', filter: () => '' },
  chrome: { min: 0, max: 1, step: 0.1, unit: '', filter: (value) => `grayscale(${value})` },
  sepia: { min: 0, max: 1, step: 0.1, unit: '', filter: (value) => `sepia(${value})` },
  marvin: { min: 0, max: 100, step: 1, unit: '%', filter: (value) => `invert(${value}%)` },
  phobos: { min: 0, max: 3, step: 0.1, unit: 'px', filter: (value) => `blur(${value}px)` },
  heat: { min: 1, max: 3, step: 0.1, unit: '', filter: (value) => `brightness(${value})` },
};

const createSlider = (effect) => {
  if (slider) {
    slider.destroy();
  }

  if (effect === 'none') {
    effectLevelSliderContainer.style.display = 'none';
    previewImage.style.filter = '';
    effectLevelInput.value = '';
    return;
  }

  effectLevelSliderContainer.style.display = 'block';

  slider = noUiSlider.create(effectLevelSliderContainer, {
    range: {
      min: EFFECTS[effect].min,
      max: EFFECTS[effect].max,
    },
    start: EFFECTS[effect].max,
    step: EFFECTS[effect].step,
    connect: 'lower',
  });

  slider.on('update', (values) => {
    const value = values[0];
    previewImage.style.filter = EFFECTS[effect].filter(value);
    effectLevelInput.value = value;
  });
};

effectsRadio.forEach((radio) => {
  radio.addEventListener('change', () => {
    currentEffect = radio.value;
    createSlider(currentEffect);
  });
});

createSlider(currentEffect);
