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
      buttonOut = document.querySelector('.button-out');

let login = ''; // пустая строка для проверки

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

function authorized() {
  console.log('Auth');
  buttonAuth.style.display = 'none';

  userName.textContent = login;

  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  function exit() {
    login = '';
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    checkAuth();
  }
  buttonOut.addEventListener('click', exit)
}

function notAuthorized() {
  console.log('No auth')
// тут сделать проверку на пустой логин
  function logIn(event) {
    event.preventDefault();
    login = loginInput.value;
    toggleModalAuth();
    // Удаляем обработчики событий для корректной работы
    buttonAuth.removeEventListener('click', toggleModalAuth);
    closeAuth.removeEventListener('click', toggleModalAuth);
    logInForm.removeEventListener('submit', logIn);
    checkAuth();
  }

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}
checkAuth();