const commentsCounter = (comments) => {
  modal.querySelector('#totalCom').textContent = comments.length;
};

export default commentsCounter;