//-----Requirements-----//
const mongoose = require('mongoose');

//-----Schema Creation-----//
const Schema = mongoose.Schema;

const NoteSchema = new Schema ({
    title: String,
    body: String
});

//-----Export Schema-----//
const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;