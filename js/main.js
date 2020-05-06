const cartButton = document.querySelector("#cart-button"),
      modal = document.querySelector(".modal"),
      close = document.querySelector(".close");

const buttonAuth = document.querySelector('.button-auth'),
      modalAuth = document.querySelector('.modal-auth'),
      closeAuth = document.querySelector('.close-auth'),
      logInForm = document.querySelector('#logInForm'),
      loginInput = document.querySelector('#login'),
      passwordInput = document.querySelector('#password'),
      
      userName = document.querySelector('.user-name'),
      buttonOut = document.querySelector('.button-out'),

      cardsRestaurants = document.querySelector('.cards-restaurants'),

      containerPromo = document.querySelector('.container-promo'),
      restaurants = document.querySelector('.restaurants'),
      menu = document.querySelector('.menu'),
      logo = document.querySelector('.logo'),

      cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('login');

function toggleModal() {
  modal.classList.toggle("is-open");
}

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
    buttonOut.removeEventListener('click', exit);
    checkAuth();
  }
  buttonOut.addEventListener('click', exit);
}

function notAuthorized() {
  console.log('No auth');

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
      logIn();
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

function createCardRestaurant() {
  const card = `
    <a href="#" class="card card-restaurant">
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
    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
      <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">Пицца Классика</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
            грибы.
          </div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold">510 ₽</strong>
        </div>
      </div>`);

  cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
  const target = event.target;

  const restaurant = target.closest('.card-restaurant'); // получаем родительский элемент <a></a>

  if (restaurant) {
    cardsMenu.textContent = '';
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

    createCardGood(); // создаем карточки с меню
  }
}

function openMainPage() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
}

// Вешаем клик на весь блок с ресторанами, в функции openGoods делегирование события
cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', openMainPage);
// Модальное окно
cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);


checkAuth();

createCardRestaurant();
createCardRestaurant();

// ошибка скорее всего в верстке
new Swiper('.swiper-container', {
  loop: true,
  autoplay: true
});