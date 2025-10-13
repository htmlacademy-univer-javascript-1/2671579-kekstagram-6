// Функция для проверки длины строки. Она принимает строку,
// которую нужно проверить, и максимальную длину и возвращает true,
// если строка меньше или равна указанной длине, и false, если строка длиннее.
// Эта функция нам пригодится для валидации формы.

const checkLengthString = (string, length) => string.length <= length;

checkLengthString('проверяемая строка', 20);
checkLengthString('проверяемая строка', 18);
checkLengthString('проверяемая строка', 10);

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

checkStringForPalindrome('топот');
checkStringForPalindrome('ДовОд');
checkStringForPalindrome('Кекс');
checkStringForPalindrome('Лёша на полке клопа нашёл');
