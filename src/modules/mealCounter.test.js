import { mealCounter } from './mealCounter.js';
// Import the jsdom package
const jsdom = require('jsdom');

// Configure jsdom
const { JSDOM } = jsdom;
const { document } = new JSDOM('<!doctype html><html><body></body></html>').window;
global.document = document;

// Import the function you want to test
describe('mealCounter', () => {
  beforeEach(() => {
    // Set up a test DOM
    document.body.innerHTML = `
      <div id="meal-counter"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
    `;
  });

  afterEach(() => {
    // Clean up the test DOM
    document.body.innerHTML = '';
  });

  test('should update the meal counter text to the correct count', () => {
    const count = mealCounter();
    const counter = document.getElementById('meal-counter');

    expect(counter.textContent).toBe(`${count}`);
  });

  test('should return the correct count', () => {
    const count = mealCounter();

    expect(count).toBe(3);
  });
});
