const Joi = require('joi');

const createNoteValidation = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().min(3).required(),
    content: Joi.string().max(500),
    createDate: Joi.date(),
    updateDate: Joi.date().allow(null),
});
module.exports = createNoteValidation;
