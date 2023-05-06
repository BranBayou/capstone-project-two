import { commentCounter } from './commentCount.js';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

describe('commentCounter', () => {
  let dom;
  beforeEach(() => {
    dom = new JSDOM(`
      <div id="container-1">
        <p>Comment 1</p>
        <p>Comment 2</p>
        <p>Comment 3</p>
      </div>
      <div id="container-2">
        <p>Comment 4</p>
        <p>Comment 5</p>
      </div>
    `);
    global.document = dom.window.document;
  });
  afterEach(() => {
    dom.window.document.body.innerHTML = '';
  });
  test('returns the correct number of comments for a given meal', () => {
    const meal = { idMeal: 1 };
    const commentCount = commentCounter(meal);
    expect(commentCount).toBe(3);
  });
  test('returns 0 if no comments are found for a given meal', () => {
    const meal = { idMeal: 3 };
    const commentCount = commentCounter(meal);
    expect(commentCount).toBe(0);
  });
});
