const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');



const app = express();
const port = process.env.PORT || 3000;



//Templetes engine
app.use(expressLayout);
app.use('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');


app.listen(port, () => {
  console.log('listening on here!')
})