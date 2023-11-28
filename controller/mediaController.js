const express = require('express');
const router = express.Router();
const {bcrData} = require('../dataModel');

const categoryList = ['species', 'format', 'year'];

const getMedia = async (req, res) => {
    const { species, format, year } = req.query;

    let filter = `{`;
    if (species) {
        if (species == ('crab')) {
            filter += `"isCrab": 1 ,`
        }
        if (species == ('parrot')) {
            filter += `"isParrot": 1 ,`
        }
    }
    if (year) {
        filter += `"year": [${year}],`;
    }
    if (format) {
        if (format == ('audio')) {
            filter += `"format": ["${format}"],`;
        }
        if (format == ('image')) {
            filter += `"format": ["${format}"],`;
        }
    }    
    if (filter[filter.length - 1] === ',') {
        filter = filter.substring(0, filter.length - 1)
    }
    filter += `}`;
    
    // console.log(filter)

    await bcrData.find(JSON.parse(filter)).skip(0).limit(20)
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

const share =  (req, res) => {
    res.render('share', { title: 'Share' })
}


module.exports = {
    getMedia, getAllFormat, getAllCategory, getAllSpecies, getAllYear, goToMedia, share
};