// connect to mongoose database
const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://test123:111.222@cluster0.clhvebl.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';

const dbConnect = () => {
    mongoose.connect(dbURL)
        .then((result) => { console.log('connected to db') })
        .catch((err) => { console.log(err) });
}

module.exports = dbConnect;