const mealCounter = () => {
  const itemCounter = document.querySelectorAll('.cards');
  const counter = document.getElementById('meal-counter');
  counter.innerText = itemCounter.length;
  return itemCounter.length;
  mealCounter(meal);
};

// eslint-disable-next-line import/prefer-default-export
export { mealCounter };
