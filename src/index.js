import './css/mainCss.css';
import './css/reservation.css';
import { displayComments, postComment } from './modules/involvement.js';
import { mealCounter } from './modules/mealCounter.js';

const mealsEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s';
const likesEndpoint = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/MkVxBIukKyzNPTtQYW83/likes';
const cardsContainer = document.getElementById('cards');

async function updateLikes(mealId) {
  try {
    await fetch(likesEndpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ item_id: mealId }),
    });
  } catch (error) {
    throw ('Error updating likes:', error);
  }
}
async function getLikes(mealId, spanel) {
  try {
    const response = await fetch(likesEndpoint);
    const data = await response.json();
    Array.from(data).forEach((el) => {
      if (el.item_id === mealId) {
        const countOfLikes = el.likes;
        if (countOfLikes === 1) {
          spanel.innerHTML = `${countOfLikes} like`;
        } else if (countOfLikes === 0) {
          spanel.innerHTML = '0 likes';
        } else {
          spanel.innerHTML = `${countOfLikes} likes`;
        }
      }
    });
    // console.log(data);
  } catch (error) {
    throw ('Error updating likes:', error);
  }
}

fetch(mealsEndpoint)
  .then((response) => response.json())
  .then((data) => {
    const meals = data.meals.slice(0, 6); // get the first 6 meals from the data

    meals.forEach((meal) => {
      const card = document.createElement('div');
      card.className = 'card';

      const imageContainer = document.createElement('div');
      imageContainer.className = 'image-container';

      const image = document.createElement('img');
      image.src = meal.strMealThumb;
      image.alt = meal.strMeal;

      imageContainer.appendChild(image);

      const title = document.createElement('div');
      title.className = 'title';

      const heading = document.createElement('h2');
      heading.textContent = meal.strMeal;

      const likeBtn = document.createElement('button');
      likeBtn.className = 'like';
      likeBtn.innerHTML = '<span class="material-symbols-outlined">thumb_up</span>';

      const likeCounter = document.createElement('span');
      likeCounter.className = 'like-counter';
      // likeCounter.textContent = 'Loading...';
      title.appendChild(heading);
      title.appendChild(likeBtn);
      title.appendChild(likeCounter);

      const comments = document.createElement('div');
      comments.className = 'comments';

      const commentBtn = document.createElement('button');
      commentBtn.className = 'comment';
      commentBtn.textContent = 'Comments';

      const reserveBtn = document.createElement('button');
      reserveBtn.className = 'reserve';
      reserveBtn.textContent = 'Reservations';

      comments.appendChild(commentBtn);
      comments.appendChild(reserveBtn);

      card.appendChild(imageContainer);
      card.appendChild(title);
      card.appendChild(comments);

      // Append the card to the section
      cardsContainer.appendChild(card);
      // popup window
      mealCounter(meal);

      const popupSection = document.createElement('section');
      popupSection.setAttribute('id', `popup-modal-${meal.idMeal}`);
      popupSection.classList.add('modal');
      popupSection.innerHTML = `
                                  <div class="popup-con">
                                    <div class="top">
                                      <span class="close">&times;</span>
                                      <img class="popup-img" src="${meal.strMealThumb}" alt="">
                                      <h2>${meal.strMeal}</h2>
                                      <div class="meal-info"></div>
                                    </div>
                                    <div class="comment-list" id="display-${meal.idMeal}">
                                      <h3>Comments(0)</h3>
                                      <div class="comments-container" id="container-${meal.idMeal}">
                                      
                                      </div>
                                    </div>
                                    <div class="bottom">
                                      <h3>Add comment</h3>
                                      <form class="form">
                                        <input type="text" id='customer_name_${meal.idMeal}' placeholder="your name">
                                        <input class="txt-area" id ='customer_msg_${meal.idMeal}' type="text-area" placeholder="your insights">
                                        <button class="add-comment" type="submit">Add comment</button>
                                      </form>
                                    </div>
                                  </div>
                                  `;

      document.body.appendChild(popupSection);
      const form = popupSection.querySelector('form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById(`customer_name_${meal.idMeal}`).value;
        const comment = document.getElementById(`customer_msg_${meal.idMeal}`).value;
        postComment(meal.idMeal, username, comment).then(() => {
          displayComments(meal);
        });
        form.reset();
      });

      commentBtn.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById(`popup-modal-${meal.idMeal}`).style.display = 'block';
        displayComments(meal);
      });

      // add click event listener to the like button
      getLikes(meal.idMeal, likeCounter);

      likeBtn.addEventListener('click', async () => {
        // increment the like counter
        likeCounter.textContent = parseInt(likeCounter.textContent, 10) + 1;
        await updateLikes(meal.idMeal);
        getLikes(meal.idMeal, likeCounter);
      });
    });
    const closeBtn = document.querySelectorAll('.close');
    closeBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal');
        // eslint-disable-next-line no-return-assign
        modals.forEach((modal) => modal.style.display = 'none');
      });
    });
  })
  .catch((error) => {
    throw ('Error fetching data:', error);
  });