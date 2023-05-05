import postComment from './postComment.js';
import showComments from './showComment.js';

const addNewComment = async (itemId, username, comment) => {
  const newComment = {
    item_id: itemId,
    username,
    comment,
  };
  await postComment(newComment);
  await showComments(itemId);
};

export default addNewComment;