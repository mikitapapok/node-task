const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'pug');

app.get('/api/greetings/:name', (req, res) => {
    res.render('index.pug', { name: req.params.name });
});

app.listen(PORT, () => {
    console.log(PORT);
});
