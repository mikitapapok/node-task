const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/index');

app.use('/api', routes);
app.listen(PORT, () => {
    console.log(PORT);
});
