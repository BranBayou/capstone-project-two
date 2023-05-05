beforeEach(() => {
  document.body.innerHTML = `
  <section class="cards" id="cards">
  <div class="card"></div>
  <div class="card"></div>
  <div class="card"></div>    
  
  </section>
    `;
});
beforeEach(() => {
    document.body.innerHTML = `
        <a href="" class="menu-link" >
          Movies<span id="shows-count"></span>
        </a>
        <div id="shows-count">
          <div class="show-card"></div>
          <div class="show-card"></div>
          <div class="show-card"></div>
        </div>
    `;
  });