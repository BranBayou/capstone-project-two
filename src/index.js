import './css/mainCss.css';

// const searchInput = document.getElementById('search-input');
// const searchButton = document.getElementById('search-button');
// const searchResults = document.getElementById('search-results');

// searchButton.addEventListener('click', () => {
//   const query = searchInput.value;
//   const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       const { meals } = data;
//       if (meals) {
//         searchResults.innerHTML = meals.map((meal) => `
//           <div class="meal">
//             <h3>${meal.strMeal}</h3>
//             <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//             <p>${meal.strInstructions}</p>
//           </div>
//         `).join('');
//       } else {
//         searchResults.innerHTML = '<p>No meals found, try another search query.</p>';
//       }
//     })
//     .catch((error) => console.error(error));
// });

const mealsEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s';
const mealDetailsEndpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const cardsContainer = document.getElementById('cards');

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
      likeBtn.textContent = 'Likes';

      const likeCounter = document.createElement('span');
      likeCounter.className = 'like-counter';
      likeCounter.textContent = 'Loading...'; // show a loading message while fetching the likes counter

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

      cardsContainer.appendChild(card);

      // make a request to get the meal details, including the likes counter
      fetch(`${mealDetailsEndpoint}${meal.idMeal}`)
        .then((response) => response.json())
        .then((data) => {
          likeCounter.textContent = data.meals[0].strInstructions.match(/\d+/)[0]; // extract the number of likes from the instructions text
        })
        .catch((error) => {
          console.error('Error fetching meal details:', error);
          likeCounter.textContent = 'N/A'; // show "N/A" if there was an error fetching the likes counter
        });
    });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
