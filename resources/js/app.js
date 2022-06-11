import axios from 'axios';
import Noty from "noty";
import { initAdmin } from './admin';
import moment from 'moment';
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
  }, 3000);
};

//change order status
let statuses = document.querySelectorAll('.status_line');
let hiddenInput = document.querySelector('#hiddenInput');
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);
let time = document.createElement('small');

function updateStatus(order) {
  statuses.forEach((status) => {
    status.classList.remove('step-completed')
    status.classList.remove('current')
  });

  let stepCompleted = true;
  statuses.forEach((status) => {
    let dataProp = status.dataset.status;
    if(stepCompleted) {
      status.classList.add('step-completed');
    }
    if(dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format('HH:mm:A');
      status.appendChild(time);
      if(status.nextElementSibling) {
        status.nextElementSibling.classList.add('current');
      }
    }
  });
};
updateStatus(order);

//Socket
let socket = io();
initAdmin(socket);
//join
if(order) {
  socket.emit('join', `order_${order._id}`);
};

//Admin
let adminAreaPath = window.location.pathname;
console.log(adminAreaPath);
if(adminAreaPath.includes('admin')) {
  socket.emit('join', 'adminRoom')
};

socket.on('orderUpdated', (data) => {
  const updatedOrder = { ...order };
  updatedOrder.updatedAt = moment().format(); 
  updatedOrder.status = data.status;
  updateStatus(updatedOrder);
  new Noty({
    type: 'success',
    timeout: 1000,
    text: "Pedido atualizado.",
    progressBar: false,
  }).show();
});