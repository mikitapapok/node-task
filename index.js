const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/index');
const customLogger = require('./middlewares/logger');

app.use(customLogger);

app.use('/api', routes);
app.listen(PORT, () => {
    console.log(PORT);
});
