const express = require('express');
const mediaController = require('../controller/mediaController');

const router = express.Router();

router.get('/format', mediaController.getAllFormat);
router.get('/category', mediaController.getAllCategory);
router.get('/year', mediaController.getAllYear);
router.get('/species', mediaController.getAllSpecies);
router.get('/result', mediaController.getMedia);

router.get('/share',mediaController.share);
router.get('/', mediaController.goToMedia);

module.exports = router;