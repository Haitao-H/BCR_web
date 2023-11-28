const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    dataId: { type: String, required: true },
    year: { type: Number, required: true },
    isCrab: { type: Number, required: true },
    isParrot: { type: Number, required: true }
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

const Data = mongoose.model('dataSchema', dataSchema);
const User = mongoose.model('userSchema', userSchema);
module.exports = { Data, User };


