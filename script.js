const input = document.querySelector('.value');
const inputValue = input.querySelector('span');

const expression = [];
const digits = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

const calculate = (expression) => {
  return expression;
};

const buttons = document.querySelectorAll('input');
buttons.forEach((button) => {
  const value = button.value;

  button.addEventListener('pointerup', (e) => {
    if (expression.length === 0 && e.target.value.match(/[+\-×÷=]/g)) return;

    switch (value) {
      case 'Back':
        inputValue.innerHTML = inputValue.innerHTML.slice(0, -1);
        expression.pop();
        return;
      case '=':
        inputValue.innerHTML = calculate(expression);
        return;
      case 'Clear':
        inputValue.innerHTML = '';
        expression.splice(0, expression.length);
        return;
    }
    
    
    if (digits[value]) {
      expression.push(digits[value]);
    } else {
      expression.push(value);
    }

    inputValue.innerHTML += value;
  });
});
