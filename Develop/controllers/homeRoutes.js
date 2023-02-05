const express = require('express');
const path = require('path');
const router = express.Router();

// GET /notes
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes.html'));
});

// GET /*
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = router;