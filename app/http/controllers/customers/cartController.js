
function cartController() {
  return {
    index(req, res) {
      res.render('./customers/cart')
    },
    update(req, res) {
      // let cart = {
      //   items: {
      //     pizzaId:{item: pizzaObject, qtd: 0},
      //   },
      //   totalQtd: 0,
      //   totalPrice: 0
      // }

      //creating cart and adding basic object structure
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQtd: 0,
          totalPrice: 0
        }
      }

      let cart = req.session.cart;
    
      //check if item doesn't exist in cart'
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qtd: 1,
        }
        cart.totalQtd = cart.totalQtd + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }else {
        cart.items[req.body._id].qtd = cart.items[req.body._id].qtd + 1;
        cart.totalQtd = cart.totalQtd + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }

      return res.json({totalQtd: req.session.cart.totalQtd});
    }
  }
};

module.exports = cartController;