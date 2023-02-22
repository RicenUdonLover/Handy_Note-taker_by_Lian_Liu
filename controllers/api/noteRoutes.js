const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const dbPath = path.join(__dirname, '../../db/db.json')

// GET /api/notes
router.get('/notes', async (req, res) => {
  try {
    let data = await fs.promises.readFile(dbPath);
    let notes = JSON.parse(data);
    res.json(notes);
  } catch (err) {
    throw err
  }
});

// POST /api/notes
router.post('/notes', async (req, res) => {
  try {
    let data = await fs.promises.readFile(dbPath);
    let notes = JSON.parse(data);
    let newNote = {
      id: (notes.length + 1),
      title: req.body.title,
      text: req.body.text
    }

    notes.push(newNote);
    await fs.promises.writeFile(dbPath, JSON.stringify(notes));
    res.json(newNote);
  } catch (err) {
    throw err;
  }
});

// DELETE /api/notes/:id
router.delete('/notes/:id', async (req, res) => {
  try {
    let data = await fs.promises.readFile(dbPath);
    let notes = JSON.parse(data);
    let deletedNote = notes.find(note => note.id === Number(req.params.id));
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    let updatedNotes = notes.filter(note => note.id !== Number(req.params.id));
    await fs.promises.writeFile(dbPath, JSON.stringify(updatedNotes));
    res.json(deletedNote);
  } catch (err) {
    throw err;
  }
});


module.exports = router;