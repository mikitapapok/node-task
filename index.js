const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/index');
const customLogger = require('./middlewares/logger');

app.use(customLogger);
app.use(jsonParser);
app.use('/api', routes);
app.listen(PORT, () => {
    console.log(PORT);
});
