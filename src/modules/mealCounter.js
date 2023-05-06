const mealCounter = () => {
  const itemCounter = document.querySelectorAll('.card');
  const counter = document.getElementById('meal-counter');

  let count = 0;
  itemCounter.forEach(() => {
    count += 1;
  });

  counter.textContent = count;
  return count;
};

// eslint-disable-next-line import/prefer-default-export
export { mealCounter };
