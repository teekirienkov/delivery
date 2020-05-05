const cartButton = document.querySelector("#cart-button"),
      modal = document.querySelector(".modal"),
      close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


const buttonAuth = document.querySelector('.button-auth'),
      modalAuth = document.querySelector('.modal-auth'),
      closeAuth = document.querySelector('.close-auth');

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}

buttonAuth.addEventListener('click', toggleModalAuth);

closeAuth.addEventListener('click', toggleModalAuth);

function authorized() {
  console.log('Auth')
}

function notAuthorized() {
  console.log('No auth')
}
