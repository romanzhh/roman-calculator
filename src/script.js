import calculate from './calculate.js';

const input = document.querySelector('.value');
const inputValue = input.querySelector('span');

let expression = '';

const buttons = document.querySelectorAll('input');
buttons.forEach((button) => {
  const { value } = button;

  button.addEventListener('pointerup', (e) => {
    if (expression.length === 0 && e.target.value.match(/[+\-×=]/g)) return;

    if (expression.slice(-1).match(/[+\-×=]/g) && e.target.value.match(/[+\-×=]/g)) return;

    switch (value) {
      case 'Back':
        inputValue.innerHTML = inputValue.innerHTML.slice(0, -1);
        expression = expression.slice(0, expression.length - 1);
        return;
      case '=':
        inputValue.innerHTML = calculate(expression);
        expression = calculate(expression);
        return;
      case 'Clear':
        inputValue.innerHTML = '';
        expression = '';
        return;
      default:
    }

    expression += value;

    inputValue.innerHTML += value;
  });
});
