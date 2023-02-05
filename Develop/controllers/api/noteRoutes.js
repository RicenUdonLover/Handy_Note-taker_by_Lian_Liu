const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const dbPath = path.join(__dirname, '../db/db.json');

// GET /api/notes
router.get('/notes', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// POST /api/notes
router.post('/notes', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    let newNote = req.body;
    // Assign a unique id to the new note
    notes.push(newNote);
    fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// DELETE /api/notes/:id
router.delete('/notes/:id', (req, res) => {
  fs.readFile(dbPath, (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    let deletedNotes = notes.splice(Number(req.params.id)-1, 1);
    fs.writeFile(dbPath, JSON.stringify(deletedNotes), (err) => {
      if (err) throw err;
      res.json(deletedNotes);
    });
  });
});

module.exports = router;