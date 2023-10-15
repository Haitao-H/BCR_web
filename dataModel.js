const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    dataId: {type: String, require:true},
    year: {type: Number, require:true},
    isCrab: {type: Number, require:true},
    isParrot: {type: Number, require:true}
})

module.exports = mongoose.model('data', dataSchema);


