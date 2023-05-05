export default (meal) => {
  const popupSection = document.createElement('section');
      popupSection.setAttribute('id', `popup-modal-${meal.idMeal}`);
      popupSection.classList.add('modal');
      popupSection.classList.add('hidden');
      popupSection.innerHTML = `
                                  <div class="popup-con">
                                    <div class="top">
                                      <span class="close">&times;</span>
                                      <img class="popup-img" src="${meal.strMealThumb}" alt="">
                                      <h2>${meal.strMeal}</h2>
                                      <div class="meal-info"></div>
                                    </div>
                                    <div class="comment-list">
                                      
                                    </div>
                                    <div class="bottom">
                                      <h3>Add comment</h3>
                                      <form action="" class="form">
                                        <input type="text" placeholder="your name">
                                        <input class="txt-area" type="text-area" placeholder="your insights">
                                        <button class="add-comment" type="button">Add comment</button>
                                      </form>
                                    </div>
                                  </div>
                                  `;
return popupSection;
};