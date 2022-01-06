const express = require('express');
const bodyParser = require('body-parser');
const isDateValid = require('../validations/validationHandler');

const jsonParser = bodyParser.json();
const router = express.Router();

let notes = [];
let currentNote;

const findElement = (req, res, next) => {
    currentNote = notes.find((note) => note.id === req.params.id);
    if (!currentNote) {
        res.status(404).json({ error: { message: error.message } });
    }
    next();
};

const putElement = (req, res, next) => {
    notes = notes.map((note) => (note.id === req.params.id ? req.body : note));
    next();
};

router.get('/notes', (req, res) => {
    res.send(notes);
});

router.post('/notes', [jsonParser, isDateValid], (req, res) => {
    notes.push(req.body);
    res.json(req.body);
});

router.put('/notes/:id', [jsonParser, findElement, isDateValid, putElement], (req, res) => {
    res.json(req.body);
});

router.delete('/notes/:id', findElement, (req, res) => {
    const deleteElement = notes.findIndex((note) => note.id === req.params.id);
    notes.splice(deleteElement, 1);
    res.json({ success: 'true', id: req.params.id });
});

module.exports = router;
