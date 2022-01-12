const createNoteValid = require('./createNoteValidation');

const isDataValid = (req, res, next) => {
    const { error } = createNoteValid.validate(req.body);
    if (error) {
        return res.status(404).json({ error: { message: error.message } });
    }
    if (!req.body) {
        return res.status(400).json({
            error: {
                message: 'enter correct data. Object must contain: id,title,content, createdDate',
            },
        });
    }
    next();
};

module.exports = isDataValid;
