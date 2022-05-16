const bcrypt = require('bcrypt');
const User = require('../../models/user');

function authController() {
  return {
    login(req, res) {
      res.render('auth/login')
    },
    register(req, res) {
      res.render('auth/register')
    },
    async postRegister(req, res) {
      const {name, email, password} = req.body;
      //Validate req
      if (!name || !email || !password) {
        req.flash('error', 'Preencha todos os campos');
        req.flash('name', name);
        req.flash('email', email);
        return res.redirect('/register')
      }
      //Check if email exists
      User.exists({email: email}, (err, result) => {
        if(result) {
          req.flash('error', 'Email já cadastrado');
          req.flash('name', name);
          req.flash('email', email);
          return res.redirect('/register')
        }
      });
      //Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      //Create a new user
      const user = new User( 
        {
          name,
          email,
          password: hashedPassword,
        }
      );
      user.save()
      .then((user) => {
        //login 
        return res.redirect('/')
      }).catch(err => {
        req.flash('error', 'Algo deu errado');
        return res.redirect('/register')
      });

    }
  }
}

module.exports = authController;