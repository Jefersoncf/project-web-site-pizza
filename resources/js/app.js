import axios from 'axios';

const addToCart = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('#cartCounter');

function updateCart(pizza){
  axios.post('/update-cart', pizza).then(res => {
    console.log(res);
    cartCount.innerText = res.data.totalQtd;
  })
}

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  })
});