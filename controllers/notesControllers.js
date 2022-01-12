const Note = require('../models/noteModel');

const initStartDate = '1900';
const initEndDate = '3000';
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
    try {
        const newNote = new Note(req.body);
        await newNote.save();
        res.json(req.body);
    } catch (err) {
        res.status(400).json(err.message);
    }
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

const getNotes = async (req, res) => {
    const {
        limit = 10,
        page = 1,
        title = '',
        start = initStartDate,
        end = initEndDate,
    } = req.query;
    const notes = await Note.find({
        title: { $regex: title },
        createDate: { $gt: new Date(start).toDateString(), $lt: end },
    })
        .limit(limit)
        .skip((page - 1) * limit);

    res.send(notes);
};

module.exports = {
    postNote,
    putNote,
    deleteNote,
    getNotes,
};
