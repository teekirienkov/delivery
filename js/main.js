const cartButton = document.querySelector("#cart-button"),
      modal = document.querySelector(".modal"),
      close = document.querySelector(".close"),

      buttonAuth = document.querySelector('.button-auth'),
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

      modalBody = document.querySelector('.modal-body'),
      modalPrice = document.querySelector('.modal-pricetag'),
      buttonClearCart = document.querySelector('.clear-cart'),

      cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('login');

let cart = []; // корзина

const getData = async function(url) {
  const response = await fetch(url)
  
  if (!response.ok) {
    throw new Error(`Error url: ${url}, status error: ${response.status}`)
  }

  return await response.json();
}

function toggleModal() {
  modal.classList.toggle("is-open");
};

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
};

function authorized() {
  console.log('Auth');
  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'flex';
  cartButton.style.display = 'flex';

  userName.textContent = login;

  function exit() {
    login = null;
    localStorage.removeItem('login'); // выход и удаление из ls

    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';

    buttonOut.removeEventListener('click', exit);
    checkAuth();
    openMainPage();
  }
  buttonOut.addEventListener('click', exit);
};

function notAuthorized() {
  console.log('No auth');

  function logIn(event) {
    // event.preventDefault(); - если написать без остановки, то в принципе работает

    login = loginInput.value;
    localStorage.setItem('login', login);
    
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
};

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

// рендерим карточки ресторанов на main page
function createCardRestaurant(restaurant) {
  // Извлекаем из полученных данных цену и названия с помощью деструктуризации
  const { price, name, kitchen, stars, image, time_of_delivery: timeOfDelivery, products } = restaurant;
  const card = `
    <a href="#" class="card card-restaurant" data-products="${products}">
      <img src="${image}" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${timeOfDelivery} минут</span>
        </div>
        <div class="card-info">
          <div class="rating">
            ${stars}
          </div>
          <div class="price">${price}</div>
          <div class="category">${kitchen}</div>
        </div>
      </div>
    </a>`;

    // Этот метод работает быстрее чем innerHTML. Он не переписывает имеющуюся верстку
    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGood(products) {
  const { description, id, image, name, price } = products;

  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
      <img src="${image}" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${name}</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">
            ${description}
          </div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart" id="${id}">
            <span class="button-card-text">В корзину</span>
            <span class="button-cart-svg"></span>
          </button>
          <strong class="card-price-bold card-price">${price} ₽</strong>
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
    
    getData(`./db/${restaurant.dataset.products}`)
      .then((data) => {
        data.forEach(createCardGood)
      })
  }
}

function openMainPage() {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
}

// add products in cart
function addToCart(event) {
  const target = event.target;

  const buttonAddToCart = target.closest('.button-add-cart');

  if (buttonAddToCart) {
    const card = target.closest('.card');
    const title = card.querySelector('.card-title-reg').textContent;
    const cost = card.querySelector('.card-price').textContent;
    const id = buttonAddToCart.id;

    const food = cart.find((item) => item.id === id);


    // логика корзины, количество товаров
    if (food) {
      food.count += 1;
    } else {
      cart.push({
        id,         // id: id,
        title,      // title: title,
        cost,       // cost: cost,
        count: 1
      });
    }
  }
}

function renderCart() {
  modalBody.textContent = '';
  
  // Деструктурируем сразу в скобках где получаем данные
  cart.forEach(({ id, title, cost, count }) => {
    const itemCart = `
    <div class="food-row">
      <span class="food-name">${title}</span>
      <strong class="food-price">${cost}</strong>

        <div class="food-counter">
          <button class="counter-button counter-minus" data-id="${id}">-</button>
          <span class="counter">${count}</span>
          <button class="counter-button counter-plus" data-id="${id}">+</button>
        </div>
    </div>`;

    modalBody.insertAdjacentHTML('afterbegin', itemCart);
  });

  const totalPrice = cart.reduce((result, item) => {
    return result + (parseFloat(item.cost) * item.count); // получаем итоговую цену
  }, 0);

  modalPrice.textContent = `${totalPrice} ₽`;
}

// function change count products 
function changeCount(event) {
  const target = event.target;

  if (target.classList.contains('counter-button')) {
    const food = cart.find((item) => item.id === target.dataset.id);
    if (target.classList.contains('counter-minus')) {
      food.count--;
      if (food.count === 0) {
        cart.splice(cart.indexOf(food), 1); // исправление бага ухода в минус цены товара
      }
    }
    if (target.classList.contains('counter-plus')) food.count++;
    renderCart();
  }
}

function init() {
  getData('./db/partners.json')
  .then((data) => data.forEach(createCardRestaurant));

  cartButton.addEventListener("click", () => {
    renderCart();
    toggleModal();
  });

  buttonClearCart.addEventListener('click', () => {
    cart.length = 0;
    renderCart();
  })

  // events
  // Вешаем клик на весь блок с ресторанами, в функции openGoods делегирование события
  cardsRestaurants.addEventListener('click', openGoods);

  cardsMenu.addEventListener('click', addToCart);

  modalBody.addEventListener('click', changeCount);

  logo.addEventListener('click', openMainPage);
  // Модальное окно
  
  close.addEventListener("click", toggleModal);

  checkAuth();

  new Swiper('.swiper-container', {
    loop: true,
    autoplay: true
  });
}

init();