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

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createComments = () => Array.from({length: getRandomInteger(0, 30)}, createComment);

const photoIdGenerator = createIdGenerator();

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

const createPhotos = Array.from({length: 25}, createPhoto);

console.log(createPhotos);
