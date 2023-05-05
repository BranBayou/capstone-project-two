const likeButton = document.querySelector('.like');
const likeCounter = document.querySelector('.like-counter');
const API_ENDPOINT = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/sSQBHDmEpto56ZRQiCmD/likes';
const itemId = 'your_item_id_here'; // replace with the actual item id

// Get the initial number of likes from the API
fetch(`${API_ENDPOINT}?item_id=${itemId}`)
  .then((response) => response.json())
  .then((likes) => {
    likeCounter.textContent = likes.length;
  })
  .catch((error) => {
    console.error('Error fetching likes:', error);
  });

// Listen to clicks on the like button
likeButton.addEventListener('click', () => {
  fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: itemId }),
  })
    .then((response) => response.json())
    .then((likes) => {
      likeCounter.textContent = likes.length;
    })
    .catch((error) => {
      console.error('Error updating likes:', error);
    });
});

export default {
  updateLikeCounter: () => {
    // code for updating like counter
  },
  likeButtonListener: () => {
    // code for like button listener
  },
};
