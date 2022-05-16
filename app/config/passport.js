const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

function init(passport) {
  passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {

    //Login user

    //Check if email exists

    const user = await User.findOne({email: email});
    if(!user) {
      return done(null, false, {message: 'Não existe usuário com este email'});
    };

    bcrypt.compare(password, user.password)
    .then(match => {
      if(match) {
        return done(null, user, {message: 'Logado com sucesso'});
      }
      return done(null, false, {message: 'Usuário ou senha errado'});
    }).catch(err => {
      return done(null, false, {message: 'Algo deu errado'});
    });
  }));
  passport.serializeUser((user, done) => {
    done(null, user._id)
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

};

module.exports = init;