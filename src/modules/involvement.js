import commentCounter from './commentCount.js';

const appId = 'MkVxBIukKyzNPTtQYW83';
const involvementUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

const postComment = async (mealId, name, comm) => {
  const url = `${involvementUrl}apps/${appId}/comments`;
  console.log(name)
  console.log(comm)
  const data = { item_id: `section-${mealId}`, username: name, comment: comm };

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response.text();
};

const displayComments = async (meal) => {
  const commentDisplay = document.getElementById(`display-${meal.idMeal}`);
  const getComments = async (url) => {
    const response = await fetch(url);
    const commentArray = await response.json();
    return commentArray;
  };

  const comments = await getComments(`${involvementUrl}apps/${appId}/comments?item_id=section-${meal.idMeal}`);

  const commentsContainer = document.getElementById(`container-${meal.idMeal}`);
  commentsContainer.innerHTML = '';

  if(comments.length > 0){
    comments.forEach((element) => {
    const comment = document.createElement('p');
    comment.innerHTML = `${element.creation_date} ${element.username}: ${element.comment}`;
    commentsContainer.appendChild(comment);
  });
  }
  commentDisplay.firstElementChild.textContent = `Comments (${commentCounter(meal)})`;
};
export { postComment, displayComments };