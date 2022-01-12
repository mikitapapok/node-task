const { Schema, model } = require('mongoose');

const schem = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        min: [3, 'must be more than 3'],
        required: true,
    },
    content: {
        type: String,
        max: [500, 'must be less than 500 symbols'],
        required: true,
    },
    createDate: {
        type: Date,
        required: true,
    },
    updateDate: {
        type: Date,
    },
});

module.exports = model('Note', schem);
