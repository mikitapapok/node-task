const express = require('express');

const router = express.Router();

router.get('/notes', (req, res) => {
    res.send('notes');
});

router.post('/notes', (req, res) => {
    res.json({});
});

module.exports = router;
