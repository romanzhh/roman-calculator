const input = document.querySelector('.value');
const inputValue = input.querySelector('span');

const expression = [];
const buttons = document.querySelectorAll('input');

const digits = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

buttons.forEach((button) => {
  const value = button.value;

  button.addEventListener('pointerup', () => {
    if (value === 'Back') {
      inputValue.innerHTML = inputValue.innerHTML.slice(0, -1);
      expression.pop();
      return;
    }
    
    if (digits[value]) {
      expression.push(digits[value]);
    } else {
      expression.push(value);
    }

    if (value === '=') {
      inputValue.innerHTML = expression[0] + expression[2];
    }

    inputValue.innerHTML += value;
  });
});
