const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const connectDB = require('./app/database/connection');

//Database connection
connectDB();

const app = express();
const port = process.env.PORT || 3000;

//session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

// app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));

//Templetes engine
app.use(expressLayout);
app.set('views', path.join(__dirname, './resources/views'));
app.set('view engine', 'ejs');

require('./routes/web')(app);

app.listen(port, () => {
  console.log('listening on here!')
})

