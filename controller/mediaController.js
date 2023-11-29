const express = require('express');
const router = express.Router();
const { bcrData } = require('../dataModel');

const categoryList = ['species', 'format', 'year'];


const goToMedia = (req, res) => {
    res.render('media', { title: 'media' })
}


// get all category for the filter
const getAllCategory = (req, res) => {
    res.json({
        message: 'success',
        data: categoryList
    })
}

// get all filter selectors in each category
const getAllSelector = (req, res) => {
    let filter = req.params.filter;

    // species(frontend) = commonName(DB)
    if (filter == "species") {
        filter = "commonName";
    }

    bcrData.collection.distinct(filter, (error, data) => {
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

// get the result
const getMedia = async (req, res) => {

    const { species, format, year } = req.query;
    let filter = `{`;

    // apply filter to species?
    if (species) {
        filter += `"commonName": ["${species}"],`;
    }

    // apply filter to format?
    if (format) {
        filter += `"format": ["${format}"],`;
    }

    // apply filter to year?
    if (year) {
        filter += `"year": [${year}],`;
    }

    // get rid of the last ','
    if (filter[filter.length - 1] === ',') {
        filter = filter.substring(0, filter.length - 1)
    }

    filter += `}`;
    console.log(filter)

    // get the result after applying the filter
    const data = await bcrData.find(JSON.parse(filter)).limit(50)
        .then((result) => {
            return result;
        })
        .catch((err) => { console.log(err) });

    // get the number of result
    const counter = await bcrData.find(JSON.parse(filter)).count()

    let message;
    if (data) {
        message = 'success';
    } else {
        message = 'fail';
    }

    // return all needed data
    res.json({
        message: message,
        data: data,
        counter: counter
    })
}


const share = (req, res) => {
    res.render('share', { title: 'Share' })
}


module.exports = {
    getMedia, getAllCategory, getAllSelector, goToMedia, share
};