const express = require('express');
const mediaController = require('../controller/mediaController');

const router = express.Router();

router.get('/category', mediaController.getAllCategory);
router.get('/result', mediaController.getMedia);
router.get('/share', mediaController.share);
router.get('/:filter', mediaController.getAllSelector);
router.get('/', mediaController.goToMedia);

module.exports = router;