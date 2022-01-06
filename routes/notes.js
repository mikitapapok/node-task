const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');

const jsonParser = bodyParser.json();
const router = express.Router();

//createNoteValidation
const fetchedData = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().min(3).required(),
    content: Joi.string().max(500),
    createDate: Joi.date(),
    updateDate: Joi.date().allow(null),
});

let notes = [];
let currentNote;
const isDataValid = (req, res, next) => {
    const { error } = fetchedData.validate(req.body);
    if (error) {
        return res.status(404).json({ error: { message: error.message } });
    }
    next();
};
const findElement = (req, res, next) => {
    try {
        currentNote = notes.find((note) => note.id === req.params.id);
        if (!currentNote) {
            throw new Error('sent data not found');
        }
        next();
    } catch (error) {
        next(error.message);
    }
};

const putElement = (req, res, next) => {
    // notes = [req.body];
    notes = notes.map((note) => (note.id === req.params.id ? req.body : note));
    next();
};

router.get('/notes', (req, res) => {
    res.send(notes);
});

router.post('/notes', [jsonParser, isDataValid], (req, res) => {
    notes.push(req.body);
    res.json(req.body);
});

router.put('/notes/:id', [jsonParser, findElement, putElement], (req, res) => {
    res.json(req.body);
});

router.delete('/notes/:id', findElement, (req, res) => {
    const deleteElement = notes.findIndex((note) => note.id === req.params.id);
    notes.splice(deleteElement, 1);
    res.json({ success: 'true', id: req.params.id });
});

module.exports = router;
