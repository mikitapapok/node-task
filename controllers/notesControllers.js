const Note = require('../models/noteModel');

const putNote = async (req, res) => {
    try {
        const currentId = req.params.id;
        const currentNote = await Note.findOne({ id: currentId });
        if (!currentNote) {
            throw new Error('note is not found');
        }
        const note = await Note.findOneAndUpdate({ id: currentId }, req.body);
        res.json(note);
    } catch (error) {
        res.status(404).json({ error: { message: error.message } });
    }
};

const postNote = async (req, res) => {
    const newNote = new Note(req.body);
    await newNote.save();
    res.json(req.body);
};

// eslint-disable-next-line consistent-return
const deleteNote = async (req, res) => {
    try {
        const currentId = req.params.id;
        const currentNote = await Note.findOne({ id: currentId });
        if (!currentNote) {
            throw new Error('note is not found');
        }
        await Note.findOneAndRemove({ id: currentId });
        res.json({ success: 'true', id: req.params.id });
    } catch (error) {
        res.status(404).json({ error: { message: error.message } });
    }
};
const getDataFromDateString = (dateString) => (dateString ? new Date(dateString) : null);

const validateDatesFromParams = (startDateString, endDateString) => {
    const startDate = getDataFromDateString(startDateString);
    const endDate = getDataFromDateString(endDateString);
    if (startDate && endDate && startDate > endDate) {
        throw new Error('start date cannot be bigger then end date');
    }
    return [startDate, endDate];
};

const getNotes = async (req, res) => {
    const { limit = 10, page = 1, title = '', start, end } = req.query;
    let filter = {
        title: { $regex: title },
    };
    const [startDate, endDate] = validateDatesFromParams(start, end);

    if (startDate && endDate) {
        filter = { ...filter, createDate: { $gt: startDate, $lt: endDate } };
    }

    const notes = await Note.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);

    res.send(notes);
};

module.exports = {
    postNote,
    putNote,
    deleteNote,
    getNotes,
};
