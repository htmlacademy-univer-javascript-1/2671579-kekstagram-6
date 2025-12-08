const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createIdGenerator = () => {
  let lastGeneratorId = 0;
  return function () {
    lastGeneratorId += 1;
    return lastGeneratorId;
  };
};

const generateCommentId = createIdGenerator();

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length-1)];

const photoIdGenerator = createIdGenerator();

const isEscapeKey = (evt) => evt.key === 'Escape';

export {generateCommentId, getRandomInteger, getRandomArrayElement, photoIdGenerator, isEscapeKey};
