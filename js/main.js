const cartButton = document.querySelector("#cart-button"),
      modal = document.querySelector(".modal"),
      close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

// day 1

const buttonAuth = document.querySelector('.button-auth'),
      modalAuth = document.querySelector('.modal-auth'),
      closeAuth = document.querySelector('.close-auth'),
      logInForm = document.querySelector('#logInForm'),
      loginInput = document.querySelector('#login'),
      passwordInput = document.querySelector('#password'),
      
      userName = document.querySelector('.user-name'),
      buttonOut = document.querySelector('.button-out'),

      cardsRestaurants = document.querySelector('.cards-restaurants');

let login = localStorage.getItem('login');

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

function authorized() {
  console.log('Auth');
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  userName.textContent = login;

  function exit() {
    login = null;
    localStorage.removeItem('login'); // выход и удаление из ls

    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', exit)
    checkAuth();
  }
  buttonOut.addEventListener('click', exit)
}

function notAuthorized() {
  console.log('No auth')
// тут сделать проверку на пустой логин
  function logIn(event) {
    login = loginInput.value;
    localStorage.setItem('login', login);

    event.preventDefault();
    
    toggleModalAuth();
    // Удаляем обработчики событий для корректной работы
    buttonAuth.removeEventListener('click', toggleModalAuth);
    closeAuth.removeEventListener('click', toggleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    logInForm.reset();
    checkAuth();
  }

  function checkLengthLogin(event) {
    if (loginInput.value) {
      logIn()
    } else {
      event.preventDefault();
      alert('Введите логин!');
    }
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', checkLengthLogin);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}
checkAuth();


function createCardRestaurant() {
  const card = `
    <a href="restaurant.html" class="card card-restaurant">

      <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">

        <div class="card-heading">
          <h3 class="card-title">Тануки</h3>
          <span class="card-tag tag">60 мин</span>
        </div>

        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 1 200 ₽</div>
          <div class="category">Суши, роллы</div>
        </div>

      </div>
    </a>`;

    // Этот метод работает быстрее чем innerHTML. Он не переписывает имеющуюся верстку
    cardsRestaurants.insertAdjacentHTML()
}

createCardRestaurant()