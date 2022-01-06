const morgan = require('morgan');

const customLogger = morgan(
    'method: :method URL: :url STATUS: :status RESPONSE TIME: :response-time ms - :res[content-length] HOST: :host '
);

morgan.token('host', (req) => {
    return req.hostname;
});

module.exports = customLogger;
