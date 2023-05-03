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
    });
  })
  .catch((error) => {
    console.error(error);
  });
