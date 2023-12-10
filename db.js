const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://admin:Sp00ky!@localhost:27017/users?authSource=admin';



mongoose.connect(MONGODB_URI)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

module.exports = db;
