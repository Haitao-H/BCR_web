const mongoose = require('mongoose');
const internal = require('stream');


const bcrSchema = new mongoose.Schema({
    id: {type: Number, require:true},
    MLcatalogNum: {type: Number, require:true},
    format: {type: String, require:true},
    commonName: {type: String, require:true},
    scientificName: {type: String, require:true},
    backgroundSpecies: {type: String, require:true},
    recordist: {type: String, require:true},
    date: {type: String, require:true},
    year: {type: Number, require:true},
    month: {type: Number, require:true},
    day: {type: Number, require:true},
    time: {type: Number, require:true},
    country: {type: String, require:true},
    countryStateCounty: {type: String, require:true},
    state: {type: String, require:true},
    county: {type: String, require:true},
    locality: {type: String, require:true},
    latitude: {type: String, require:true},
    longituge: {type: String, require:true},
    ageSex: {type: String, require:true},
    behavios: {type: String, require:true},
    playback: {type: String, require:true},
    captive: {type: String, require:true},
    collected: {type: String, require:true},
    specimen: {type: String, require:true},
    homeArchiveCatalogNum: {type: String, require:true},
    recorder: {type: String, require:true},
    microphone: {type: String, require:true},
    accessory: {type: String, require:true},
    partnerInstitution: {type: String, require:true},
    ebirdChecklistID: {type: String, require:true},
    unconfirmed: {type: String, require:true},
    airTemp: {type: String, require:true},
    waterTemp: {type: String, require:true},
    mediaNotes: {type: String, require:true},
    observationDetails: {type: String, require:true},
    parentSpecies: {type: String, require:true},
    ebirdSpeciesCode: {type: String, require:true},
    taxonCategory: {type: String, require:true},
    taxonomicSort: {type: String, require:true},
    recordist2: {type: String, require:true},
    averageCommunityRating: {type: Number, require:true},
    numberofRatings: {type: Number, require:true},
    assetTags: {type: String, require:true},
    originalImageHeight: {type: String, require:true},
    originalImageWidth: {type: String, require:true},
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String,  unique: true, required: true },
    password: { type: String, required: true },
    level:{ type: Number }
})


const User = mongoose.model('user', userSchema);
const bcrData = mongoose.model('bcrData', bcrSchema);

// add mock data for delete
// for(let i = 0; i<2; i=i+1){
//     let new_data = new bcrData({
//         format: "Video",
//         year: 2023,
//         month: 12,
//         day: 3,
//         commonName: `test video ${i}`
//     });
//     new_data.save();

// }


module.exports = {
    bcrData,
    User
}

