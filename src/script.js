import calculate from './calculate.js';

const output = document.querySelector('.output');
const outputValue = output.querySelector('span');

let expression = '';

const buttons = document.querySelectorAll('input');
buttons.forEach((button) => {
  const { value } = button;

  button.addEventListener('pointerup', (e) => {
    if (expression.length === 0 && e.target.value.match(/[+\-×=]/g)) return;

    if (expression.slice(-1).match(/[+\-×=]/g) && e.target.value.match(/[+\-×=]/g)) return;

    switch (value) {
      case 'Back':
        outputValue.innerHTML = outputValue.innerHTML.slice(0, -1);
        expression = expression.slice(0, expression.length - 1);
        return;
      case '=':
        outputValue.innerHTML = calculate(expression);
        expression = calculate(expression);
        return;
      case 'Clear':
        outputValue.innerHTML = '';
        expression = '';
        return;
      default:
    }

    expression += value;

    outputValue.innerHTML += value;
  });
});

const { body } = document;

body.addEventListener('keydown', (e) => {
  const { code } = e;

  if (code.length === 4) {
    const key = code.slice(-1);
    if (key.match(/[IVXLCDM]/g)) {
      outputValue.innerHTML += key;
      expression += key;
    }
  }

  switch (code) {
    case 'Backspace':
      outputValue.innerHTML = outputValue.innerHTML.slice(0, -1);
      expression = expression.slice(0, expression.length - 1);
      break;
    case 'NumpadEnter':
      outputValue.innerHTML = calculate(expression);
      expression = calculate(expression);
      break;
    default:
  }

  if (expression.length > 0) {
    switch (code) {
      case 'NumpadAdd':
        outputValue.innerHTML += '+';
        expression += '+';
        break;
      case 'NumpadSubtract':
        outputValue.innerHTML += '-';
        expression += '-';
        break;
      case 'NumpadMultiply':
        outputValue.innerHTML += '×';
        expression += '×';
        break;
      default:
    }
  }
});
