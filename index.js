const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/index');
const customLogger = require('./middlewares/logger');

const url = 'mongodb+srv://node-task-4:qwerty1234@cluster0.ye49h.mongodb.net/notes';
async function start() {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, () => {
            console.log(PORT);
        });
    } catch (e) {
        console.log(e);
    }
}

app.use(customLogger);
app.use(jsonParser);
app.use('/api', routes);
start();
