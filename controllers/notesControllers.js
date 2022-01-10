let notes = [];
let currentNote;

const putNote = (req, res) => {
    currentNote = notes.find((note) => note.id === req.params.id);
    if (!currentNote) {
        return res.status(404).json({ error: { message: 'note not found' } });
    }
    notes = notes.map((note) => (note.id === req.params.id ? req.body : note));
    res.json(req.body);
};

const postNote = (req, res) => {
    notes.push(req.body);
    res.json(req.body);
};

// eslint-disable-next-line consistent-return
const deleteNote = (req, res) => {
    currentNote = notes.find((note) => note.id === req.params.id);
    if (!currentNote) {
        return res.status(404).json({ error: { message: 'note not found' } });
    }
    const deleteElement = notes.findIndex((note) => note.id === req.params.id);
    notes.splice(deleteElement, 1);
    res.json({ success: 'true', id: req.params.id });
};

const getNotes = (req, res) => {
    res.send(notes);
};

module.exports = {
    postNote,
    putNote,
    deleteNote,
    getNotes,
};
