const express = require('express');

const names = require('./names');
const notes = require('./notes');

const router = express.Router();

router.use(names);
router.use(notes);

module.exports = router;
