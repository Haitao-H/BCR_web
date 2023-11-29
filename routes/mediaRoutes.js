const express = require('express');
const mediaController = require('../controller/mediaController');

const router = express.Router();

router.get('/category', mediaController.getAllCategory);
router.get('/species', mediaController.getAllSpecies);
router.get('/format', mediaController.getAllFormat);
router.get('/year', mediaController.getAllYear);
router.get('/result', mediaController.getMedia);

router.get('/share', mediaController.share);
router.get('/', mediaController.goToMedia);

module.exports = router;