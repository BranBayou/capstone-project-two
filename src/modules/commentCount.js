const commentCounter = (meal) => {
  const commentItems = document.querySelectorAll(`#container-${meal.idMeal} > p`);
  return commentItems.length;
};

export default commentCounter;