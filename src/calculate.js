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
}

export default (expression) => {
  const signs = getSigns(expression);
  
  for (let i = 0; i < expression.length; i += 1) {
    if (expression[i].match(/[+\-×÷=]/g)) {
      expression = expression.split(expression[i]);
    }
  }

  for (const el of expression) {
    const newEl = toArabic(el);
    const index = expression.indexOf(el);
    expression[index] = newEl;
  }

  for (let i = 100; i >= 1; i -= 1) {
    const sign = signs[0];

    switch (sign) {
      case '+':
        const tmp = expression[0] + expression[1];
        expression[1] = tmp;
        expression.shift();
    }

    signs.shift();
  }

  return expression;
};

/* toRoman(expression.reduce((acc, num) => acc + num, 0)) */