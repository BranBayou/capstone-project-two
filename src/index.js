import './css/mainCss.css';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const { meals } = data;
      if (meals) {
        searchResults.innerHTML = meals.map((meal) => `
          <div class="meal">
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>${meal.strInstructions}</p>
          </div>
        `).join('');
      } else {
        searchResults.innerHTML = '<p>No meals found, try another search query.</p>';
      }
    })
    .catch((error) => console.error(error));
});

const homepage = document.getElementById('');

fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')
  .then(response => response.json())
  .then(data => {
    data.meals.forEach(meal => {
      const contentContainer = document.createElement('div');
      contentContainer.classList.add('content-container');

      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      const image = document.createElement('img');
      image.src = meal.strMealThumb;
      image.alt = meal.strMeal;

      const textContainer = document.createElement('div');
      textContainer.classList.add('text-container');

      const contentName = document.createElement('h3');
      contentName.classList.add('content-name');
      contentName.textContent = meal.strMeal;

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');

      const likeButton = document.createElement('button');
      likeButton.classList.add('like-button');
      likeButton.textContent = 'Like';

      const commentButton = document.createElement('button');
      commentButton.classList.add('comment-button');
      commentButton.textContent = 'Comment';

      const reservationButton = document.createElement('button');
      reservationButton.classList.add('reservation-button');
      reservationButton.textContent = 'Reservation';

      buttonContainer.appendChild(likeButton);
      buttonContainer.appendChild(commentButton);
      buttonContainer.appendChild(reservationButton);

      textContainer.appendChild(contentName);
      textContainer.appendChild(buttonContainer);

      imageContainer.appendChild(image);

      contentContainer.appendChild(imageContainer);
      contentContainer.appendChild(textContainer);

      homepage.appendChild(contentContainer);
    });
  })
  .catch(error => console.error(error));
