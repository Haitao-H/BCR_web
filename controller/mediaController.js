const express = require('express');
const router = express.Router();
const { bcrData } = require('../dataModel');

const categoryList = ['species', 'format', 'year'];

const getMedia = async (req, res) => {
    const { species, format, year } = req.query;

    let filter = `{`;

    // check if species selected or not?
    if (species) {
        if (species == ('crab')) {
            filter += `"isCrab": 1 ,`
        }
        if (species == ('parrot')) {
            filter += `"isParrot": 1 ,`
        }
    }

    // check if format selected or not?
    if (format) {
        if (format == ('audio')) {
            filter += `"format": ["${format}"],`;
        }
        if (format == ('image')) {
            filter += `"format": ["${format}"],`;
        }
    }

    // check if year selected or not?
    if (year) {
        filter += `"year": [${year}],`;
    }


    if (filter[filter.length - 1] === ',') {
        filter = filter.substring(0, filter.length - 1)
    }
    filter += `}`;

    // console.log(filter)

    await bcrData.find(JSON.parse(filter)).skip(0).limit(20)
        .then((result) => {
            res.json({
                message: 'success',
                data: result
            })
        })
        .catch((err) => { console.log(err) });
}



const goToMedia = (req, res) => {

    res.render('media', { title: 'media' })
}


// get all format selections for the filter
const getAllFormat = (req, res) => {
    bcrData.collection.distinct('format', (error, data) => {
        if (data.length > 0) {
            res.json({
                message: 'success',
                data: data
            })
        } else {
            res.json({
                message: 'not found',
                data: []
            })
        }
    })
}

// get all category selections for the filter
const getAllCategory = (req, res) => {
    res.json({
        message: 'success',
        data: categoryList
    })
}

// get all species selections for the filter
const getAllSpecies = (req, res) => {
    res.json({
        message: 'success',
        data: ['crab', 'parrot']
    })
}

// get all year selections for the filter
const getAllYear = (req, res) => {
    bcrData.collection.distinct('year', (error, data) => {
        if (data.length > 0) {
            res.json({
                message: 'success',
                data: data
            })
        } else {
            res.json({
                message: 'not found',
                data: []
            })
        }
    })
}

const share = (req, res) => {
    res.render('share', { title: 'Share' })
}


module.exports = {
    getMedia, getAllFormat, getAllCategory, getAllSpecies, getAllYear, goToMedia, share
};