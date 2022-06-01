const Order = require('../../../models/order');
const moment = require('moment'); // format date

function orderController () {
  return {
    store(req, res) {
      //Validate request
      const {phone, address} = req.body;
      if (!phone || !address) {
        req.flash('error', 'Preencha todos os campos');
        return res.redirect('/cart');
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address
      });
      order.save().then(result => {
        req.flash('success', 'Pedido adicionado com sucesso!');
        delete req.session.cart;
        return res.redirect('/customer/orders');
      }).catch(err => {
        req.flash('error', 'Algo deu errado');
        return res.redirect('/cart');
      });
    }, 
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, 
        null, {sort: {'createdAt': -1}}); //sorting in ascending order
      res.render('customers/orders', { orders: orders, moment: moment });
    }
  }
}

module.exports = orderController;