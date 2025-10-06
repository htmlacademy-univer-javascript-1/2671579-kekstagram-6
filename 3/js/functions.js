// Функция для проверки длины строки. Она принимает строку,
// которую нужно проверить, и максимальную длину и возвращает true,
// если строка меньше или равна указанной длине, и false, если строка длиннее.
// Эта функция нам пригодится для валидации формы.

const checkLengthString = (string, length) => string.length <= length;

// Cтрока короче 20 символов
console.log('1. Ожидаю "true", получаю - ', checkLengthString('проверяемая строка', 20));
// Длина строки ровно 18 символов
console.log('2. Ожидаю "true", получаю - ', checkLengthString('проверяемая строка', 18));
// Строка длиннее 10 символов
console.log('3. Ожидаю "true", получаю - ', checkLengthString('проверяемая строка', 10));

// Функция для проверки, является ли строка палиндромом.
// Палиндром — это слово или фраза, которые одинаково читаются
//  и слева направо и справа налево.

const checkStringForPalindrome = (string) => {
  let result = '';
  const cleanString = string.replaceAll(' ', '').toLowerCase();

  for (let i = cleanString.length - 1; i >= 0; i--) {
    result += cleanString[i];
  }

  return result === cleanString;
};


// Строка является палиндромом
console.log('1. Ожидаю "true", получаю - ', checkStringForPalindrome('топот'));
// Несмотря на разный регистр, тоже палиндром
console.log('2. Ожидаю "true", получаю - ', checkStringForPalindrome('ДовОд'));
// Это не палиндром
console.log('3. Ожидаю "false", получаю - ', checkStringForPalindrome('Кекс'));
// Это палиндром
console.log('4. Ожидаю "true", получаю - ', checkStringForPalindrome('Лёша на полке клопа нашёл '));
