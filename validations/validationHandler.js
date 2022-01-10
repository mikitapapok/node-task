const createNoteValid = require('./createNoteValidation');

const isDataValid = (req, res, next) => {
    const { error } = createNoteValid.validate(req.body);
    if (error) {
        return res.status(404).json({ error: { message: error.message } });
    }
    next();
};

module.exports = isDataValid;
