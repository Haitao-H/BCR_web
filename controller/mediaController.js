const express = require('express');
const router = express.Router();
const Data = require('../dataModel');

const categoryList = ['species', 'year'];


const getMedia = async (req, res) => {
    const { species, year } = req.query;
    let filter = `{`;
    if (species) {
        if (species == ('crab')) {
            filter += `"iscrab": 1 ,`
        }
        if (species == ('parrot')) {
            filter += `"isParrot": 1 ,`
        }
    }
    if (year) {
        filter += `"year": [${year}],`;
    }

    if (filter[filter.length - 1] === ',') {
        filter = filter.substring(0, filter.length - 1)
    }
    filter += `}`;

    // console.log(filter)

    await Data.find(JSON.parse(filter))
        .then((result) => {
            res.json({
                message:'success',
                data: result
            })
        })
        .catch((err) => { console.log(err) });
}


const goToMedia = (req, res) => {

    res.render('media', { title: 'media' })
}

const getAllCategory = (req, res) => {
    res.json({
        message: 'success',
        data: categoryList
    })
}


const getAllSpecies = (req, res) => {
    res.json({
        message: 'success',
        data: ['crab', 'parrot']
    })
}


const getAllYear = (req, res) => {
    Data.collection.distinct('year', (error, data) => {
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

const share =  (req, res) => {
    res.render('share', { title: 'Share' })
}


module.exports = {
    getMedia, getAllCategory, getAllSpecies, getAllYear, goToMedia, share
};