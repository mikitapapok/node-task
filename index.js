const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'pug');

app.get('/api/greetings/:name', (req, res) => {
    res.render('index.pug', { name: req.params.name });
});

app.listen(port, () => {
    console.log('Это короче, вот те сервер. Понял, да?');
});
