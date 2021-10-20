const notes = require('express').Router();
const {readFromFile, readAppend} = require('../helper/fsHelper');
const ShortUniqueId = require('short-unique-id');

notes.get('/', (req, res) => {
    console.log(`${req.method} received`);
    // res.status(200).json(notesData);
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    });
});

notes.post('/', (req, res) => {
    console.log(`${req.method} received`);
    // console.log(req.body);
    const {title, text} = req.body;
    if(title && text) {
        const uid = new ShortUniqueId({length:4})
        const newNote = {title, text, id: uid()};
        console.log(newNote);
        readAppend(newNote, './db/db.json');

        const response = {
            status: "success",
            body: newNote
        };

        res.json(response);
    }else {
        res.json("Error in posting note");
    }
});

notes.delete('/:id', (req, res) => {
    console.log(`${req.method} received`);
    res.send(`${req.method} received`);
    // TODO: readFile, filter array (note.id !== :id), return new array
});

module.exports = notes;

