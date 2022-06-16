require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session);
const passport = require('passport');
const Emitter = require('events')

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

// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter);

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
app.use((req, res) => {
  res.status(404).render('errors/404');
});

const server = app.listen(port, () => {
  console.log('listening on here!')
});

//Socket
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.on('join', (orderId) => {
    socket.join(orderId)
  })
});

eventEmitter.on('orderUpdated', (data) => {
  io.to(`order_${data.id}`).emit('orderUpdated', data);
});

eventEmitter.on('orderPlaced', (data) => {
  io.to('adminRoom').emit('orderPlaced', data);
});
