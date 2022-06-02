import axios from 'axios';
import Noty from "noty";
import { initAdmin } from './admin';
// const notyf = new Notyf();

const addToCart = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('#cartCounter');

function updateCart(pizza){
  axios.post('/update-cart', pizza).then(res => {
    cartCount.innerText = res.data.totalQtd;
    new Noty({
      type: 'success',
      timeout: 1000,
      text: "Adicionado ao carrinho!",
      progressBar: false,
    }).show();

  }).catch(err => {
    new Noty({
      type: 'error',
      timeout: 1000,
      text: "Algo deu errado!",
      progressBar: false,
    }).show();
  })
};

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  })
});

//Remove alert message after X seconds
const alertMessage = document.querySelector('#success-alert');
if (alertMessage) {
  setTimeout(() => {
    alertMessage.remove();
  }, 3000)
};

initAdmin();