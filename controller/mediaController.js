const express = require('express');
const session = require('express-session');
const router = express.Router();
const { bcrData, refCode } = require('../dataModel');

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

// get filter selectors in each category
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
    // console.log(req.query);

    // get the filter
    const { species, format, year } = req.query;
    let filter = `{`;

    // add species to the filter?
    if (species) {
        filter += `"commonName": [${species}],`;
    }

    // add format to the filter?
    if (format) {
        filter += `"format": [${format}],`;
    }

    // add year to the filter?
    if (year) {
        filter += `"year": [${year}],`;
    }

    // get rid of the last ','
    if (filter[filter.length - 1] === ',') {
        filter = filter.substring(0, filter.length - 1)
    }

    filter += `}`;
    // console.log(filter)

    const page = req.query.page;
    const limit = req.query.limit;



    // get the result after applying the filter 
    const data = await bcrData.find(JSON.parse(filter)).skip((page - 1) * limit).limit(limit)
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

    // is admin?
    let isAdmin;
    if (req.session.user && req.session.user.level == refCode) {
        isAdmin = true;
    } else {
        isAdmin = false;
    }

    // return all needed data
    res.json({
        message: message,
        data: data,
        counter: counter,
        isAdmin: isAdmin
    })
}


const share = (req, res) => {
    res.render('share', { title: 'Share' })
}

const update = (req, res) => {
    res.render('update', { title: 'Update' })
}


module.exports = {
    getMedia, getAllCategory, getAllSelector, goToMedia, share, update
};