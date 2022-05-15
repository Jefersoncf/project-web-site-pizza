
const User = require('../../models/user');

function authController() {
  return {
    login(req, res) {
      res.render('auth/login')
    },
    register(req, res) {
      res.render('auth/register')
    },
    postRegister(req, res) {
      const {name, email, password} = req.body;
      //Validate req
      if (!name || !email || !password) {
        req.flash('error', 'Preencha todos os campos')
        return res.redirect('/register')
      }
    }
  }
}

module.exports = authController;