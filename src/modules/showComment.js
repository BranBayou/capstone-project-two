import commentsCounter from './countComment.js';
import fetchComment from './loadComments.js';

const showComment = async (itemId) => {
  const comments = await fetchComment(itemId);
  const commentList = document.getElementById('all-comments');
  commentsCounter(comments);
  commentList.innerHTML = '';
  comments.forEach((c) => {
    commentList.innerHTML += `<li>${c.creation_date} ${c.username}: ${c.comment}</li>`;
  });
};
export default showComment;