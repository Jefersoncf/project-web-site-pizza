const Order = require('../../../models/order');

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
        req.flash('success', 'Pedido feito com sucesso.');
        return res.redirect('/');
      }).catch(err => {
        req.flash('error', 'Algo deu errado');
        return res.redirect('/cart');
      });
    }, 
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id });
      res.render('customers/orders', { orders: orders });
    }
  }
}

module.exports = orderController;