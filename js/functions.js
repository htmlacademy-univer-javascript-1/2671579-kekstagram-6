const checkLengthString = (string, length) => string.length <= length;
checkLengthString('проверяемая строка', 20);
checkLengthString('проверяемая строка', 18);
checkLengthString('проверяемая строка', 10);

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
checkStringForPalindrome('Лёша на полке клопа нашёл ');
