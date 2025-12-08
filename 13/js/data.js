import {generateCommentId, getRandomInteger, getRandomArrayElement, photoIdGenerator} from './util.js';
const NAMES = [
  'Артём',
  'Ольга',
  'Иван',
  'Екатерина',
  'Дмитрий',
  'Марина',
  'Сергей',
  'Наталья',
  'Алексей',
  'Татьяна'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createComments = () => Array.from({length: getRandomInteger(0, 30)}, createComment);

const createPhoto = () => {
  const i = photoIdGenerator();
  return {
    id: i,
    url: `photos/${i}.jpg`,
    description: 'Счастье в моменте',
    likes: getRandomInteger(15, 200),
    comments: createComments()
  };
};

const createPhotos = () =>Array.from({length: 25}, createPhoto);

export {createPhotos};
