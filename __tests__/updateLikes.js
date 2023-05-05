/* eslint-disable no-unused-vars */
const likesEndpoint = '/api/likes'; // Replace with the actual endpoint

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
    console.error('Error updating likes:', error);
  }
}

async function getLikes(mealId, spanel) {
  try {
    const response = await fetch(likesEndpoint);
    const data = await response.json();
    const likesData = data.find((el) => el.item_id === mealId);

    if (!likesData || likesData.likes === 0) {
      spanel.innerHTML = '0 likes';
    } else if (likesData.likes === 1) {
      spanel.innerHTML = '1 like';
    } else {
      spanel.innerHTML = `${likesData.likes} likes`;
    }
  } catch (error) {
    console.error('Error getting likes:', error);
  }
}
export default (updateLikes);