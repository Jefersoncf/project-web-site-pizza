const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.urlencoded( { extended: true } ));
// app.use(expressLayout);
app.use(express.static('public'));

//Templetes engine
app.set('views', path.join(__dirname, './resources/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home')
});

// const routes = require('./routes/web');
// app.set('/', routes)

app.listen(port, () => {
  console.log('listening on here!')
})

