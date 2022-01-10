const express = require('express');

const isDateValid = require('../validations/validationHandler');
const { postNote, putNote, deleteNote, getNotes } = require('../controllers/notesControllers');

const router = express.Router();

router.get('/notes', getNotes);

router.post('/notes', isDateValid, postNote);

router.put('/notes/:id', isDateValid, putNote);

router.delete('/notes/:id', deleteNote);

module.exports = router;
