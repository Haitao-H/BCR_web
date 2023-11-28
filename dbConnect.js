// connect to mongoose database
const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://Jerry:789852@cluster0.7hj59wi.mongodb.net/?retryWrites=true&w=majority';

const dbConnect = () => {
    mongoose.connect(dbURL)
        .then((result) => { console.log('connected to db') })
        .catch((err) => { console.log(err) });
}

module.exports = dbConnect;