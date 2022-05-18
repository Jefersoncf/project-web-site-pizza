const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const flash = require('express-flash');
const passport = require('passport');

const MongoDbStore = require('connect-mongo')(session);

const app = express();
const port = process.env.PORT || 3000;

//Database connection
const url = process.env.DB;
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('Connected to database')
}).on('err', (err) => {
    console.log(`Error connecting to database${err}`);
  });

//Session Store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: 'sessions'
});

//session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24} //24h
  // cookie: {maxAge: 1000 * 15}
}));

// Passport config
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

//global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

//Templetes engine
app.use(expressLayout);
app.set('views', path.join(__dirname, './resources/views'));
app.set('view engine', 'ejs');

require('./routes/web')(app);

app.listen(port, () => {
  console.log('listening on here!')
});

