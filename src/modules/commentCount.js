const commentCounter = (meal) => {
  const commentItems = document.querySelectorAll(`#container-${meal.idMeal} > p`);
  return commentItems.length;
};

// eslint-disable-next-line import/prefer-default-export
export { commentCounter };