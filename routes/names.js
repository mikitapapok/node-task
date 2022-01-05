const express = require('express');

const app = express();
const router = express.Router();

app.set('view engine', 'pug');

router.get('/greetings/:name', (req, res) => {
    res.render('index.pug', { name: req.params.name });
});

module.exports = router;
