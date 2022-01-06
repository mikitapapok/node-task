const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/index');

const customLogger = morgan(
    'method: :method URL: :url STATUS: :status RESPONSE TIME: :response-time ms - :res[content-length] HOST: :host '
);

morgan.token('host', (req) => {
    return req.hostname;
});

app.use(customLogger);

app.use('/api', routes);
app.listen(PORT, () => {
    console.log(PORT);
});
