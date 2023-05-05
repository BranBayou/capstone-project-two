import './css/mainCss.css';
import './css/reservation.css';

// Get the section element from the HTML
const section = document.getElementById('cards');

// Make a request to the API
fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
  .then((response) => response.json())
  .then((data) => {
    // Get the first six meals from the API
    const meals = data.meals.slice(0, 6);

    // Create a card for each meal
    meals.forEach((meal) => {
      // Create the elements for the card
      const card = document.createElement('div');
      card.classList.add('card');

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      const image = document.createElement('img');
      image.src = meal.strMealThumb;
      image.alt = meal.strMeal;

      const title = document.createElement('div');
      title.classList.add('title');

      const heading = document.createElement('h2');
      heading.textContent = meal.strMeal;

      const likeButton = document.createElement('button');
      likeButton.classList.add('like');
      likeButton.textContent = '5 Likes';

      const comments = document.createElement('div');
      comments.classList.add('comments');

      const commentButton = document.createElement('button');
      commentButton.classList.add('comment');
      commentButton.textContent = 'Comments';

      const reserveButton = document.createElement('button');
      reserveButton.classList.add('reserve');
      reserveButton.textContent = 'Reservations';

      // Append the elements to the card
      imageContainer.appendChild(image);
      title.appendChild(heading);
      title.appendChild(likeButton);
      comments.appendChild(commentButton);
      comments.appendChild(reserveButton);
      card.appendChild(imageContainer);
      card.appendChild(title);
      card.appendChild(comments);

      // Append the card to the section
      section.appendChild(card);
      // popup window
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
      card.appendChild(popupSection);

      commentButton.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById(`popup-modal-${meal.idMeal}`).style.display = 'block';
      })

      // Event listners for popup
      // const conBtns = document.getElementsByClassName('comment');
      // for (let i = 0; i < conBtns.length; i += 1) {
      //   conBtns[i].addEventListener('click', (event) => {
      //     event.preventDefault();
      //     document.getElementById(`popup-modal-${meal.idMeal}`).style.display = 'block';
      //   });
      // }
      const closeBtn = document.querySelectorAll('.close');
      closeBtn.forEach((btn)=>{
        btn.addEventListener('click', () =>{
          document.querySelector('.modal').style.display = 'none';
        })
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });
