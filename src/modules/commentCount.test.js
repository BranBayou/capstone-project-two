const commentCounter = require('./commentCount.js');

describe('commentCounter', (meal) => {
  test('displays the correct comment count', () => {
    // Arrange
    const comments = ['Comment 1', 'Comment 2', 'Comment 3'];

    // Act
    commentCounter(comments);

    // Assert
    expect(document.querySelectorAll(`#container-${meal.idMeal} > p`).textContent).toBe('3');
  });
});