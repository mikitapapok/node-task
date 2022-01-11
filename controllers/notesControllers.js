const Note = require('../validations/noteModel');

const putNote = async (req, res) => {
    try {
        const currentId = req.params.id;
        const currentNote = await Note.findOne({ id: currentId });
        console.log(currentNote);
        if (!currentNote) {
            throw new Error('note is not found');
        }
        if (!req.body) {
            throw new Error('enter body to send');
        }
        await Note.findOneAndUpdate({ id: currentId }, req.body);
        res.json(req.body);
    } catch (err) {
        res.json(err.message);
    }
};

const postNote = async (req, res) => {
    try {
        const newNote = new Note(req.body);
        if (!req.body) {
            throw new Error(
                'enter correct data. Object must contain: id,title,content, createdDate'
            );
        }
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
    } catch (err) {
        res.status(404).json(err.message);
    }
};

const getNotes = async (req, res) => {
    const title = new RegExp(req.query.title, 'i') || '';
    const limit = req.query.limit || 10;
    const start = req.query.start || '1900';
    const end = req.query.end || '3000';

    const notes = await Note.find({
        title: { $regex: title },
        createDate: { $gt: new Date(start).toDateString(), $lt: end },
    });

    res.send(notes.splice(0, limit));
};

module.exports = {
    postNote,
    putNote,
    deleteNote,
    getNotes,
};
