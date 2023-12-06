const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mime = require('mime-types');
const read = require('../readExceltoDB');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.xlsx`);
  },
});

const upload = multer({ storage });

// Handle file upload
router.post('/', upload.single('file'), (req, res) => {
  try {
    console.log('File uploaded:', req.file);
    res.json({ message: 'File uploaded successfully' });

    const mimeType = mime.lookup(req.file.originalname);
    if (mimeType === 'application/vnd.ms-excel' || 
    mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      read.readExcel(`./uploads/${req.file.filename}`);
    }

  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;