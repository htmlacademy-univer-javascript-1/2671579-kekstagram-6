// Функция для проверки длины строки. Она принимает строку,
// которую нужно проверить, и максимальную длину и возвращает true,
// если строка меньше или равна указанной длине, и false, если строка длиннее.

const checkLengthString = (string, length) => string.length <= length;

checkLengthString('проверяемая строка', 20);
checkLengthString('проверяемая строка', 18);
checkLengthString('проверяемая строка', 10);

// Функция для проверки, является ли строка палиндромом.

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


//Делу — время

const isMeetingInWorkHours = (workStart, workEnd, meetingStart, meetingDuration) => {
  function hoursToMinutes (time) {
    const [hoursString, minutesString] = time.split(':');
    const hours = parseInt(hoursString, 10);
    const minutes = parseInt(minutesString, 10);
    return hours * 60 + minutes;
  }

  const workStartMinutes = hoursToMinutes(workStart);
  const workEndMinutes = hoursToMinutes(workEnd);
  const meetingStartMinutes = hoursToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
};

isMeetingInWorkHours('08:00', '17:30', '14:00', 90); // true
isMeetingInWorkHours('8:0', '10:0', '8:0', 120);     // true
isMeetingInWorkHours('08:00', '14:30', '14:00', 90); // false
isMeetingInWorkHours('14:00', '17:30', '08:0', 90);  // false
isMeetingInWorkHours('8:00', '17:30', '08:00', 900); // false
