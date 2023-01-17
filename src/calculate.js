import numerals from './numerals.js';

const sortedNumerals = Object.entries(numerals)
  .sort(([, arabic1], [, arabic2]) => Math.sign(arabic2 - arabic1));

const toRoman = (number) => {
  let digit = number;
  const result = [];

  for (const [roman, arabic] of sortedNumerals) {
    const repetitionsCount = Math.floor(digit / arabic);
    digit -= repetitionsCount * arabic;
    result.push(roman.repeat(repetitionsCount));
  }

  return result.join('');
};

const toArabic = (romanNumber) => {
  let result = 0;
  let currentLine = romanNumber;

  for (const [roman, arabic] of sortedNumerals) {
    while (currentLine.indexOf(roman) === 0) {
      result += arabic;
      currentLine = currentLine.slice(roman.length);
    }
  }

  if (toRoman(result) !== romanNumber) {
    return false;
  }

  return result;
};

const getSigns = (expression) => {
  const signs = [];

  for (let i = 0; i < expression.length; i += 1) {
    if (expression[i].match(/[+\-×÷=]/g)) {
      signs.push(expression[i]);
    }
  }

  return signs;
};

export default (exp) => {
  let expression = exp;

  const signs = getSigns(expression);

  for (let i = 0; i < expression.length; i += 1) {
    if (expression[i].match(/[+\-×=]/g)) {
      expression = expression.split(expression[i]);
    }
  }

  expression.forEach((el) => {
    const newEl = toArabic(el);
    const index = expression.indexOf(el);
    expression[index] = newEl;
  });

  for (let i = 100; i >= 1; i -= 1) {
    const sign = signs[0];
    let tmp;

    switch (sign) {
      case '+': {
        tmp = expression[0] + expression[1];
        expression[1] = tmp;
        expression.shift();
        break;
      }
      case '-': {
        tmp = expression[0] - expression[1];
        expression[1] = tmp;
        expression.shift();
        break;
      }
      case '×': {
        tmp = expression[0] * expression[1];
        expression[1] = tmp;
        expression.shift();
        break;
      }
      default:
        break;
    }

    signs.shift();
  }

  return expression < 0 ? 'Wrong number!' : toRoman(expression);
};
