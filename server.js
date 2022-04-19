const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

//Templetes engine
// app.use(express.urlencoded( { extended: true } ));
// app.use(expressLayout);
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


// "dev": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/webpack-mix/setup/webpack.config.js",
// "watch": "npm run dev --watch",
// "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/webpack-mix/setup/webpack.config.js"