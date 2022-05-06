const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    const url = 'mongodb://127.0.0.1:27017/pizzadb';
      mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to database')
  }catch(e) {
    console.log('Error connecting to database')
  }
}
module.exports = connectDB;


// const url = 'mongodb://127.0.0.1:27017/pizzadb';
// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: true,
// });
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('Database connected!')
// }).catch(err => {
//   console.log('Connection failed.')
// });